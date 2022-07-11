import React, { useState, useEffect, useRef } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { FormControlLabel, Checkbox } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';                //채워진좋아요
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';    //좋아요
import { useSelector, useDispatch } from "react-redux";
import uuid from "react-uuid";
import { addComment, editComment, removeComment } from "../../redux/comment";
import ReplyComment from "./ReplyComment";
import { Stack, Button, Divider, Paper, Box } from "@mui/material";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import Markdown from "../../component/Markdown";
import * as BoardAPI from '../../api/Board';
import { Message } from '../../component/Message';
import { SESSION_TOKEN_KEY } from '../../component/Axios/Axios';

import {
  check_kor,
  displayDateForComment,
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


const Comment = (props) => {
  let token = localStorage.getItem(SESSION_TOKEN_KEY);
  const tokenJson = JSON.parse(atob(token.split(".")[1]));

  const commentData = props.comment;
  const [checked, setChecked] = useState(false);
  const handleCheckBox = (event) => {
    setChecked(event.target.checked);
  };

  // const commentItems = [];
  // commentData.forEach((v, i) => {
  //   const commentWriter = v.commentWriter;
  //   const commentContents = v.commentContents;
  //   const commentDateFormat = v.commentDateFormat;
  //   const commentId = v.commentId;
  //   const commentType = v.commentType;            //댓글인지 대댓글인지
  //   const likeCount = v.likeCount;
  //   let likeState = ''
  //   // const isLikeComment = v.isLikeComment;    //해당 댓글 좋아요했는지에 대한 상태값  (댓글좋아요고민,,,)
  //   // if (isLikeComment === "Y") {
  //   //   likeState = 'true';
  //   // } else {
  //   //   likeState = 'false';
  //   // }
  //   // //preId가있는경우(->대댓글)
  //   // if (v.hasOwnProperty('preId')) {
  //   //   preId = v.preId;
  //   // }
  //   commentItems.push({
  //     commentWriter: commentWriter, commentContents: commentContents, commentDateFormat: commentDateFormat,
  //     commentId: commentId, commentType: commentType, likeCount: likeCount, likeState: likeState,
  //   });
  // })
 
  const classes = useStyles();
  const [local, setLocal] = useState([]);
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment);
  const [display, setDisplay] = useState(false);
  const editorRef = useRef();
  const date = new Date(); // 작성 시간
  //댓글 편집하기 위한 에디터 open
  const [openEditor, setOpenEditor] = useState("");

  //댓글등록
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
      commentType: "COMMENT",
      isAnonymous: isAnonymous,
      preId: ""
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

  //댓글 삭제(redux)
  const onRemove = (commentId) => {
    dispatch(removeComment(commentId));
  };
  //댓글 삭제(db)
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
    // setLocal(comments.filter((comment) => comment.responseTo === "root"));
  }, [comments]);

  //좋아요 api
  //   const clickLike = () => {
  //     if (tokenJson.account_authority === "USER") {
  //         if (!likeState) {  //좋아요추가    
  //             setLikeState(true);
  //             setLikeCount(likeCount + 1);
  //             const data = {
  //                 targetType: "COMMENT",
  //                 targetId: commentId
  //             }
  //             BoardAPI.like(data).then(response => {
  //                 Message.success(response.message);
  //             }).catch(error => {
  //                 console.log(JSON.stringify(error));
  //                 Message.error(error.message);
  //             })
  //         } else { //좋아요취소
  //             setLikeState(false);
  //             setLikeCount(likeCount - 1);
  //             const data = {
  //                 targetType: "COMMENT",
  //                 targetId: commentId
  //             }
  //             BoardAPI.likeCancel(data).then(response => {
  //                 Message.success(response.message);
  //             }).catch(error => {
  //                 console.log(JSON.stringify(error));
  //                 Message.error(error.message);
  //             })
  //         }
  //     } else {
  //         alert("좋아요 권한이 없습니다.");
  //     }
  // }

  return (
    <Paper sx={{ m: 0, p: 2 }}>
      {commentData.map((comment, index) => (
        <Box sx={{ mt: 2, mb: 2 }} key={comment.commentId}>
          {/* writer 정보, 작성 시간 */}
          <Stack direction="row" spacing={2}>
            <AccountCircleIcon sx={{ color: 'gray', mt: 0.5, mr: -1 }} >
              {check_kor.test(comment.commentWriter)
                ? comment.commentWriter.slice(0, 1)
                : comment.commentWriter.slice(0, 2)}
            </AccountCircleIcon>
            <Item style={{ color: 'black' }}>{comment.commentWriter}</Item>
            {/* <Item>{timeForToday(comment.created_at)}</Item> */}
            <Item sx={{ fontSize: '0.5rem' }}>{displayDateForComment(comment.commentDateFormat)}</Item>

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
            sx={{ padding: "0px 20px", color: comment.exist || "grey", ml: 1.5, }}
          // exist는 초기값으로 true를 가지며, removeComment를 통해 false로 변경됨
          >
            <Markdown comment={comment} />
          </Box>

          {/* comment 수정 */}
          {comment.exist && tokenJson.sub === comment.commentWriter && (  //추후 commentWriter를 writerLoinId로 바꿔야함
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

          {/* 대댓글 컴포넌트 */}
          <ReplyComment responseTo={comment.commentId} postId={props.postId} />

          <Divider variant="middle" />
        </Box>
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

export default Comment;