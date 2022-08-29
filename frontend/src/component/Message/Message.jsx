//Message 컴포넌트 (노출할 메시지에 대한 설정값 공통화)
import React from 'react'

class CommonMessage extends React.Component {
    
    success = (content) => {
        if (!this.valid(content)) {
            return false;
        }
        alert(content);
    }

    error = (content) => {
        if (!this.valid(content)) {
            return false;
        }
        alert(content);
    }

    warn = (content) => {
        if (!this.valid(content)) {
            return false;
        }
        alert(content);
    }

    valid = (content) => {
        return null !== content &&
            undefined !== content &&
            0 < content.length;
    }
}

const Message = new CommonMessage();
export default Message;