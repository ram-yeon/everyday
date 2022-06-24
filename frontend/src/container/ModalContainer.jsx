import React from 'react'
import { Container, Modal, makeStyles, ListItemIcon } from "@material-ui/core";
import ChatIcon from '@mui/icons-material/Chat';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import TextsmsIcon from '@mui/icons-material/Textsms';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Avatar } from 'antd';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

// import * as UserAPI from '../../api/Users';
// import { Message } from '../../component/Message';

const useStyles = makeStyles((theme) => ({
    myImg: {

        [theme.breakpoints.down("sm")]: {

        },
    },

    modal: {
        width: 200,
        height: 420,
        backgroundColor: "white",
        position: "absolute",
        top: 80,
        right: 50,
        margin: "auto",
        textAlign: "center",
        paddingTop: "3rem",
        outline: "none",
        [theme.breakpoints.down("sm")]: {
        },
    },

}));

const ModalContainer = ({
    open,
    handleClose,
    ...props
}) => {

    const classes = useStyles();
    const myDataList = [
        {
            text: "내가 쓴 글",
            icon: <ChatIcon />,
            path: '/'

        },
        {
            text: "댓글 단 글",
            icon: <TextsmsIcon />,
            path: '/'
        },
        {
            text: "좋아요 한 글",
            icon: <ThumbUpIcon />,
            path: '/'
        },
        {
            text: "로그아웃",
            icon: <ExitToAppIcon />,
            path: '/'
        }
    ]
    const handleList = (event) => {
        // event.preventDefualt();
        if (event === "로그아웃") {
            alert(event);
        }

    }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Container className={classes.modal}>
                    <Avatar alt="My계정 이미지" src={"/images/myImg.png"} />
                    <p style={{ fontWeight: "bold" }}>닉네임이다악</p>
                    <div style={{ color: "gray", fontSize: "0.8rem" }}>정보람</div>
                    <div style={{ color: "gray", fontSize: "0.8rem", marginBottom: "1rem" }}>cjstk4285</div>
                    <hr />
                    <List>
                        {myDataList.map(item => (
                            <ListItem
                                button
                                key={item.text}
                                sx={{ padding: "0.5rem 0rem 0.5rem 0.5rem" }}
                                // onClick={handleList(item.text)}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} sx={{ marginLeft: "-1rem" }} />
                            </ListItem>
                        ))}
                    </List>
                </Container>
            </Modal>
        </div>
    )
};

export default ModalContainer

//로그아웃api
// const data = {
//     loginId: idVal,
//     password: pwVal,
//     type: state,
//     isKeptLogin: isKeptLogin,
// }
//   UserAPI.logout(data).then(response => {
//     console.log(JSON.stringify(response));
//     removeCookie('access-token');
//     localStorage.removeItem('refresh-token');
//     navigate("/");
//   }).catch(error => {
//     console.log(JSON.stringify(error));
//     Message.error(error.message);
//   });