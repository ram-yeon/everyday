//글작성 박스
import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";
import { Box, TextField } from '@mui/material/';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { FormControlLabel, Checkbox } from '@mui/material';

import * as BoardAPI from '../../api/Board';
import { Message } from '../../component/Message';
import { SESSION_TOKEN_KEY } from '../../component/Axios/Axios';

// import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
import UploadFile from './UploadFile'

const useStyles = makeStyles((theme) => ({
    writeBox: {
        height: "auto",
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
    boxFooter: {
        height: "1.5rem",
    },
    registerBtn: {
        cursor: "pointer",
        padding: "0.2rem",
        backgroundColor: "#C00000",
        color: "white",
        float: "right",
    },
}));

function WriteBox(props) {
    const {
        boardType,
        handleIsInitialize,
    } = props;
    const classes = useStyles();
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [checked, setChecked] = useState(false);

    const token = localStorage.getItem(SESSION_TOKEN_KEY);
    const tokenJson = JSON.parse(atob(token.split(".")[1]));

    const handleSetTitle = (e) => {
        setTitle(e.target.value);
    };
    const handleSetContents = (e) => {
        setContents(e.target.value);
    };
    const handleCheckBox = (event) => {
        setChecked(event.target.checked);
    };

    //입력 글자 수 제한
    // const checkLength = (event) => {
    //     let text = event.value;
    //     let textLength = text.length;
    //     //최대 글자수
    //     let maxLength = 5;
    //     if (textLength > maxLength) {
    //         alert(maxLength + "자 이상 작성할 수 없습니다.");
    //         text = text.substr(0, maxLength);
    //         event.value = text;
    //         event.focus();
    //     }
    // };

    const [imgBase64, setImgBase64] = useState([]); // 파일 base64(미리보기)
    const [imgFile, setImgFile] = useState(0);	//파일	
    const handleChangeFile = (event) => {
        // console.log(event.target.files)
        setImgFile(event.target.files);
        setImgBase64([]);
        for (let i = 0; i < event.target.files.length; i++) {
            if (event.target.files[i]) {
                const reader = new FileReader();
                reader.readAsDataURL(event.target.files[i]); // 1)파일을 읽어 버퍼에 저장
                // 파일 상태 업데이트
                reader.onloadend = () => {
                    // 2)읽기가 완료되면 아래코드 실행
                    const base64 = reader.result;
                    if (base64) {
                        const base64Sub = base64.toString()
                        setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
                        //  setImgBase64(newObj);
                        // 파일 base64 상태 업데이트
                        //  console.log(images)
                    }
                }
            }
        }
    }

    //글등록(파일포함)
    // const handleRegister = (e) => {
    //     const formData = new FormData();
    //     // Object.values(imgFile).forEach((file) => formData.append("file", file));
    //     for (let i = 0; i < imgFile.length; i++) {
    //         formData.append("file", imgFile[i])
    //     }

    //     let isAnonymous = '';
    //     if (checked) {
    //         isAnonymous = 'Y'
    //     } else {
    //         isAnonymous = 'N'
    //     }
    //     const data = {
    //         boardType: boardType,
    //         title: title,
    //         contents: contents,
    //         isAnonymous: isAnonymous,
    //     }

    //     // formData.append("data", new Blob([JSON.stringify(data)] , {type: "application/json"}))
    //     formData.append("data", JSON.stringify(data))

    //     if (boardType === '공지사항') {   //관리자 공지등록
    //         BoardAPI.registerBoardByAdmin(formData).then(response => {
    //             Message.success(response.message);
    //             handleIsInitialize(false);
    //         }).catch(error => {
    //             console.log(JSON.stringify(error));
    //             Message.error(error.message);
    //         })

    //     } else {    //일반사용자 글등록
    //         BoardAPI.registerBoard(formData).then(response => {
    //             Message.success(response.message);
    //             handleIsInitialize(false);
    //         }).catch(error => {
    //             console.log(JSON.stringify(error));
    //             Message.error(error.message);
    //         })
    //     }
    //     // console.log(Object.fromEntries(formData));
    // };

    //글등록(파일제외)
    const handleRegister = (e) => {
        let isAnonymous = '';
        if (checked) {
            isAnonymous = 'Y'
        } else {
            isAnonymous = 'N'
        }
        const data = {
            boardType: boardType,
            title: title,
            contents: contents,
            isAnonymous: isAnonymous,
        }
        if (boardType === '공지사항') {   //관리자 공지등록
            BoardAPI.registerBoardByAdmin(data).then(response => {
                Message.success(response.message);
                handleIsInitialize(false);
            }).catch(error => {
                console.log(JSON.stringify(error));
                Message.error(error.message);
            })
        } else {    //일반사용자 글등록
            BoardAPI.registerBoard(data).then(response => {
                Message.success(response.message);
                handleIsInitialize(false);
            }).catch(error => {
                console.log(JSON.stringify(error));
                Message.error(error.message);
            })
        }
    };

    return (
        <>
            <Box p={1.8} className={classes.writeBox}>
                <div>
                    <TextField id="standard-basic" label="글 제목" variant="standard" sx={{ width: "100%" }}
                        value={title} onChange={(e) => handleSetTitle(e)} />
                </div>
                <div>
                    <textarea
                        // onKeyUp={checkLength}
                        style={{ padding: "1rem", width: "99%", height: "26vh", fontSize: "0.9rem", fontFamily: "-moz-initial", margin: "1rem 0.3rem", resize: "none", whiteSpace: "pre-line" }}
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
                        value={contents}
                        onChange={(e) => handleSetContents(e)}
                    />
                </div>

                {/* 파일첨부 시 미리보기 */}
                <div>
                    {/* <Carousel> */}
                    {imgBase64.map((item) => {
                        return (
                            // <Carousel.Item>
                            <img
                                src={item}
                                alt="첨부된 이미지"
                                style={{ width: "100px", height: "100px", margin: "0.2rem" }}
                            />
                            // </Carousel.Item>
                        )
                    })}
                    {/* </Carousel> */}
                    {/* <UploadFile /> */}
                </div>

                <hr style={{ marginBottom: "0.3rem" }} />

                <div className={classes.boxFooter}>
                    <div>
                        <input
                            type="file"
                            id="file"
                            style={{ display: 'none' }}
                            onChange={handleChangeFile}
                            multiple
                            accept="image/png, image/jpeg, image/jpg"
                        />
                        <label htmlFor="file"><InsertPhotoOutlinedIcon sx={{ cursor: 'pointer', fontSize: '2rem' }} /></label>
                    </div>
                    {
                        (tokenJson.account_authority === 'USER') &&
                        <FormControlLabel
                            control={<Checkbox color="default" size="small" />}
                            label="익명"
                            sx={{ margin: "-3.5rem auto auto 87%" }}
                            checked={checked}
                            onChange={handleCheckBox} />
                    }
                    <BorderColorIcon className={classes.registerBtn} onClick={handleRegister} sx={{ fontSize: '2rem', marginTop: '-2rem' }} />
                </div>
            </Box>
        </>
    )
}

export default WriteBox
