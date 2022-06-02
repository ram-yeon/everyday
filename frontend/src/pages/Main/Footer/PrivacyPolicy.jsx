import React from 'react'
import { Avatar } from 'antd';
import privacyPolicy from './img/privacyPolicy.jpg';

function PrivacyPolicy() {
    return (
        <div style={{marginLeft:"12%", border:"dotted 1px gray", borderRadius:"1rem",  padding:"5rem"}}>
            <Avatar alt="개인정보처리방침 이미지" src={privacyPolicy} />
        </div>
    )
}

export default PrivacyPolicy