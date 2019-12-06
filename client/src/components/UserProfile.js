import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import jwtDecode from "jwt-decode";

//Material-UI
import {Link} from "react-router-dom";
import Footer from "./Footer"
import NavBar from "./NavBar";

import Table from "@material-ui/core/Table"
import IconButton from "@material-ui/core/IconButton"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper"
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"

import {
    getAllRegisteredLocationsWithEmail,
    getAllCreatedLocationsWithEmail, deleteLocation
} from "../redux/actions/LocationActions";


const styles = {
    title: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 25,
        padding: 10,
        textAlign: "center"
    },
    table: {
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 15
    },
    wrapper: {
        height: "650px"
    },
    tableForm: {
        padding: "20px 30px"
    }
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registeredLocations: [],
            createdLocations: [],
            email: ""
        }
    }

    componentDidMount() {
        const auth = localStorage.getItem("FBIdToken");
        if (!auth) {
            alert("Bạn phải đăng nhập trước.");
            window.location.href = "/authentication";
        }
        const decodedToken = jwtDecode(auth);
        this.setState({
            email: decodedToken.email
        });
        this.props.getAllCreatedLocationsWithEmail({email: decodedToken.email});
        this.props.getAllRegisteredLocationsWithEmail({email: decodedToken.email});
    }

    static getDerivedStateFromProps(props, state) {
        if (props.createdLocations !== state.createdLocations) {
            return {
                createdLocations: props.createdLocations
            }
        }
        if (props.registeredLocations !== state.registeredLocations) {
            return {
                registeredLocations: props.registeredLocations
            }
        }
        return null;
    }

    handleDeleteLocation = (locationId) => {
        this.props.deleteLocation(locationId, this.state.email);
    };

    render() {
        const {classes} = this.props;
        const {registeredLocations, createdLocations} = this.state;
        console.log(this.state);
        return (
            <div>
                <NavBar/>

                    <Grid container className={classes.wrapper}>
                        <Grid item xs={4} className={classes.tableForm}>
                            <Typography className={classes.title}>Danh sách sự kiện đã tham gia</Typography>
                            <Paper>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" className={classes.table}>Số thứ tự</TableCell>
                                            <TableCell align="center" className={classes.table}>Tên sự kiện</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {registeredLocations.map(location => (
                                            <TableRow key={location.id}>
                                                <TableCell component="th" scope="row" align="center"
                                                           className={classes.table}>
                                                    {location.id}
                                                </TableCell>
                                                <TableCell align="center"
                                                           className={classes.table}>{location.name}</TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>

                        <Grid item xs={8}  className={classes.tableForm}>
                            <Typography className={classes.title}>Danh sách sự kiện đã tạo</Typography>
                            <Paper className={classes.root}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" className={classes.table}>Tên sự kiện</TableCell>
                                            <TableCell align="center" className={classes.table}>Thay đổi</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {createdLocations.map(location => (
                                            <TableRow key={location.id}>
                                                <TableCell align="center"
                                                           className={classes.table}>{location.name}</TableCell>
                                                <TableCell align="center" omponent="th" scope="row"
                                                           className={classes.table}>
                                                    <IconButton
                                                        className={classes.button}
                                                        onClick={() => this.handleDeleteLocation(location.id)}>
                                                        <DeleteIcon color="secondary"/>
                                                    </IconButton>
                                                    <IconButton
                                                        className={classes.button}
                                                        onClick={console.log("edit")}>
                                                        <EditIcon color="primary"/>
                                                    </IconButton>

                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    createdLocations: state.locationsData.createdLocations,
    registeredLocations: state.locationsData.registeredLocations
});

const mapDispatchToProps = {
    getAllCreatedLocationsWithEmail,
    getAllRegisteredLocationsWithEmail,
    deleteLocation
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
