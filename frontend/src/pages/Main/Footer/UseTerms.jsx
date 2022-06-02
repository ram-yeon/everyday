import React from 'react'
import { Avatar } from 'antd';
import useTerms from './img/useTerms.jpg';

function UseTerms() {
    return (
        <div style={{marginLeft:"12%", border:"dotted 1px gray", borderRadius:"1rem",  padding:"5rem"}}>
            <Avatar alt="이용약관 이미지" src={useTerms} />
        </div>
    )
}

export default UseTerms