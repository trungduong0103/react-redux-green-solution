import {
    GET_ALL_LOCATIONS,
    CREATE_NEW_LOCATION,
    GET_LOCATION,
    UPDATE_LOCATION,
    DELETE_LOCATION,
    GOT_CREATED_LOCATIONS,
    GOT_REGISTERED_LOCATIONS,
    FILTER_LOCATION_BY_DISTRICT,
    FILTER_LOCATION_BY_CITY,
    FILTER_LOCATION_BY_START_DATE,
    FILTER_LOCATION_BY_KEYWORD,
    UPLOADING_LOCATION_LOGO,
    DONE_UPLOAD_LOCATION_LOGO,
    CLEAR_CITY_FILTER,
    CLEAR_ALL_FILTERS,
    CLEAR_DISTRICT_FILTER_WITH_TIME_AND_CITY,
    FILTER_LOCATION_BY_START_DATE_AND_CITY,
    FILTER_LOCATION_BY_CITY_AND_START_DATE, FILTER_LOCATION_BY_DISTRICT_WITH_CITY_AND_START_TIME,
} from "../types";

const initialState = {
    locations: [],
    location: {},
    loading: false,
    registeredLocations: [],
    createdLocations: [],
    filteredLocations: null,
    locationId: "",
    uploadingLogo: false,
    doneUploadLogo: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_LOCATIONS:
            return {...state, locations: action.payload};
        case GET_LOCATION:
            return {...state, location: action.payload};
        case GOT_CREATED_LOCATIONS:
            return {...state, createdLocations: action.payload};
        case GOT_REGISTERED_LOCATIONS:
            return {...state, registeredLocations: action.payload};
        case CREATE_NEW_LOCATION:
            return {...state, locations: [...state.locations, action.payload], locationId: action.payload.id};
        case UPDATE_LOCATION:
            const index = state.createdLocations.findIndex((location) => location.id === action.payload.id);
            state.createdLocations[index] = action.payload;
            return {...state, locations: [...state.locations]};
        case DELETE_LOCATION:
            const updatedLocations = state.createdLocations.filter((location) => location.id !== action.payload);
            return {...state, createdLocations: updatedLocations};
        case UPLOADING_LOCATION_LOGO:
            return {...state, uploadingLogo: true};
        case DONE_UPLOAD_LOCATION_LOGO:
            return {...state, uploadingLogo: false, doneUploadLogo: true};
        case FILTER_LOCATION_BY_CITY:
            const filteredCities = state.locations.filter(location =>
                location.city === action.payload
            );
            return {...state, filteredLocations: filteredCities};
        case FILTER_LOCATION_BY_CITY_AND_START_DATE:
            const dateAndCity = [];
            state.locations.forEach(location => {
                const dateSplit = location.startDate.split("-").map(value => parseInt(value));
                const timeObj = new Date(dateSplit[0], dateSplit[1], dateSplit[2]);
                console.log(timeObj, action.payload.startDate);
                if (timeObj >= action.payload.startDate && location.city === action.payload.city) dateAndCity.push(location);
            });
            return {...state, filteredLocations: dateAndCity};
        case FILTER_LOCATION_BY_DISTRICT:
            const filteredDistricts = state.filteredLocations.filter(location =>
                location.district === action.payload
            );
            return {...state, filteredLocations: filteredDistricts};
        case FILTER_LOCATION_BY_DISTRICT_WITH_CITY_AND_START_TIME:
            const dateAndDistrict = [];
            state.locations.forEach(location => {
                console.log(action.payload);
                const dateSplit = location.startDate.split("-").map(value => parseInt(value));
                const timeObj = new Date(dateSplit[0], dateSplit[1], dateSplit[2]);
                if (timeObj >= action.payload.startDate
                    && location.city === action.payload.city
                    && location.district === action.payload.district) dateAndDistrict.push(location);
            });
            console.log(dateAndDistrict);
            return {...state, filteredLocations: dateAndDistrict};
        case FILTER_LOCATION_BY_START_DATE:
            const filteredStartDate = [];
            state.locations.forEach(location => {
                const dateSplit = location.startDate.split("-").map(value => parseInt(value));
                const timeObj = new Date(dateSplit[0], dateSplit[1], dateSplit[2]);
                if (timeObj >= action.payload) filteredStartDate.push(location);
            });
            return {...state, filteredLocations: filteredStartDate};
        case FILTER_LOCATION_BY_KEYWORD:
            const filteredKeyword = state.locations.filter(location =>
                location.name.toLowerCase() === action.payload.toLowerCase()
            );
            return {...state, filteredLocations: filteredKeyword};
        case CLEAR_CITY_FILTER:
            return {...state, filteredLocations: state.locations};
        case CLEAR_DISTRICT_FILTER_WITH_TIME_AND_CITY:
            console.log(action.payload);
            // const timeAndCity = state.locations.filter(location =>
            //
            // )
            return state;
        case CLEAR_ALL_FILTERS:
            return {...state, filteredLocations: state.locations};
        default:
            return state;
    }
}
