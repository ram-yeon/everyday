import React from 'react';
import './Landing.css';
import { Layout } from 'antd';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, TextField } from '@mui/material/';
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { FixedSizeList } from 'react-window';

import bannerPage1 from '../img/bannerPage1.jpg';
import bannerPage2 from '../img/bannerPage2.jpg';
import bannerPage3 from '../img/bannerPage3.jpg';
import bannerPage4 from '../img/bannerPage4.jpg';
import logo from '../img/logo.png';

import { Link } from 'react-router-dom';

function schoolNameRenderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}


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

  return (
    
      <Layout>
        <Content style={{ position: 'relative', zIndex: '1', width: '146.5vh', marginTop:'1rem'}}>
          <Slider {...bannerSetting} >
            <div>
              <img style={{ width: '100%', height: '95vh' }} src={bannerPage1} alt="배너 이미지1" />
            </div>
            <div>
              <img style={{ width: '100%', height: '95vh' }} src={bannerPage2} alt="배너 이미지2" />
            </div>
            <div>
              <img style={{width: '100%', height: '95vh' }} src={bannerPage3} alt="배너 이미지3" />
            </div>
            <div>
              <img style={{ width: '100%', height: '95vh' }} src={bannerPage4} alt="배너 이미지4" />
            </div>
          </Slider>

        </Content>
        <Sider style={{ position: 'absolute', zIndex: '2', top: '1rem', right: '5rem' }}>
          <div>
            <div className="landing-loginContain">
              <div className="landing-loginContent">
                <div className="landing-header img-class">
                  <img src={logo} id="img-id" alt="로고이미지" />
                </div>
                
                <Link to='./login'><button type="submit" id="landing-loginBtn">로그인</button></Link>
                <Link to='./register'><button type="submit" id="landing-signUpBtn">에브리데이 회원가입</button></Link>
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
                  <TextField label="나의 학교를 검색해보세요." variant="standard" sx={{ marginLeft:'0.5rem', width: '80%' }} />
                  <IconButton type="submit" aria-label="search" disabled>
                    <SearchIcon sx={{ height: '3rem' }} />
                  </IconButton>

                  <Box>
                    <FixedSizeList
                      height={350}
                      width={240}
                      itemSize={40}
                      itemCount={20}
                      overscanCount={5}
                    >
                      {schoolNameRenderRow}
                    </FixedSizeList>
                  </Box>

                </Box>
              </div>

            </div>
          </div>
        </Sider>

      </Layout>

    
  );
}

export default Landing