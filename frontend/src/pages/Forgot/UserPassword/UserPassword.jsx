import React, { useState } from 'react'
import Password from './Password/Password.jsx';
import ChangePW from './Password/ChangePW.jsx';
import Certification from '../../Certification/Certification';

function UserPassword() {
    const [currentLevel, setCurrentLevel] = useState(1);

    const [type, setType] = useState('');    //이전페이지가 어떤기능의 페이지인지 따라 api요청해줄 타입
    const [id, setId] = useState('');        //아이디
    const [email, setEmail] = useState('');  //이메일    

    //타입, 아이디 받아오기
    const getData1 = (typeData, idData, isNextData) => {
        setType(typeData);
        setId(idData);
        if (isNextData) {
            setCurrentLevel(2);
        }
    };
    //이메일 받아오기
    const getData2 = (emailData, isNextData) => {
        setEmail(emailData);
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
                currentLevel === 2 && <Certification propFunction={getData2} type={type} id={id} />
            }
            {
                currentLevel === 3 && <ChangePW email={email} />
            }

        </>
    )
}

export default UserPassword