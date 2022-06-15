import React, { useState } from 'react'
import './Register.css'
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { Box, TextField, OutlinedInput, MenuItem, FormControl, Select } from '@mui/material/';
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

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

const yearValues = [
  '2022학번',
  '2021학번',
  '2020학번',
  '2019학번',
  '2018학번',
  '2017학번',
  '2016학번',
  '2015학번',
  '2014학번',
  '2013학번',
  '2012학번',
  '2011학번',
  '2010학번',
  '2009학번',
  '2008학번'
];

function getStyles(yearValue, admissionYearVal, theme) {
  return {
    fontWeight:
      admissionYearVal.indexOf(yearValue) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Register() {

  const handlesubmit = (event) => {
    event.preventDefualt();
  }

  const theme = useTheme();
  const [admissionYearVal, setAdmissionYearVal] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAdmissionYearVal(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <>
    {/* // <div className="main-register">
    //   <div className="register-contain">*/}
        <div className="register-content"> 
          <div style={{ marginLeft: '2rem', marginBottom: '6rem' }}>
            <h2><strong>에브리데이 회원가입</strong></h2>
            <p>에브리데이 계정으로 <strong>캠퍼스픽, 에브리데이</strong> 등 <br />다양한 대학생 서비스를 모두 이용하실 수 있습니다.</p>
          </div>
          <h2 style={{ fontWeight: 'bold', marginLeft: '2rem', textAlign: 'left' }}>학교 선택</h2>
          <form onSubmit={handlesubmit}>

          <Box
              component="form"
              noValidate
              autoComplete="off"
            >
              <TextField label="학교를 검색해보세요." variant="standard" sx={{ width: 330, ml:'2.5rem'}} />
              <IconButton type="submit" aria-label="search">
                <SearchIcon  sx={{height:'2.5rem'}} />
              </IconButton>
            </Box>

            <FormControl sx={{ width: 360, backgroundColor: 'white', ml: '2.5rem', mt:'0.5rem', mb:'2.2rem' }}>
              <Select
                displayEmpty
                value={admissionYearVal}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>입학년도 선택(학번)</em>;
                  }
                  return selected.join(', ');
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem disabled value="">
                  <em>입학년도 선택(학번)</em>
                </MenuItem>
                {yearValues.map((yearValue) => (
                  <MenuItem
                    key={yearValue}
                    value={yearValue}
                    style={getStyles(yearValue, admissionYearVal, theme)}
                  >
                    {yearValue}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Link to='./agreement'><button type="submit" className="signUpBtnAction">다음</button></Link>
          </form>
          </div>
    {/* //     </div>
    //   </div>
    // </div> */}
    </>

  )
}

export default Register