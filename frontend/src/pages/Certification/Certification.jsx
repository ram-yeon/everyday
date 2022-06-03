import React, { useState } from 'react'
import './Certification.css'
import { useTheme } from '@mui/material/styles';
import { TextField, MenuItem, FormControl, Select } from '@mui/material/';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const mailValues = [
    'naver.com',
    'yahoo.co.kr',
    'hanmail.net',
    'empal.com',
    'paran.com',
    'hotmail.com',
    'nate.com',
    'korea.com',
    'unitel.co.kr',
    'chollian.net',
    'hanmir.net',
    'hitel.com',
    'dreamwiz.com',
    'sayclub.net',
    'netian.com'
];

function getStyles(mailValue, mailYearVal, theme) {
    return {
        fontWeight:
            mailYearVal.indexOf(mailValue) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


function Certification() {

    const [emailVal, setEmailVal] = useState("");
    const [codeVal, setCodeVal] = useState("");

    const handlesubmit = (event) => {
        event.preventDefualt();
    };

    const theme = useTheme();
    const [mailYearVal, setMailYearVal] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setMailYearVal(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    return (
        <div className="main-certification">
            <div className="certification-contain">
                <div className="certification-content">

                    <form onSubmit={handlesubmit}>
                        <h2 style={{ fontWeight: 'bold', marginBottom: "3rem" }}>이메일 인증</h2>
                        <div className="certification-inputGroup">
                            {/* <input className="certification-input" type="text" name="email" id="email1" placeholder="이메일 아이디"
                                value={emailVal} onChange={(e) => { setEmailVal(e.target.value) }} /> */}
                            <TextField label="이메일 아이디" variant="standard" id="email1" type="text" name="email"
                                className="email-txf" value={emailVal} onChange={(e) => { setEmailVal(e.target.value) }}
                                style={{ marginTop: "-1rem" }} />
                            <stong style={{ margin: "auto 1rem" }}>@</stong>
                            <FormControl variant="standard" sx={{ width: 140 }} >
                                <Select
                                    displayEmpty
                                    value={mailYearVal}
                                    onChange={handleChange}
                                    // input={<OutlinedInput />}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return <em>메일 선택</em>;
                                        }
                                        return selected.join(', ');
                                    }}
                                    MenuProps={MenuProps}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem disabled value="">
                                        <em>메일 선택</em>
                                    </MenuItem>
                                    {mailValues.map((mailValue) => (
                                        <MenuItem

                                            key={mailValue}
                                            value={mailValue}
                                            style={getStyles(mailValue, mailYearVal, theme)}
                                        >
                                            {mailValue}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <button type="submit" id="send-btn" >인증번호 전송</button>
                            <div>
                                <TextField label="인증번호 입력" variant="standard" id="code1" type="text" name="code"
                                    className="code-txf" value={codeVal} onChange={(e) => { setCodeVal(e.target.value) }}
                                    style={{ float: "left", marginLeft: "3.7rem", marginTop: "1rem" }} />
                            </div>

                        </div>
                        <div>
                            <button type="submit" id="confirm-btn" >확인</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Certification
