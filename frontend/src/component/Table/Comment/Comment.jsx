import React, { useState } from "react";
import ReplyList from "./ReplyList";

import Markdown from "../../Markdown";
import "@toast-ui/editor/dist/toastui-editor.css";
import * as BoardAPI from '../../../api/Board';
import { Message } from '../../Message';
import { SESSION_TOKEN_KEY } from '../../Axios/Axios';
import {
  displayDateFormat,
  Item,
} from "../../CommentTool";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';                //색채워진좋아요
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';    //좋아요
import { Stack, Button, Divider, Box } from "@mui/material";

const Comment = (props) => {
  const {
    comment,
    postId,
    handleIsInitialize,
  } = props;
  const index = comment.commentId;
  const token = localStorage.getItem(SESSION_TOKEN_KEY);
  const tokenJson = JSON.parse(atob(token.split(".")[1]));
  
  const [isLikeComment, setIsLikeComment] = useState(comment.isLikeComment);
  const [likeCount, setLikeCount] = useState(comment.likeCount);

  //댓글 삭제(db)
  const deleteComment = (commentId) => {
    BoardAPI.deleteComment(commentId).then(response => {
      Message.success(response.message);
      handleIsInitialize(false);
    }).catch(error => {
      console.log(JSON.stringify(error));
      Message.error(error.message);
    })
  };
  //좋아요 api
  const clickLike = () => {
    setIsLikeComment(!isLikeComment);
    const data = {
      targetType: "COMMENT",
      targetId: comment.commentId
    };
    if (!isLikeComment) {
      setLikeCount(Number(likeCount) + 1);
      BoardAPI.like(data).then(response => {
        Message.success(response.message);
      }).catch(error => {
        console.log(JSON.stringify(error));
        Message.error(error.message);
      })
    } else {
      setLikeCount(Number(likeCount) - 1);
      BoardAPI.likeCancel(data).then(response => {
        Message.success(response.message);
      }).catch(error => {
        console.log(JSON.stringify(error));
        Message.error(error.message);
      })
    }
  }

  return (
    <>
      <Box sx={{ mt: 2, mb: 2 }} key={index}>
        {/* writer 정보, 작성 시간 */}
        <Stack direction="row" spacing={2}>
          <AccountCircleIcon sx={{ color: 'gray', mt: 0.5, mr: -1 }} ></AccountCircleIcon>
          <Item style={{ color: 'black' }}>{comment.commentWriter}</Item>
          <Item sx={{ fontSize: '0.5rem' }}>{displayDateFormat(comment.commentRegistrationDate)}</Item>

          {
            (!isLikeComment) ?
              <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem', color: '#C00000', cursor: 'pointer' }} onClick={() => clickLike()} />
              :
              <FavoriteOutlinedIcon sx={{ fontSize: '1rem', color: '#C00000', cursor: 'pointer' }} onClick={() => clickLike()} />
          }
          <span style={{ marginLeft: "0.2rem", marginTop: "0.2rem", fontSize: "0.7rem", color: '#C00000', cursor: 'pointer' }}
            onClick={() => clickLike()}>
            {likeCount}
          </span>
        </Stack>

        {/* comment 글 내용 */}
        <Box
          key={index}
          sx={{ padding: "0px 20px", color: comment.exist || "grey", ml: 1.6, }}
        >
          <Markdown comment={comment} />
        </Box>

        {/* comment 삭제 */}
        {tokenJson.sub === comment.writerLoginId && (
          <>
            <Button sx={{ ml: 1.8, fontSize:'0.8rem', color:'gray' }}
              onClick={() => {
                deleteComment(comment.commentId);
              }}
            >
              삭제
            </Button>
          </>
        )}

        {/* 대댓글 컴포넌트 */}
        <ReplyList commentId={comment.commentId} postId={postId} />

        <Divider variant="middle" />
      </Box>

    </>
  );
};

export default Comment;