import React from 'react'
import BoardList from '../../component/Table/BoardList';

function HotBoardList() {
    // const post = [
    //     {
    //         user: "익명",
    //         postTitle: "홍대",
    //         postContent: "지금 홍대인 사람~~~",
    //         date: "20/02/12/ 21:42",
    //         likeIcon: <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem' }} />,
    //         likeCount: "0",
    //         commentIcon: <TextsmsOutlinedIcon sx={{ fontSize: '1rem' }} />,
    //         commentCount: "0",
    //         path: '/'
    //     },
    //     {
    //         user: "익명",
    //         postTitle: "내일 1교시에 공학관 수업인 사람",
    //         postContent: "부탁좀 들어죠,,,,,,,,,,,",
    //         date: "20/02/12/ 21:42",
    //         likeIcon: <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem' }} />,
    //         likeCount: "0",
    //         commentIcon: <TextsmsOutlinedIcon sx={{ fontSize: '1rem' }} />,
    //         commentCount: "0",
    //         path: '/'
    //     },
    //     {
    //         user: "익명",
    //         postTitle: "학점이 낮으면 생기는 문제가 뭔가요....?..",
    //         postContent: "학점낮아도 졸업할수있는거죠 나중에 취업할떄 불리하게 작용하는 건가요? 그러면 어쩌구 저쩌구 블라부ㅡㄹ라",
    //         date: "20/02/12/ 21:42",
    //         likeIcon: <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem' }} />,
    //         likeCount: "0",
    //         commentIcon: <TextsmsOutlinedIcon sx={{ fontSize: '1rem' }} />,
    //         commentCount: "0",
    //         path: '/'
    //     },
    //     {
    //         user: "익명",
    //         postTitle: "퍼스널 컬러 잘 아는 사람~~~!~!~!???",
    //         postContent: "진단 받으러 갔는데 어쩌고 저쩌고 어쩌구 저쩌구",
    //         date: "20/02/12/ 21:42",
    //         likeIcon: <FavoriteBorderOutlinedIcon sx={{ fontSize: '1rem' }} />,
    //         likeCount: "0",
    //         commentIcon: <TextsmsOutlinedIcon sx={{ fontSize: '1rem' }} />,
    //         commentCount: "0",
    //         path: '/'

    //     },
    // ];

    return (
        <div>
            <BoardList title={"HOT 게시물"} boardType={"HOT"} />
        </div>
    )
}

export default HotBoardList