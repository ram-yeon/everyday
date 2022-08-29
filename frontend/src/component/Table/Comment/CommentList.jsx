import React, { useState, useRef } from "react";
import Comment from './Comment';
import * as BoardAPI from '../../../api/Board';
import { Message } from '../../Message';
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import { makeStyles } from "@material-ui/core";
import { FormControlLabel, Checkbox, Paper } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const useStyles = makeStyles(() => ({
  commentInputBox: {
    border: "lightgray 1px solid",
    backgroundColor: "#F6F6F6",
    height: "2.5rem",
    padding: "0.5rem",
    width: "95%",
  },
  checkAnonymous: {
    marginTop: "-4.3rem",
  },
  registerBtn: {
    padding: "0.3rem",
    backgroundColor: "#C00000",
    color: "white",
    float: "right",
    cursor: "pointer",
    marginTop: "-2.5rem",
  },
}));

const CommentList = (props) => {
  const {
    comment,
    postId,
    handleIsInitialize,
  } = props;
  const classes = useStyles();
  const [display, setDisplay] = useState(false);
  const editorRef = useRef();
  const [checked, setChecked] = useState(false);

  const handleCheckBox = (event) => {
    setChecked(event.target.checked);
  };

  //댓글등록
  const onSubmit = (e) => {

    //마크다운 변환
    const editorInstance = editorRef.current.getInstance();
    const getContent = editorInstance.getMarkdown();

    let isAnonymous = '';
    if (checked) {
      isAnonymous = 'Y'
    } else {
      isAnonymous = 'N'
    }
    const data = {
      postId: postId,
      contents: getContent,
      commentType: "COMMENT",
      isAnonymous: isAnonymous,
    };
    //댓글 등록(db)
    BoardAPI.registerComment(data).then(response => {
      Message.success(response.message);
      handleIsInitialize(false);
    }).catch(error => {
      console.log(JSON.stringify(error));
      Message.error(error.message);
    })
    setDisplay(!display);
  };

  return (
    <Paper sx={{ m: 0, p: 2 }}>
      {comment.map((comment, index) => (
        <Comment comment={comment} postId={postId} key={index} handleIsInitialize={handleIsInitialize} />
      ))}

      <div style={{ marginTop: '2rem', marginBottom: '-0.8rem' }}>
        <div
          onClick={() => { setDisplay(!display); }}
          className={classes.commentInputBox}>
          댓글을 입력하려면 클릭하세요.
        </div>
        <FormControlLabel control={<Checkbox color="default" size="small" />}
          label="익명" className={classes.checkAnonymous} sx={{ marginLeft: "86%" }} checked={checked} onChange={handleCheckBox} />
        <BorderColorIcon onClick={onSubmit} className={classes.registerBtn} sx={{ fontSize: "2.5rem" }} />
      </div>

      {display && (
        <>
          <Editor ref={editorRef} initialValue={" "} placeholder={"내용을 입력하세요."} />
        </>
      )}
    </Paper>
  );
};

export default CommentList;