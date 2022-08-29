import React from 'react'
import BoardList from '../../component/Table/BoardList';

function HotBoardList() {
    return (
        <div>
            <BoardList title={"HOT 게시물"} boardType={"HOT"} />
        </div>
    )
}

export default HotBoardList