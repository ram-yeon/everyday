import React, { useState, useCallback } from 'react';
import './Landing.css';
import { Layout } from 'antd';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, TextField } from '@mui/material/';
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const { Sider, Content } = Layout;
  const navigate = useNavigate();

  //배너세팅
  const bannerSetting = {
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 1000,
  };

  //로그인관련함수
  const loginClick = () => {
    navigate('/login', { state: 'USER' });
  }
  const adminLoginClick = () => {
    navigate('/adminlogin', { state: 'MANAGER' });
  }

  //학교검색
  const schoolList = [
    { text: '경희대', }, { text: '중앙대', }, { text: '연세대 신촌캠', }, { text: '경북대', }, { text: '성균관대', }, { text: '부산대', },
    { text: '고려대 서울캠', }, { text: '단국대', }, { text: '영남대', }, { text: '서울대', }, { text: '계명대', }, { text: '전남대', },
    { text: '강원대', }, { text: '한양대 서울캠', }, { text: '전북대', }, { text: '동아대', }, { text: '한국외대', }, { text: '가천대', },
    { text: '인하대', }, { text: '건국대 서울캠', },
  ];
  const [searchSchoolList, setSearchSchoolList] = useState(schoolList); // 검색된 학교
  const onChangeSchool = useCallback(e => {
    // 현재 입력된 값을 schoolList에서 찾아서 setSearchSchoolList 하기
    const text = e.target.value;
    const result = [];
    schoolList.map((school) => {
      if (school.text.indexOf(text) >= 0) {
        result.push({ text: school.text });
      }
    });
    if (text === '') {
      setSearchSchoolList(schoolList);
    } else {
      setSearchSchoolList(result);
    }
  });

  return (
    <Layout>
      <Content style={{ position: 'absolute', top: 0, left: 0, zIndex: '1', width: '150vh' }}>
        <Slider {...bannerSetting} >
          <div>
            <img style={{ width: '100%', height: '95vh' }} src={"/images/bannerPage1.jpg"} alt="배너 이미지1" />
          </div>
          <div>
            <img style={{ width: '100%', height: '95vh' }} src="/images/bannerPage2.jpg" alt="배너 이미지2" />
          </div>
          <div>
            <img style={{ width: '100%', height: '95vh' }} src="/images/bannerPage3.jpg" alt="배너 이미지3" />
          </div>
          <div>
            <img style={{ width: '100%', height: '95vh' }} src="/images/bannerPage4.jpg" alt="배너 이미지4" />
          </div>
        </Slider>

      </Content>
      <Sider style={{ position: 'absolute', zIndex: '2', top: 0, right: '4.4rem' }}>
        <div>
          <div className="landing-loginContent">
            <div className="landing-header img-class">
              <img src="/images/logo.png" id="img-id" alt="로고이미지" />
            </div>
            <button onClick={loginClick} type="submit" id="landing-loginBtn">로그인</button>
            <Link to='./register'><button type="submit" id="landing-signUpBtn">에브리데이 회원가입</button></Link>
            <div>
              <span onClick={adminLoginClick} className="admin-login">관리자로 로그인하기 {'>'}</span>
            </div>
          </div>

          <div className="schoolSearch-contain">
            <div className="schoolSearch-content">
              <Box
                component="form"
                noValidate
                autoComplete="off"
              >
                <TextField label="나의 학교를 검색해보세요." variant="standard" sx={{ marginLeft: '0.5rem', width: '80%' }}
                  onChange={onChangeSchool}
                />
                <IconButton type="submit" aria-label="search" disabled>
                  <SearchIcon sx={{ height: '3rem' }} />
                </IconButton>

                <List style={{ maxHeight: '22rem', overflowY: "auto" }}>
                  {searchSchoolList.map(item => (
                    <ListItem
                      button
                      key={item.text}
                      onClick={() => navigate('/login')}
                    >
                      <ListItemText primary={item.text}
                        primaryTypographyProps={{
                          color: 'black',
                          height: '1rem',
                          fontSize: '0.8rem',
                        }} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </div>
          </div>
        </div>
      </Sider>
    </Layout>
  );
}
export default Landing