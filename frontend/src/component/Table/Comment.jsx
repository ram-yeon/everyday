import React, { useState, useEffect, useRef } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { FormControlLabel, Checkbox } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';                //채워진좋아요
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';    //좋아요
import { useSelector, useDispatch } from "react-redux";
import uuid from "react-uuid";
import { addComment, editComment, removeComment } from "../../redux/comment";
import ReplyComment from "./ReplyComment";
// dot icon
import { Stack, Button, Divider, Paper, Box } from "@mui/material";
// markdown, toast editor
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import Markdown from "../../component/Markdown";
import {
  check_kor,
  timeForToday,
  Item,
  // ProfileIcon
} from "../../component/CommentTool";

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


const Comment = ({ user }) => {
  const classes = useStyles();
  const [commentVal, setCommentVal] = useState('');

  const [local, setLocal] = useState([]);
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment);
  const [display, setDisplay] = useState(false);
  const editorRef = useRef();
  const date = new Date(); // 작성 시간

  //댓글 편집하기 위한 에디터 open
  const [openEditor, setOpenEditor] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    //마크다운 변환
    const editorInstance = editorRef.current.getInstance();
    const getContent = editorInstance.getMarkdown();
    setDisplay(!display);

    // 데이터 저장
    const data = {
      content: getContent,
      writer: user,
      postId: "123123",
      responseTo: "root",
      commentId: uuid(),
      created_at: `${date}`
    };
    dispatch(addComment(data));
  };

  //댓글 편집
  const onEdit = (commentId) => {
    // console.log(commentId);
    const editorInstance = editorRef.current.getInstance();
    const getContent = editorInstance.getMarkdown();
    console.log(getContent);

    let data = { commentId: commentId, content: getContent };
    dispatch(editComment(data));
  };

  //댓글 삭제
  const onRemove = (commentId) => {
    dispatch(removeComment(commentId));
  };

  useEffect(() => {
    localStorage.setItem("reply", JSON.stringify(comments));
    setLocal(comments.filter((comment) => comment.responseTo === "root"));
  }, [comments]);

  return (
    <Paper sx={{ m: 0, p: 2 }}>
      {local.map((comment, index) => (
        <Box sx={{ mt: 2, mb: 2 }} key={comment.commentId}>
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
            <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem', color: '#C00000', cursor: 'pointer' }} />
            <span style={{ marginLeft: "0.2rem", marginTop: "0.2rem", fontSize: "0.7rem", color: '#C00000', cursor: 'pointer' }}>0</span>
          </Stack>

          {/* comment 글 내용 */}
          <Box
            key={index}
            sx={{ padding: "0px 20px", color: comment.exist || "grey", ml: 1.5, }}
          // exist는 초기값으로 true를 가지며, removeComment를 통해 false로 변경됨
          >
            <Markdown comment={comment} />
          </Box>

          {/* comment 수정 */}
          {comment.exist && user === comment.writer && (
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
              <Button sx={{ ml: 1 }}
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

          <Divider variant="middle" />
        </Box>
      ))}

      {/* <Button
        
        sx={{ width: "20rem", border: "gray solid 1px", mb: 2 }}
      >
        댓글을 입력하세요.
      </Button> */}

      <div style={{marginTop:'2rem', marginBottom:'-0.8rem'}}>
        <input
          readOnly
          onClick={() => {
            setDisplay(!display);
          }}
          className="comment-input" type="text" name="comment" id="comment1" placeholder="댓글을 입력하려면 클릭하세요."
          value={commentVal} />
        <FormControlLabel control={<Checkbox color="default" size="small" />}
          label="익명" className={classes.checkAnonymous} sx={{ marginLeft: "86%" }} />
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

export default Comment;