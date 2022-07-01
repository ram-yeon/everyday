import React from 'react'
import { Container, Modal, makeStyles, ListItemIcon } from "@material-ui/core";
import ChatIcon from '@mui/icons-material/Chat';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import TextsmsIcon from '@mui/icons-material/Textsms';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { Avatar } from 'antd';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import * as UserAPI from '../api/Users';
import { Message } from '../component/Message';
import { SESSION_TOKEN_KEY } from '../component/Axios/Axios';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    myImg: {
        [theme.breakpoints.down("sm")]: {
        },
    },
    modal: {
        width: 200,
        height: 470,
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

function ModalContainer(props) {
    const {
        open,
        handleClose,
        loginCallBack,
        id,
        name,
        nickname,
    } = props;
    const classes = useStyles();
    const navigate = useNavigate();
    const myDataList = [
        {
            text: "내가 쓴 글",
            icon: <ChatIcon />,
            idx: '0',
            path: '/'
        },
        {
            text: "댓글 단 글",
            icon: <TextsmsIcon />,
            idx: '1',
            path: '/'
        },
        {
            text: "좋아요 한 글",
            icon: <ThumbUpIcon />,
            idx: '2',
            path: '/'
        },
        {
            text: "로그아웃",
            icon: <ExitToAppIcon />,
            idx: '3'
        },
        {
            text: "탈퇴하기",
            icon: <SentimentDissatisfiedIcon />,
            idx: '4'
        }
    ]
    const handleListItemClick = (event, idx) => {
        if (Number(idx) === 3) { //로그아웃
            UserAPI.logout().then(response => {
                console.log(JSON.stringify(response));
                localStorage.removeItem(SESSION_TOKEN_KEY);
                loginCallBack(false);
                navigate("/");
            }).catch(error => { //만료된 토큰이거나 존재하지않는 토큰이면 강제로그아웃
                console.log(JSON.stringify(error));
                Message.error(error.message);
                localStorage.removeItem(SESSION_TOKEN_KEY);
                loginCallBack(false);
                navigate("/");
            });
        }
        else if (Number(idx) === 4) { //탈퇴하기
            UserAPI.resign().then(response => {
                console.log(JSON.stringify(response));
                localStorage.removeItem(SESSION_TOKEN_KEY);
                loginCallBack(false);
                navigate("/");
            }).catch(error => { 
                console.log(JSON.stringify(error));
                Message.error(error.message);
            });
        }
    };
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Container className={classes.modal}>
                    <Avatar alt="My계정 이미지" src={"/images/myImg.png"} />
                    <p style={{ fontWeight: "bold" }}>{nickname}</p>
                    <div style={{ color: "gray", fontSize: "0.8rem" }}>{name}</div>
                    <div style={{ color: "gray", fontSize: "0.8rem", marginBottom: "1rem" }}>{id}</div>
                    <hr />
                    <List>
                        {myDataList.map(item => (
                            <ListItemButton
                                key={item.text}
                                sx={{ padding: "0.5rem 0rem 0.5rem 0.5rem" }}
                                onClick={(event) => handleListItemClick(event, item.idx)}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} sx={{ marginLeft: "-1rem" }} />
                            </ListItemButton>
                        ))}
                    </List>
                </Container>
            </Modal>
        </div>
    )
};

export default ModalContainer

