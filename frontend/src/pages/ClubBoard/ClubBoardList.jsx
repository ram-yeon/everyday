import React from 'react'
import BoardList from '../../component/Table/BoardList';

function ClubBoardList() {

    return (
        <div>
            <BoardList title={"동아리 게시판"} boardType={"CLUB"} />
        </div>
    )
}

export default ClubBoardList;