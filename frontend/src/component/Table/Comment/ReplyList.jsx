import React, { useState, useEffect, useRef } from "react";
import Reply from './Reply';
import { makeStyles } from "@material-ui/core";
import { FormControlLabel, Checkbox } from '@mui/material';
import { Stack, Button } from "@mui/material";
import { Editor } from "@toast-ui/react-editor";
import * as BoardAPI from '../../../api/Board';
import { Message } from '../../Message';

const useStyles = makeStyles((theme) => ({
  checkAnonymous: {
    marginTop: "-4.3rem",
  },
}));

const ReplyList = (props) => {
  const [reply, setReply] = useState([]);
  const [checked, setChecked] = useState(false);
  // const [initCommentId] = useState(props.commentId);
  const [isInitialize, setIsInitialize] = useState(false);

  const handleCheckBox = (event) => {
    setChecked(event.target.checked);
  };
  const handleIsInitialize = (value) => {
    setIsInitialize(value);
  }

  const classes = useStyles();
  const [display, setDisplay] = useState(false);
  const editorRef = useRef();

  //대댓글등록
  const onSubmit = (e) => {
    e.preventDefault();

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
      commentType: "REPLY",
      isAnonymous: isAnonymous,
      preId: props.commentId
    };
    //대댓글 등록(db)
    BoardAPI.registerComment(data).then(response => {
      Message.success(response.message);
      handleIsInitialize(false);
    }).catch(error => {
      console.log(JSON.stringify(error));
      Message.error(error.message);
    })
    setDisplay(!display);
  };

  const replyApiData = {
    postId: props.postId,
    commentId: props.commentId,
  }
  useEffect(() => {
    if (!isInitialize) {
      BoardAPI.boardReplySelect(replyApiData).then(response => {
        const replyItems = [];
        response.data.comment.forEach((v, i) => {
          const commentWriter = (JSON.stringify(v.writer).replaceAll("\"", ""));
          const commentContents = (JSON.stringify(v.contents).replaceAll("\"", ""));
          const commentRegistrationDate = (v.registrationDate);
          const likeCount = (v.likeCount);
          const isLikeComment = (JSON.stringify(v.isLikeComment).replaceAll("\"", ""));     //해당 댓글 좋아요했는지에 대한 상태값
          const writerLoginId = (v.writerLoginId);
          replyItems.push({
            commentWriter: commentWriter, commentContents: commentContents, commentRegistrationDate: commentRegistrationDate,
            isLikeComment: isLikeComment === 'Y' ? true : false, likeCount: likeCount, writerLoginId: writerLoginId,
            commentId: v.id,
          });
        })
        setReply(replyItems);
        handleIsInitialize(true);
      }).catch(e => {
        setReply([]);
      })
    }
  });

  const clickToRegister = () => {
    setDisplay(!display);
  }

  return (
    <Stack sx={{ m: 1, ml: 5 }}>
      <Button sx={{ display: "flex", justifyContent: "flex-start", width: "8rem", fontSize: "0.8rem" }}
        onClick={() => clickToRegister()}>
        {!display && "+ 댓글 달기"}
        {display && "- 숨기기"}
      </Button>
      {display && (
        <>
          <Editor ref={editorRef} initialValue={" "} placeholder={"내용을 입력하세요."} />
          <div style={{ marginTop: "0.2rem" }} >
            <Button onClick={onSubmit} sx={{ ml: -1 }}>등록</Button>
            <FormControlLabel control={<Checkbox color="default" size="small" />}
              label="익명" className={classes.checkAnonymous} sx={{ marginLeft: "90%" }} checked={checked} onChange={handleCheckBox} />
          </div>
        </>
      )}

      {reply.map(reply => (
        <Reply key={reply} reply={reply} handleIsInitialize={handleIsInitialize} />
      ))}

    </Stack>
  );
};

export default ReplyList;