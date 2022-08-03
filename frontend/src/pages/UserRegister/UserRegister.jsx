import React, { useState } from 'react'
import Register from './Register/Register.jsx';
import Agreement from './Register/Agreement';
import Info from './Register/Info';
import Certification from '../Certification/Certification';

function UserRegister() {
    const [currentLevel, setCurrentLevel] = useState(1);
    const [schoolName, setSchoolName] = useState('');              //학교이름
    const [admissionYear, setAdmissionYear] = useState('');        //입학년도 
    const [email, setEmail] = useState('');                        //이메일
    const [type, setType] = useState('');                          //이전페이지가 어떤기능의 페이지인지 따라 api요청해줄 타입     

    //학교이름,입학년도 받아오기
    const getData1 = (schoolNameData, admissionYearData, isNextData) => {
        setSchoolName(schoolNameData);
        setAdmissionYear(admissionYearData);
        if (isNextData) {
            setCurrentLevel(2);
        }
    };
    //타입 받아오기
    const getData2 = (typeData, isNextData) => {
        setType(typeData);
        if (isNextData) {
            setCurrentLevel(3);
        }
    };
    //이메일 받아오기
    const getData3 = (emailData, isNextData) => {
        setEmail(emailData);
        if (isNextData) {
            setCurrentLevel(4);
        }
    };
    //뒤로가기
    const goBack = (level) => {
        if (level === 2) {
            setCurrentLevel(1);
        } else if (level === 3) {
            setCurrentLevel(2); 
        } else if (level === 4) {
            setCurrentLevel(3);
        }
    }
    return (
        <>
            {
                currentLevel === 1 && <Register propFunction={getData1} />
            }
            {
                currentLevel === 2 && <Agreement propFunction={getData2} goBack={goBack} />
            }
            {
                currentLevel === 3 && <Certification propFunction={getData3} type={type} goBack={goBack} />
            }
            {
                currentLevel === 4 && <Info schoolName={schoolName} admissionYear={admissionYear} email={email} goBack={goBack} />
            }
        </>
    )
}

export default UserRegister