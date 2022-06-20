import React, { useState } from 'react'
import Password from './Password/Password.jsx';
import ChangePW from './Password/ChangePW.jsx';
import Certification from '../../Certification/Certification';

function UserPassword() {
    const [currentLevel, setCurrentLevel] = useState(1);
    let type = "";
    let nextPath = "";
    let email = "";

    //타입,다음경로 받아오기
    const getData1 = (typeData, nextPathData, isNextData) => {
        console.log(typeData, nextPathData, isNextData);
        type = typeData;
        nextPath = nextPathData;
        if (isNextData) {
            setCurrentLevel(2);
        }
    };
    //이메일 받아오기
    const getData2 = (emailData, isNextData) => {
        console.log(emailData, isNextData);
        email = emailData;
        if (isNextData) {
            setCurrentLevel(3);
        }
    };

    return (
        <>
            {
                currentLevel === 1 && <Password propFunction={getData1} />
            }
            {
                currentLevel === 2 && <Certification propFunction={getData2} type={type} nextPath={nextPath} />
            }
            {
                currentLevel === 3 && <ChangePW email={email} />
            }

        </>
    )
}

export default UserPassword