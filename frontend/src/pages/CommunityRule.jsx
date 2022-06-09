import React from 'react'
import { Avatar } from 'antd';

function CommunityRule() {
    return (
        <div style={{border:"dotted 1px gray", borderRadius:"5rem",  padding:"6rem 9rem"}}>
            <Avatar alt="커뮤니티이용규칙 이미지" src={"/images/communityRule.jpg"} />
        </div>
    )
}

export default CommunityRule