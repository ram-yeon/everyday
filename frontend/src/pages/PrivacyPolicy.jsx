import React from 'react'
import { Avatar } from 'antd';

function PrivacyPolicy() {
    return (
        <div style={{border:"dotted 1px gray", borderRadius:"5rem",  padding:"6rem 9rem"}}>
            <Avatar alt="개인정보처리방침 이미지" src={"/images/privacyPolicy.jpg"} />
        </div>
    )
}

export default PrivacyPolicy