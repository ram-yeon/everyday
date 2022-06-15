import React from 'react';
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

function Landing() {
  const { Sider, Content } = Layout;

  const bannerSetting = {
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 1000,

  };
  const sdchoolList = [
    {
      text: '경희대',
      path: '/'
    },
    {
      text: '중앙대',
      path: '/'
    },
    {
      text: '연세대 신촌캠',
      path: '/'
    },
    {
      text: '경북대',
      path: '/'
    },
    {
      text: '성균관대',
      path: '/'
    },
    {
      text: '부산대',
      path: '/'
    },
    {
      text: '고려대 서울캠',
      path: '/'
    },
    {
      text: '단국대',
      path: '/'
    },
    {
      text: '영남대',
      path: '/'
    },
    {
      text: '계명대',
      path: '/'
    },
    {
      text: '서울대',
      path: '/'
    },
    {
      text: '전남대',
      path: '/'
    },
    {
      text: '강원대',
      path: '/'
    },
    {
      text: '한양대 서울캠',
      path: '/'
    },
    {
      text: '전북대',
      path: '/'
    },
    {
      text: '동아대',
      path: '/'
    },
    {
      text: '한국외대',
      path: '/'
    },
    {
      text: '가천대',
      path: '/'
    },
    {
      text: '인하대',
      path: '/'
    },
    {
      text: '건국대 서울캠',
      path: '/'
    },

  ]

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

            <Link to='./login'><button type="submit" id="landing-loginBtn">로그인</button></Link>
            <Link to='./register'><button type="submit" id="landing-signUpBtn">에브리데이 회원가입</button></Link>
            <div>
              <Link className="admin-login" to='/adminlogin'>관리자로 로그인하기 {'>'} </Link>
            </div>
          </div>

          <div className="schoolSearch-contain">
            <div className="schoolSearch-content">
              {/* <strong style={{margin:'auto 1.5rem', fontSize:'0.9rem'}}>우리 학교 커뮤니티 둘러보기</strong> */}
              <Box
                component="form"
                noValidate
                autoComplete="off"
              >
                <TextField label="나의 학교를 검색해보세요." variant="standard" sx={{ marginLeft: '0.5rem', width: '80%' }} />
                <IconButton type="submit" aria-label="search" disabled>
                  <SearchIcon sx={{ height: '3rem' }} />
                </IconButton>

                <List style={{ maxHeight: '22rem', overflowY: "auto" }}>
                  {sdchoolList.map(item => (
                    <ListItem
                      button
                      key={item.text}
                    // onClick={() => history.push(item.path)}
                    // className={location.pathname == item.path ? classes.active : null}
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