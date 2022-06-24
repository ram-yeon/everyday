import React from 'react';
import BeforeLoginRouter from './BeforeLoginRouter';

function BeforeLoginContainer(props) {
    return (
        <div>
            <BeforeLoginRouter loginCallBack={props.loginCallBack} />
        </div>
    )
}

export default BeforeLoginContainer
