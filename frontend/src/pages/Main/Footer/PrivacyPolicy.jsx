import React from 'react'
import { Avatar } from 'antd';
import privacyPolicy from './img/privacyPolicy.jpg';

function PrivacyPolicy() {
    return (
        <div>
            <Avatar alt="개인정보처리방침 이미지" src={privacyPolicy} />
        </div>
    )
}

export default PrivacyPolicy