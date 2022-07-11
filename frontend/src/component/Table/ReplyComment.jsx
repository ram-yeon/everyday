import React, { useState, useEffect, useRef } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { FormControlLabel, Checkbox } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';                //채워진좋아요
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';    //좋아요
import { Stack, Button, Divider } from "@mui/material";
import { Box } from '@mui/material/';
import uuid from "react-uuid";
import { useSelector, useDispatch } from "react-redux";
import { addComment, editComment, removeComment } from "../../redux/comment";
import Markdown from "../../component/Markdown";
import { Editor } from "@toast-ui/react-editor";
import * as BoardAPI from '../../api/Board';
import { Message } from '../../component/Message';
import { SESSION_TOKEN_KEY } from '../../component/Axios/Axios';

import {
  check_kor,
  displayDateForComment,
  Item,
  // ProfileIcon
} from "../../component/CommentTool";
import { DriveEta } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  checkAnonymous: {
    marginTop: "-4.3rem",
  },
}));

const ReplyComment = (props) => {
  // console.log(props.responseTo, props.postId)
  let token = localStorage.getItem(SESSION_TOKEN_KEY);
  const tokenJson = JSON.parse(atob(token.split(".")[1]));

  const [replyId, setReplyId] = useState(props.responseTo);
  const [reply, setReply] = useState([]);
  const [checked, setChecked] = useState(false);
  const handleCheckBox = (event) => {
    setChecked(event.target.checked);
  };

  const classes = useStyles();
  const [local, setLocal] = useState([]);
  const [display, setDisplay] = useState(false);
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment);
  const editorRef = useRef();
  //댓글 편집하기 위한 에디터 open
  const [openEditor, setOpenEditor] = useState("");
  const date = new Date(); // 작성 시간

  //대댓글등록
  const onSubmit = (e) => {
    e.preventDefault();

    //마크다운 변환
    const editorInstance = editorRef.current.getInstance();
    const getContent = editorInstance.getMarkdown();
    setDisplay(!display);

    let isAnonymous = '';
    if (checked) {
      isAnonymous = 'Y'
    } else {
      isAnonymous = 'N'
    }
    const data = {
      // writer: '익명',
      // responseTo: "root",
      // commentId: uuid(),
      // created_at: `${date}`,

      postId: props.postId,
      content: getContent,
      commentType: "REPLY",
      isAnonymous: isAnonymous,
      preId: props.responseTo     //preId를 어떻게 줄지
    };
    //댓글 등록(redux)
    dispatch(addComment(data));
    //댓글 등록(db)
    BoardAPI.registerComment(data).then(response => {
      Message.success(response.message);
    }).catch(error => {
      console.log(JSON.stringify(error));
      Message.error(error.message);
    })
  };

  //댓글 편집
  // const onEdit = (commentId) => {
  //   const editorInstance = editorRef.current.getInstance();
  //   const getContent = editorInstance.getMarkdown();
  //   console.log(getContent);

  //   let data = { commentId: commentId, content: getContent };
  //   dispatch(editComment(data));
  // };

  // 댓글 삭제
  const onRemove = (commentId) => {
    dispatch(removeComment(commentId));
  };
  const deleteComment = (commentId) => {
    BoardAPI.deleteComment(commentId).then(response => {
      Message.success(response.message);
    }).catch(error => {
      console.log(JSON.stringify(error));
      Message.error(error.message);
    })
  };

  useEffect(() => {
    localStorage.setItem("reply", JSON.stringify(comments));
    // setLocal(comments.filter((comment) => comment.responseTo === responseTo));
  }, [comments, props.responseTo]);


  const clickToView = () => {
    if (!display) {
      BoardAPI.boardReplySelect(replyId).then(response => {
        if (response.data.hasOwnProperty('reply')) {
          const replyItems = [];
          response.data.reply.forEach((v, i) => {
            const commentWriter = v.commentWriter;
            const commentContents = v.commentContents;
            const registrationDate = v.registrationDate;
            const commentId = v.commentId;
            const commentType = v.commentType;            //댓글인지 대댓글인지
            const likeCount = v.likeCount;
            let likeState = ''
            // const isLikeComment = v.isLikeComment;    //해당 댓글 좋아요했는지에 대한 상태값  (댓글좋아요고민,,,)
            // if (isLikeComment === "Y") {
            //   likeState = 'true';
            // } else {
            //   likeState = 'false';
            // }
            // //preId가있는경우(->대댓글)
            // if (v.hasOwnProperty('preId')) {
            //   preId = v.preId;
            // }
            replyItems.push({
              commentWriter: commentWriter, commentContents: commentContents, registrationDate: registrationDate,
              commentId: commentId, commentType: commentType, likeCount: likeCount, likeState: likeState,
            });
          })
          setReply(replyItems);
        }
      })
    }
    setDisplay(!display);
  }

  return (
    <Stack sx={{ m: 1, ml: 4 }}>
      <Button
        onClick={() => clickToView()}
        sx={{ display: "flex", justifyContent: "flex-start", width: "8rem" }}
      >
        {display && "댓글 숨기기"}
        {!display &&
          (reply.length === 0 ? "댓글 달기" : `${reply.length}개의 댓글 보기`)}
      </Button>

      {display && (
        <div>
          {reply.map((comment, index) => (
            <Box sx={{ m: 2 }} key={comment.commentId} >
              {/* writer 정보, 작성 시간 */}
              <Stack direction="row" spacing={2}>
                <AccountCircleIcon sx={{ color: 'gray', mt: 0.5, mr: -1 }} >
                  {check_kor.test(comment.commentWriter)
                    ? comment.commentWriter.slice(0, 1)
                    : comment.commentWriter.slice(0, 2)}
                </AccountCircleIcon>
                <Item style={{ color: 'black' }}>{comment.commentWriter}</Item>
                {/* <Item>{timeForToday(comment.created_at)}</Item> */}
                <Item sx={{ fontSize: '0.5rem' }}>{displayDateForComment(comment.registrationDate)}</Item>

                {
                  (true) ?
                    <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem', color: '#C00000', cursor: 'pointer' }} />
                    :
                    <FavoriteOutlinedIcon sx={{ fontSize: '1rem', color: '#C00000', cursor: 'pointer' }} />
                }<span style={{ marginLeft: "0.2rem", marginTop: "0.2rem", fontSize: "0.7rem", color: '#C00000', cursor: 'pointer' }}>0</span>
                {/* 추후 true->!likeState,  0 -> {likeCount}, onClick={clickLike} 달기 */}

              </Stack>
              {/* comment 글 내용 */}
              <Box
                key={index}
                sx={{ padding: "0px 20px", color: comment.exist ?? "grey" }}
              >
                <Markdown comment={comment} />
              </Box>

              {/* comment 수정 */}
              {tokenJson.sub === comment.commentWriter && (
                <>
                  {openEditor === comment.commentId && (
                    <Editor initialValue={comment.commentContents} ref={editorRef} />
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
                      deleteComment(comment.commentId);
                    }}
                  >
                    삭제
                  </Button>
                </>
              )}
              {/* 대댓글 컴포넌트 -> 주석처리(대댓글까지만 구현) */}
              <ReplyComment responseTo={comment.commentId}  />               
              <Divider variant="middle" />{" "}
            </Box>
          ))}

          <Editor
            ref={editorRef} initialValue={"내용을 입력하세요."}
          />

          <div style={{ marginTop: "0.2rem" }} >
            <Button onClick={onSubmit} sx={{ ml: -1 }}>등록</Button>
            <FormControlLabel control={<Checkbox color="default" size="small" />}
              label="익명" className={classes.checkAnonymous} sx={{ marginLeft: "90%" }} checked={checked} onChange={handleCheckBox} />
          </div>
        </div>
      )}
    </Stack>
  );
};

export default ReplyComment;