import React from 'react'
import BoardList from '../../component/Table/BoardList';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';

function InformationBoard() {
  const post = [
    {
      user: "익명",
      postTitle: "정보게시판엔 어떤 글이 있는거지",
      postContent: "진단 받으러 갔는데 어쩌고 저쩌고 어쩌구 저쩌구",
      date: "20/02/12/ 21:42",
      likeIcon: <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem' }} />,
      likeCount: "0",
      commentIcon: <TextsmsOutlinedIcon sx={{ fontSize: '1rem' }} />,
      commentCount: "0",
      path: '/'

    },
    {
      user: "익명",
      postTitle: "학점 잘 받으려면 어떻게해요",
      postContent: "학점낮아도 졸업할수있는거죠 나중에 취업할떄 불리하게 작용하는 건가요? 그러면 어쩌구 저쩌구 블라부ㅡㄹ라",
      date: "20/02/12/ 21:42",
      likeIcon: <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem' }} />,
      likeCount: "0",
      commentIcon: <TextsmsOutlinedIcon sx={{ fontSize: '1rem' }} />,
      commentCount: "0",
      path: '/'
    },
   
  ];

  return (
    <div>
      <BoardList post={post} title={"정보 게시판"} />
    </div>
  )
}

export default InformationBoard