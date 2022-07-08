import React, { useState, useEffect, useRef } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { FormControlLabel, Checkbox } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';                //채워진좋아요
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';    //좋아요
import { Stack, Button, Divider } from "@mui/material";
import { Box } from '@mui/material/';
import uuid from "react-uuid";

import { useSelector, useDispatch } from "react-redux";
import { addComment, editComment, removeComment } from "../../redux/comment";
import Markdown from "../../component/Markdown";
import { Editor } from "@toast-ui/react-editor";

import {
  check_kor,
  timeForToday,
  Item,
  ProfileIcon
} from "../../component/CommentTool";

const useStyles = makeStyles((theme) => ({
  checkAnonymous: {
    marginTop: "-4.3rem",
  },
}));

const ReplyComment = ({ responseTo, user }) => {
  const classes = useStyles();
  const [local, setLocal] = useState([]);
  const [display, setDisplay] = useState(false);

  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment);
  const editorRef = useRef();

  //댓글 편집하기 위한 에디터 open
  const [openEditor, setOpenEditor] = useState("");
  const date = new Date(); // 작성 시간

  const onSubmit = (e) => {
    e.preventDefault();
    const editorInstance = editorRef.current.getInstance();
    const getContent = editorInstance.getMarkdown();

    const data = {
      content: getContent,
      writer: user,
      postId: "123123",
      responseTo: responseTo,
      commentId: uuid(),
      created_at: `${date}`
    };
    dispatch(addComment(data));
  };

  //댓글 편집
  const onEdit = (commentId) => {
    const editorInstance = editorRef.current.getInstance();
    const getContent = editorInstance.getMarkdown();
    console.log(getContent);

    let data = { commentId: commentId, content: getContent };
    dispatch(editComment(data));
  };

  // 댓글 삭제
  const onRemove = (commentId) => {
    dispatch(removeComment(commentId));
  };

  useEffect(() => {
    localStorage.setItem("reply", JSON.stringify(comments));
    setLocal(comments.filter((comment) => comment.responseTo === responseTo));
  }, [comments, responseTo]);
  return (
    <Stack sx={{ m: 1, ml: 4 }}>
      <Button
        onClick={() => {
          setDisplay(!display);
        }}
        sx={{ display: "flex", justifyContent: "flex-start", width: "8rem" }}
      >
        {display && "댓글 숨기기"}
        {!display &&
          (local.length === 0 ? "댓글 달기" : `${local.length}개의 댓글 보기`)}
      </Button>

      {display && (
        <div>
          {local.map((comment, index) => (
            <Box sx={{ m: 2 }} key={comment.commentId}>
              {/* writer 정보, 작성 시간 */}
              <Stack direction="row" spacing={2}>
                <AccountCircleIcon sx={{ color: 'gray', mt: 0.5, mr: -1 }} >
                  {check_kor.test(comment.writer)
                    ? comment.writer.slice(0, 1)
                    : comment.writer.slice(0, 2)}
                </AccountCircleIcon>
                <Item>{comment.writer}</Item>
                {/* <Item>{timeForToday(comment.created_at)}</Item> */}
                <Item sx={{ fontSize: '0.5rem' }}>2022-08-22 17:55:55</Item>
                <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem', color: '#C00000', cursor: 'pointer', marginTop: "1rem" }} />
                <span style={{ marginLeft: "0.2rem", marginTop: "0.2rem", fontSize: "0.7rem", color: '#C00000', cursor: 'pointer' }}>0</span>
              </Stack>
              {/* comment 글 내용 */}
              <Box
                key={index}
                sx={{ padding: "0px 20px", color: comment.exist ?? "grey" }}
              >
                <Markdown comment={comment} />
              </Box>
              {/* comment 수정 */}
              {user === comment.writer && (
                <>
                  {openEditor === comment.commentId && (
                    <Editor initialValue={comment.content} ref={editorRef} />
                  )}
                  {/* <Button
                    onClick={() => {
                      if (comment.commentId === openEditor) {
                        onEdit(comment.commentId);
                        setOpenEditor("");
                      } else {
                        setOpenEditor(comment.commentId);
                      }
                    }}
                  >
                    수정
                  </Button> */}

                  {/* comment 삭제 */}
                  <Button sx={{ml:1}}
                    onClick={() => {
                      onRemove(comment.commentId);
                    }}
                  >
                    삭제
                  </Button>
                </>
              )}
              {/* 대댓글 컴포넌트 */}
              <ReplyComment responseTo={comment.commentId} user={user} />
              <Divider variant="middle" />{" "}
            </Box>
          ))}

          <Editor
            ref={editorRef} initialValue={"내용을 입력하세요."} 
          />

          <div style={{ marginTop: "0.2rem" }} >
            <Button onClick={onSubmit} sx={{ml:-1}}>등록</Button>
          <FormControlLabel control={<Checkbox color="default" size="small" />}
          label="익명" className={classes.checkAnonymous} sx={{ marginLeft: "90%" }} />
          </div>
        </div>
      )}
    </Stack>
  );
};

export default ReplyComment;