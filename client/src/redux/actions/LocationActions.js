import {
    CLEAR_ALL_FILTERS,
    CLEAR_CITY_FILTER,
    CLEAR_DISTRICT_FILTER_WITH_TIME_AND_CITY,
    CREATE_LOCATION_COMPLETE,
    CREATE_NEW_LOCATION,
    CREATING_LOCATION,
    DEFAULT_URL,
    DELETE_LOCATION,
    DONE_UPLOAD_LOCATION_LOGO,
    FILTER_LOCATION_BY_CITY,
    FILTER_LOCATION_BY_CITY_AND_START_DATE,
    FILTER_LOCATION_BY_DISTRICT, FILTER_LOCATION_BY_DISTRICT_WITH_CITY_AND_START_TIME,
    FILTER_LOCATION_BY_KEYWORD,
    FILTER_LOCATION_BY_START_DATE,
    GET_ALL_LOCATIONS,
    GET_LOCATION,
    GETTING_CREATED_LOCATIONS,
    GETTING_REGISTERED_LOCATIONS,
    GOT_CREATED_LOCATIONS,
    GOT_REGISTERED_LOCATIONS,
    JOINED_CLEAN_SITE,
    JOINING_CLEAN_SITE,
    LOADING_FORM,
    RESET_UI_STATE,
    STOP_LOADING_FORM,
    UPDATE_LOCATION,
    UPLOADING_LOCATION_LOGO
} from "../types";
import axios from "axios";
import {closeUpdateSiteForm} from "./FormActions";

export function getAllLocations() {
    return function (dispatch) {
        axios
            .get(`${DEFAULT_URL}/get_all_clean_sites`)
            .then((res) => {
                dispatch({
                    type: GET_ALL_LOCATIONS,
                    payload: res.data
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export function getLocation(locationId) {
    return function (dispatch) {
        dispatch({type: LOADING_FORM});
        axios
            .get(`${DEFAULT_URL}/get_clean_site/${locationId}`)
            .then((res) => {
                dispatch({
                    type: GET_LOCATION,
                    payload: res.data
                });
                dispatch({type: STOP_LOADING_FORM});
            });
    }
}

export function updateLocation(locationData, email) {
    return function (dispatch) {
        console.log(locationData);
        axios
            .put(`${DEFAULT_URL}/update_clean_site/${locationData.id}`, locationData)
            .then((res) => {
                dispatch({
                    type: UPDATE_LOCATION,
                    payload: res.data.updateData
                });
            })
            .then(() => {
                dispatch(closeUpdateSiteForm());
            })
            .then(() => {
                dispatch(getAllRegisteredLocationsWithEmail({email: email}))
            });
    }
}

export function deleteLocation(locationId, email) {
    return function (dispatch) {
        axios
            .delete(`${DEFAULT_URL}/delete_clean_site/${locationId}`)
            .then((res) => {
                dispatch({
                    type: DELETE_LOCATION,
                    payload: res.data
                })
            })
            .then(() => {
                dispatch(getAllRegisteredLocationsWithEmail({email: email}))
            });
    };
}

export function createNewLocation(location) {
    const token = sessionStorage.getItem("FBIdToken");
    return function (dispatch) {
        dispatch({type: CREATING_LOCATION});
        axios
            .post(`${DEFAULT_URL}/create_clean_site`, location, {headers: {"Authorization": token}})
            .then((res) => {
                dispatch({
                    type: CREATE_NEW_LOCATION,
                    payload: res.data
                });
                dispatch({type: CREATE_LOCATION_COMPLETE});
                setTimeout(() => {
                    dispatch({type: RESET_UI_STATE})
                }, 1000);
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export function joinLocation(info) {
    return function (dispatch) {
        dispatch({type: JOINING_CLEAN_SITE});
        axios.post(`${DEFAULT_URL}/join_clean_site`, info)
            .then(() => {
                dispatch({type: JOINED_CLEAN_SITE})
            })
            .then(() => {
                setTimeout(() => {
                    dispatch({type: RESET_UI_STATE})
                }, 1000);
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export function getAllCreatedLocationsWithEmail(email) {
    return function (dispatch) {
        dispatch({type: GETTING_CREATED_LOCATIONS});
        axios.post(`${DEFAULT_URL}/get_created_locations`, email)
            .then((res) => {
                dispatch({type: GOT_CREATED_LOCATIONS, payload: res.data});
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export function getAllRegisteredLocationsWithEmail(email) {
    return function (dispatch) {
        dispatch({type: GETTING_REGISTERED_LOCATIONS});
        axios.post(`${DEFAULT_URL}/get_registered_locations`, email)
            .then((res) => {
                dispatch({type: GOT_REGISTERED_LOCATIONS, payload: res.data});
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export function uploadLocationLogo(updateObj, history, locationId) {
    return function (dispatch) {
        dispatch({type: UPLOADING_LOCATION_LOGO});
        axios
            .post(`${DEFAULT_URL}/upload_location_logo`, updateObj)
            .then(() => {
                dispatch({type: DONE_UPLOAD_LOCATION_LOGO});
                setTimeout(() => {
                    history.push(`/cleanup-detail/${locationId}`);
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

export function filterLocationsByCity(city, startDate) {
    return function (dispatch) {
        if (startDate) dispatch({type: FILTER_LOCATION_BY_CITY_AND_START_DATE, payload: {city, startDate}});
        else dispatch({type: FILTER_LOCATION_BY_CITY, payload: city});
    };
}

export function filterLocationsByDistrict(district, city, startDate) {
    return function (dispatch) {
        if (city && startDate) dispatch({
            type: FILTER_LOCATION_BY_DISTRICT_WITH_CITY_AND_START_TIME, payload: {district, city, startDate}
        });
        else dispatch({FILTER_LOCATION_BY_DISTRICT, payload: district});
    };
}

export function filterLocationsByStartDate(startDate, city) {
    return function (dispatch) {
        if (city) dispatch({type: FILTER_LOCATION_BY_CITY_AND_START_DATE, payload: {startDate, city}});
        else dispatch({type: FILTER_LOCATION_BY_START_DATE, payload: startDate});
    };
}

export function filterLocationsByKeyword(keyword) {
    return function (dispatch) {
        dispatch({type: FILTER_LOCATION_BY_KEYWORD, payload: keyword});
    };
}

export function clearCityFilter(time) {
    return function (dispatch) {
        if (time) dispatch({type: FILTER_LOCATION_BY_START_DATE, time});
        else dispatch({type: CLEAR_CITY_FILTER});
    }
}

export function clearDistrictFilter(city, time) {
    return function (dispatch) {
        if (city && time) dispatch({type: CLEAR_DISTRICT_FILTER_WITH_TIME_AND_CITY, payload: {city, time}});
        if (city) dispatch({type: FILTER_LOCATION_BY_CITY, payload: city})
    }
}

export function clearStartDateFilter(city) {
    return function (dispatch) {
        if (city) dispatch({type: FILTER_LOCATION_BY_CITY, payload: city});
        else dispatch({type: CLEAR_ALL_FILTERS});
    }
}

export function clearAllFilters() {
    return function (dispatch) {
        dispatch({type: CLEAR_ALL_FILTERS});
    }
}
