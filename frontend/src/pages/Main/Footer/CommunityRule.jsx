import React from 'react'
import { Avatar } from 'antd';
import communityRule from './img/communityRule.jpg';

function CommunityRule() {
    return (
        <div style={{marginLeft:"12%", border:"dotted 1px gray", borderRadius:"1rem",  padding:"5rem"}}>
            <Avatar alt="커뮤니티이용규칙 이미지" src={communityRule} />
        </div>
    )
}

export default CommunityRule