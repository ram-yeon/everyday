import React, { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import { FormControlLabel, Checkbox } from '@mui/material';


function Login() {

    const [idval, setidval] = useState("");
    const [pwval, setpwval] = useState("");

    const handlesubmit = (event) => {
        event.preventDefualt();
    }


    return (
        <div className="main-login">
            <div className="login-contain">
                <div className="login-content">
                    <div >
                        <div className="login-header img-class">
                            <img src={logo} id="img-id" alt="로고이미지" srcset="" />
                        </div>
                        <div className="login-header">
                            <p style={{ color: 'dimgray', fontWeight: 'bold', fontStyle: 'italic' }}>지금 에브리데이를 시작해보세요!</p>
                        </div>
                    </div>
                    <form onSubmit={handlesubmit}>
                        <input type="id" className="login-input" placeholder="아이디"
                            value={idval} onChange={(e) => { setidval(e.target.value) }} />
                        <input type="password" className="login-input" placeholder="비밀번호"
                            value={pwval} onChange={(e) => setpwval(e.target.value)} />
                        <button type="submit" id="login-btn">로그인</button>
                    </form>

                    <div>
                        <div className="login-footer">
                            <FormControlLabel control={<Checkbox value="remember" color="default" size="small" />}
                                label="로그인 유지" />
                        </div>
                        <div className="login-footer">
                            <Link id="forgot-link" to='/forgot'>아이디/비밀번호 찾기</Link>
                        </div>
                    </div>

                    <div>
                        <p style={{ color: 'gray', textAlign:'center', fontSize:'0.8rem' }}>에브리데이에 처음이신가요? <Link id="register-link" to='/register'>회원가입</Link></p>
                    </div>
                </div>


            </div>
        </div>

    )
}

export default Login


    // MUI code
    // import TextField from '@mui/material/TextField';
    // import { Button, Checkbox, Grid } from '@mui/material';
    // import FormControlLabel from '@mui/material/FormControlLabel';
    // import Link from '@mui/material/Link';
    // import Typography from '@mui/material/Typography';
    //      < Typography component = "h1" variant = "h5" >
    //          Sign in
    //       </Typography >
    //         <TextField label="Email Address" required fullWidth name="email" autoComplete="email" autoFocus />
    //         <TextField label="Password" type="password" required fullWidth name="password" autoComplete="current-password" />
    //         <FormControlLabel control={<Checkbox value="remember" color="primary" />}
    //             label="Remember me" />
    //         <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }} >Sign in</Button>
    //         <Grid container>
    //             <Grid item xs>
    //                 <Link>Forgot password?</Link>
    //             </Grid>

    //             <Grid item>
    //                 <Link>Sign Up</Link>
    //             </Grid>
    //         </Grid>

    // antdesign code
    // import 'antd/dist/antd.css';
    // import { Form, Input, Button, Checkbox } from 'antd';
    // < div className = "form" >
    //     <Form
    //         name="basic"
    //         labelCol={{
    //             span: 8,
    //         }}
    //         wrapperCol={{
    //             span: 16,
    //         }}
    //         initialValues={{
    //             remember: false,
    //         }}
    //         autoComplete="off"
    //     >
    //         <Form.Item
    //             label="아이디"
    //             name="id"
    //             rules={[
    //                 {
    //                     required: true,
    //                     message: '아이디를 입력해주세요!',
    //                 },
    //             ]}
    //         >
    //             <Input placeholder="입력해주세요" />
    //         </Form.Item>

    //         <Form.Item
    //             label="비밀번호"
    //             name="password"
    //             rules={[
    //                 {
    //                     required: true,
    //                     message: '비밀번호를 입력해주세요!',
    //                 },
    //             ]}
    //         >
    //             <Input.Password placeholder="입력해주세요" />
    //         </Form.Item>

    //         <Form.Item
    //             wrapperCol={{
    //                 offset: 8,
    //                 span: 16,
    //             }}
    //         >
    //             <Button type="primary" htmlType="submit">
    //                 로그인
    //             </Button>
    //         </Form.Item>

    //     </Form>
    //                 </div >


