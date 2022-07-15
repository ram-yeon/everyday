import React, { useState, useRef } from "react";
import Comment from './Comment';
import { makeStyles } from "@material-ui/core";
import { FormControlLabel, Checkbox, Paper } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import * as BoardAPI from '../../../api/Board';
import { Message } from '../../Message';

const useStyles = makeStyles((theme) => ({
  checkAnonymous: {
    marginTop: "-4.3rem",
  },
  registerBtn: {
    width: "1.5rem",
    height: "1.5rem",
    padding: "0.5rem",
    backgroundColor: "#C00000",
    color: "white",
    float: "right",
    cursor: "pointer",
    marginTop: "-2.6rem",
  },
}));

const CommentList = (props) => {
  const classes = useStyles();
  const commentData = props.comment;
  const [display, setDisplay] = useState(false);
  const editorRef = useRef();
  const [checked, setChecked] = useState(false);

  const handleCheckBox = (event) => {
    setChecked(event.target.checked);
  };

  //댓글등록
  const onSubmit = (e) => {
    // e.preventDefault();

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
      postId: props.postId,
      contents: getContent,
      commentType: "COMMENT",
      isAnonymous: isAnonymous,
    };
    //댓글 등록(db)
    BoardAPI.registerComment(data).then(response => {
      Message.success(response.message);
    }).catch(error => {
      console.log(JSON.stringify(error));
      Message.error(error.message);
    })
    setDisplay(!display);
  };

  return (
    <Paper sx={{ m: 0, p: 2 }}>
      {commentData.map((comment, index) => (
        <Comment comment={comment} postId={props.postId} key={index} />
      ))}

      <div style={{ marginTop: '2rem', marginBottom: '-0.8rem' }}>
        <input
          readOnly
          onClick={() => {
            setDisplay(!display);
          }}
          className="comment-input" type="text" name="comment" id="comment1" placeholder="댓글을 입력하려면 클릭하세요." />
        <FormControlLabel control={<Checkbox color="default" size="small" />}
          label="익명" className={classes.checkAnonymous} sx={{ marginLeft: "86%" }} checked={checked} onChange={handleCheckBox} />
        <BorderColorIcon onClick={onSubmit} className={classes.registerBtn} />
      </div>

      {display && (
        <>
          <Editor ref={editorRef} initialValue={"내용을 입력하세요."} />
        </>
      )}
    </Paper>
  );
};

export default CommentList;