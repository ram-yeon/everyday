//글작성 박스

import React, { useState } from 'react'
// import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core";
import { Box, TextField } from '@mui/material/';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { FormControlLabel, Checkbox } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    writeBox: {
        height: "46vh",
        border: "2px lightgray solid",
        color: "gray",
        backgroundColor: "#00000",
        fontSize: "0.9rem",
        textAlign: "left",
        margin: "0.3rem auto",
    },
    writeContents: {
        height: "30vh",
        width: "98%",
        marginTop: "1rem",
        borderColor: "gray",
        borderRadius: "0.3rem",
    },
    attachment: {
        cursor: "pointer",
    },
    checkAnonymous: {
        // float: "right",
        // marginLeft:"5rem", 
    },
    registerBtn: {
        width: "1.5rem",
        height: "1.5rem",
        padding: "0.5rem",
        backgroundColor: "#C00000",
        color: "white",
        float: "right",
        cursor: "pointer",
    },
}));

function WriteBox(props) {
    const classes = useStyles();
    // const [inputValue, setInputValue] = useState('');
    const [textValue, setTextValue] = useState("");
    const handleSetValue = (e) => {
        setTextValue(e.target.value);
    };

    //입력 글자 수 제한
    const checkLength = (event) => {
        let text = event.value;
        let textLength = text.length;
        //최대 글자수
        let maxLength = 5;
        if (textLength > maxLength) {
            alert(maxLength + "자 이상 작성할 수 없습니다.");
            text = text.substr(0, maxLength);
            event.value = text;
            event.focus();
        }
    };


    return (
        <div>
            <Box p={1.8} className={classes.writeBox}>
                <div>
                    <TextField id="standard-basic" label="글 제목" variant="standard" sx={{ width: "100%" }} />
                </div>
                <div>
                    <textarea
                        onKeyUp={checkLength}
                        style={{ padding:"1rem", width: "96%", height: "26vh", fontSize: "0.9rem", fontFamily: "-moz-initial", marginTop: "1rem", resize: "none", whiteSpace: "pre-line" }}
                        placeholder="에브리타임은 누구나 기분 좋게 참여할 수 있는 커뮤니티를 만들기 위해 커뮤니티 이용규칙을 제정하여 운영하고 있습니다.
                        위반 시 게시물이 삭제되고 서비스 이용이 일정 기간 제한될 수 있습니다.&#13;
                        아래는 이 게시판에 해당하는 핵심 내용에 대한 요약 사항이며, 게시물 작성 전 커뮤니티이용규칙 전문을 반드시 확인하시기 바랍니다.
                        *정치, 사회 관련 행위 금지
                        - 성별, 종교, 인종, 출신, 지역, 직업, 이념 등 사회적 이슈에 대한 언급 혹은 이와 관련한 행위
                        - 위와 같은 내용으로 유추될 수 있는 비유, 은어 사용 행위
                        - 해당 게시물은 시사, 이슈 게시판에만 작성 가능합니다.&#13;
                        *홍보 및 판매 관련 행위 금지
                        - 영리 여부와 관계 없이 사업체, 기관, 단체, 개인에게 직간접적으로 영향을 줄 수 있는 게시물 작성 행위
                        - 위와 관련된 것으로 의심되거나 예상될 수 있는 바이럴 홍보 및 명칭, 단어 언급 행위&#13;
                        *그 밖의 규칙 위반
                        - 타인의 권리를 침해하거나 불쾌감을 주는 행위
                        - 범죄, 불법 행위 등 법령을 위반하는 행위
                        - 욕설, 비하, 차별, 혐오, 자살, 폭력 관련 내용을 포함한 게시물 작성 행위
                        - 음란물, 성적 수치심을 유발하는 행위
                        - 스포일러, 공포, 속임, 놀라게 하는 행위"
                        value={textValue}
                        onChange={(e) => handleSetValue(e)}
                    />
                </div>

                <hr style={{ marginTop: "0.9rem" }} />
                
                <div>
                    <InsertPhotoOutlinedIcon className={classes.attachment} sx={{ fontSize: "2.5rem" }} />
                    <FormControlLabel control={<Checkbox color="default" size="small" />}
                        label="익명" className={classes.checkAnonymous} sx={{ marginLeft: "82%", marginBottom: "1.8rem" }} />
                    <BorderColorIcon className={classes.registerBtn} />
                </div>
            </Box>
        </div>
    )
}

export default WriteBox
