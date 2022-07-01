import React from 'react'
import BoardList from '../../component/Table/BoardList';

function FreeBoardList() {

  return (
    <div>
      <BoardList title={"자유 게시판"} boardType={"FREE"} />
    </div>
  )
}

export default FreeBoardList