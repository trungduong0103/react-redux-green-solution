import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List"
//import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button"

const styles = {
    title: {
        fontFamily: "'Oswald', sans-serif;",
    },
    avatar: {
        padding: 10,
        borderRadius: '50%',
        height: "50px",
        width: "50px",
    },
    cardText: {
        fontFamily: "'Quicksand', sans-serif;",
    },
    cardWrapper: {
        maxWidth: "auto",
        maxHeight: "auto",
        margin: 10,
        padding:"20px"
    },
    text: {
        fontSize: 13,
        fontFamily: "'Quicksand', sans-serif;",
    },
    cardContent: {

    },
    cardList: {
        overflow: 'auto',
        maxHeight: 400,
        width: '100%',
    },
    customBtn: {
        borderRadius: 20,
        margin: "0 10px",
        border: "1px solid black",
        fontSize: 15,
        fontFamily: "'Quicksand', sans-serif;",
        backgroundColor: "white",
        color: "black",
        transition: "all 350ms ease-in-out",
        "&:hover": {
            backgroundColor: "#7F986F",
        },
        marginTop: 15,
    }


};

class UserGridList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange = (e)=>{
        this.props.addEmail(e.target.value)
    }

    render() {
        const {classes, userList, emailList, clear, selectAll, handleOpenEmailForm, checkUser} = this.props;
        return (
            <List className={classes.cardList}>
                {checkUser && <div>
                <Typography align="center" variant="h4" gutterBottom className={classes.title}>Danh sách tình nguyện
                    viên</Typography>
                    <div style={{width:"100%",textAlign:"right"}}>
                        <Button className={classes.customBtn} disabled={userList===undefined || userList===null || userList.length===0}
                                onClick={()=>selectAll()}>Chọn hết</Button>
                        <Button className={classes.customBtn} disabled={emailList===undefined || emailList===null || emailList.length===0}
                                onClick={()=>clear()}>Bỏ chọn hết</Button>
                        <Button className={classes.customBtn} disabled={emailList===undefined || emailList===null || emailList.length===0}
                                onClick={()=>handleOpenEmailForm()}>Gửi email</Button>
                    </div>
                <Grid container>
                    {userList!== undefined && userList.map(user => (
                        <Grid item sm={4} key={user.id}>
                            <Card className={classes.cardWrapper}>
                                <Grid container direction="row" alignItems="center" justify="center" spacing={4}>
                                    <Grid item sm={9}>
                                        {/* <Avatar style={{marginLeft: "0.7em"}} alt="Remy Sharp" src={user.img}/> */}
                                        <Typography className={classes.text}>{user}</Typography>
                                    </Grid>
                                    <Grid item sm={3}>
                                        
                                        {checkUser && <input onChange={this.handleChange} value={user} type="checkbox" checked={emailList.includes(user)}></input>}
                                        {/* <Typography className={classes.text}>Mua dụng
                                            cụ: {user.buyTools === true ? "Có" : "Không"}</Typography>
                                        <Typography className={classes.text}>Size áo: {user.size}</Typography> */}
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                </div>}
            </List>
        )
    }
}

export default withStyles(styles)(UserGridList)
