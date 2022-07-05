//대댓글 작성

import React from 'react';
import './Board.css';
// import { Link } from 'react-router-dom';
import { makeStyles, Typography } from "@material-ui/core";
// import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

const useStyles = makeStyles((theme) => ({

    replyDelete: {
        color: "gray",
        fontSize: "0.6rem",
        cursor: "pointer",
    },

}));
//
function WriteReply() {
    const classes = useStyles();
    const reply = [
        {
            writer: "익명",
            content: "대댓글 달고 갑니다~~~",
            date: "20/02/12/ 21:42",
            likeIcon: <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem' }} />,
            likeCount: "0", 
            id:1,     
        },
        {
            writer: "익명",
            content: "대댓나도 나두 나도 도나도나도나도나 ",
            date: "20/02/12/ 21:42",
            likeIcon: <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem' }} />,
            likeCount: "0",      
            id:2,  
        },
    ]

    return (
        <div>
            <List sx={{ marginTop: "-1rem" }}>
                {reply.map(item => (
                    <ListItem
                        sx={{ border: "2px gray dotted", height: "13vh", backgroundColor:"#F6F6F6" }}
                    // button
                    key={item.id}
                    // onClick={() => history.push(item.path)}
                    // className={location.pathname == item.path ? classes.active : null}
                    >
                        <ArrowForwardOutlinedIcon sx={{fontSize:"1rem", margin:"auto 1rem 4rem auto"}}/>
                        <div>
                            <ListItemText primary={item.writer}
                                primaryTypographyProps={{
                                    color: 'black',
                                    fontWeight: "bold",
                                    fontSize: "0.8rem",
                                    width: "2rem",

                                }} />

                            <ListItemText primary={item.content}
                                primaryTypographyProps={{
                                    color: 'black',
                                    fontSize: '0.8rem',
                                    width: "50rem",

                                }} />

                            <ListItemText primary={item.date}
                                primaryTypographyProps={{
                                    color: 'gray',
                                    fontSize: '0.5rem',
                                    width: "5rem",
                                }} />

                            <Typography className={classes.replyDelete}>삭제</Typography>
                        </div>

                        <ListItemIcon sx={{ marginLeft: "6.5%", color: '#C00000', cursor: "pointer" }}>{item.likeIcon}</ListItemIcon>
                        <ListItemText primary={item.likeCount}
                            primaryTypographyProps={{
                                width: "1rem",
                                fontSize: "0.5rem",
                                color: '#C00000',
                                margin: "0.5rem auto auto -2.2rem",
                                cursor: "pointer",
                            }} />

                    </ListItem>
                ))}
            </List>

        </div>
    )
}

export default WriteReply