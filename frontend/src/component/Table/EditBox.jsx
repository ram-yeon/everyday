//게시글 수정 박스
import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core";
import { Box, TextField } from '@mui/material/';
import BorderColorIcon from '@mui/icons-material/BorderColor';
// import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { FormControlLabel, Checkbox } from '@mui/material';

import * as BoardAPI from '../../api/Board';
import { Message } from '../Message';
import { SESSION_TOKEN_KEY } from '../Axios/Axios';

const useStyles = makeStyles((theme) => ({
    writeBox: {
        height: "auto",
        border: "2px lightgray solid",
        color: "gray",
        backgroundColor: "#00000",
        fontSize: "0.9rem",
        textAlign: "left",
        margin: "0.3rem auto",
    },
    writeContents: {
        height: "30vh",
        width: "98%",
        marginTop: "1rem",
        borderColor: "gray",
        borderRadius: "0.3rem",
    },
    boxFooter: {
        height: "1.7rem",
    },
    registerBtn: {
        cursor: "pointer",
        padding: "0.3rem",
        backgroundColor: "#C00000",
        color: "white",
        float: "right",
    },
    listBtn: {
        width: "10%",
        height: "2.5rem",
        background: "#C00000",
        color: "white",
        border: "none",
        cursor: "pointer",
        boxShadow: "0.1rem 0.1rem 0.3rem 0.1rem gray",
        borderRadius: "0.5rem",
        marginTop: "1rem",
        float: "right",
    },
}));

function EditBox(props) {
    const {
        boardType,
        postId,
        writtenTitle,
        writtenContents,
        editPost,
        handleIsInitialize,
    } = props;

    const classes = useStyles();
    const [title, setTitle] = useState(writtenTitle);
    const [contents, setContents] = useState(writtenContents);
    const [checked, setChecked] = useState(false);

    const token = localStorage.getItem(SESSION_TOKEN_KEY);
    const tokenJson = JSON.parse(atob(token.split(".")[1]));

    const handleSetTitle = (e) => {
        setTitle(e.target.value);
    };
    const handleSetContents = (e) => {
        setContents(e.target.value);
    };
    const handleCheckBox = (event) => {
        setChecked(event.target.checked);
    };

    //입력 글자 수 제한
    // const checkLength = (event) => {
    //     let text = event.value;
    //     let textLength = text.length;
    //     //최대 글자수
    //     let maxLength = 5;
    //     if (textLength > maxLength) {
    //         alert(maxLength + "자 이상 작성할 수 없습니다.");
    //         text = text.substr(0, maxLength);
    //         event.value = text;
    //         event.focus();
    //     }
    // };

    //글수정(파일제외)
    const handleUpdate = (e) => {
        if (!title || !contents) { //입력값체크
            alert("정확하게 입력하였는지 확인해주세요.");
        } else {
            let isAnonymous = '';
            if (checked) {
                isAnonymous = 'Y'
            } else {
                isAnonymous = 'N'
            }
            const data = {
                boardType: boardType,
                title: title,
                contents: contents,
                isAnonymous: isAnonymous,
            }
            if (boardType === '공지사항') {   //관리자 공지수정
                BoardAPI.updateBoardByAdmin(postId, data).then(response => {
                    Message.success(response.message);
                    editPost(false);
                    handleIsInitialize(false);
                }).catch(error => {
                    console.log(JSON.stringify(error));
                    Message.error(error.message);
                })
            } else {    //일반사용자 글수정
                BoardAPI.updateBoard(postId, data).then(response => {
                    Message.success(response.message);
                    editPost(false);
                    handleIsInitialize(false);
                }).catch(error => {
                    console.log(JSON.stringify(error));
                    Message.error(error.message);
                })
            }
        }
    };

    return (
        <div>
            <Box p={1.8} className={classes.writeBox}>
                <div>
                    <TextField id="standard-basic" label="글 제목" variant="standard" sx={{ width: "100%" }}
                        value={title} onChange={(e) => handleSetTitle(e)} />
                </div>
                <div>
                    <textarea
                        // onKeyUp={checkLength}
                        style={{ padding: "1rem", width: "100%", height: "26vh", fontSize: "0.9rem", fontFamily: "-moz-initial", marginTop: "1rem", resize: "none", whiteSpace: "pre-line" }}
                        value={contents}
                        onChange={(e) => handleSetContents(e)}
                    />
                </div>

                <hr style={{ marginBottom: "0.3rem" }} />

                <div className={classes.boxFooter}>
                    {
                        (tokenJson.account_authority === 'USER') &&
                        <FormControlLabel
                            control={<Checkbox color="default" size="small" />}
                            label="익명"
                            sx={{ margin: "auto auto auto 87%" }}
                            checked={checked}
                            onChange={handleCheckBox} />
                    }
                    <BorderColorIcon className={classes.registerBtn} onClick={handleUpdate} sx={{ fontSize: '2.5rem', marginTop: '-0.1rem' }} />
                </div>
            </Box>
            <button className={classes.listBtn} onClick={() => editPost(false)} >수정 취소</button>
        </div>
    )
}

export default EditBox
