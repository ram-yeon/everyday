import React from 'react'
import BoardList from '../../component/Table/BoardList';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';


function ClubBoardList() {


    const post = [
        {
            user: "익명",
            postTitle: "동아리 어디들어가지ㅣㅣ",
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
            postTitle: "동아리 들으면 취업할떄 좋나요.?..",
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
            {/* <ClubBoardTable /> */}

            <BoardList post={post} title={"동아리 게시판"} />
        </div>
    )
}

export default ClubBoardList;