import React from 'react'
// import {message} from 'antd'
// import 'antd/dist/antd.css'


class CommonMessage extends React.Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         styles: {
    //             marginTop: '20vh',
    //             marginBottom: '-20vh',
    //         },
    //     };
    // }

    success = (content) => {
        if (!this.valid(content)) {
            return false;
        }

        alert(content);
        // message.success({
        //     content: content,
        //     style: messageStyle,
        // })
    }

    error = (content) => {
        if (!this.valid(content)) {
            return false;
        }

        alert(content);
        // message.error({
        //     content: content,
        //     style: messageStyle,
        // })
    }

    warn = (content) => {
        if (!this.valid(content)) {
            return false;
        }

        alert(content);
        // message.warn({
        //     content: content,
        //     style: messageStyle,
        // })
    }

    valid = (content) => {
        return null !== content &&
            undefined !== content &&
            0 < content.length;
    }
}

const Message = new CommonMessage();
export default Message;