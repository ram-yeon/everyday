import React from 'react'
import BoardList from '../../component/Table/BoardList';

function InformationBoard() {

  return (
    <div>
      <BoardList title={"정보 게시판"} boardType={"INFO"} />
    </div>
  )
}

export default InformationBoard