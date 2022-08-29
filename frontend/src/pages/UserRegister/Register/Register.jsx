//학교선택 및 학번선택
import React, { useState } from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { TextField, OutlinedInput, MenuItem, FormControl, Select } from '@mui/material/';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
const schoolList = [
  { name: '경희대', }, { name: '중앙대', }, { name: '연세대 신촌캠', }, { name: '경북대', }, { name: '성균관대', }, { name: '부산대', },
  { name: '고려대 서울캠', }, { name: '단국대', }, { name: '영남대', }, { name: '서울대', }, { name: '계명대', }, { name: '전남대', },
  { name: '강원대', }, { name: '한양대 서울캠', }, { name: '전북대', }, { name: '동아대', }, { name: '한국외대', }, { name: '가천대', },
  { name: '인하대', }, { name: '건국대 서울캠', },
];
const yearValues = [
  '2022학번', '2021학번', '2020학번', '2019학번', '2018학번', '2017학번', '2016학번', '2015학번', '2014학번', '2013학번', '2012학번',
  '2011학번', '2010학번', '2009학번', '2008학번', '2007학번', '2006학번'
];

function getStyles(yearValue, admissionYearVal, theme) {
  return {
    fontWeight:
      admissionYearVal.indexOf(yearValue) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Register(props) {
  const navigate = useNavigate();
  const [selectedSchool, setSelectedSchool] = useState('');
  const theme = useTheme();
  const [admissionYearVal, setAdmissionYearVal] = useState('');

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAdmissionYearVal(value);
  };


  const isNext = false;   //다음페이지로 넘어갈지 여부체크
  const handlebtn = () => {
    if (!selectedSchool || !selectedSchool.hasOwnProperty('name') || !selectedSchool.name || !admissionYearVal) {
      alert('값을 모두 선택해주세요.');
    }
    else {
      props.propFunction(selectedSchool.name, admissionYearVal, !isNext);
    }
  }

  return (
    <>
      <div className="register-content">
        <div style={{ margin: '1rem auto 3rem 2rem' }}>
          <h2><strong>에브리데이 회원가입</strong></h2>
          <p>에브리데이 계정으로 <strong>캠퍼스픽, 에브리데이</strong> 등 <br />다양한 대학생 서비스를 모두 이용하실 수 있습니다.</p>
        </div>
        <h2 style={{ fontWeight: 'bold', marginLeft: '2rem', textAlign: 'left' }}>학교 선택</h2>

        <Autocomplete
          id="school-list"
          options={schoolList}
          renderInput={params => (
            <TextField {...params} label="학교를 검색해보세요." variant="outlined" />
          )}
          getOptionLabel={(option) => option.name || ""}
          getOptionSelected={(option, value) => option.value === value.value}
          style={{ width: '82%', marginLeft: '2.5rem', marginTop: '1rem' }}
          value={selectedSchool}
          onChange={(_event, newSchool) => {
            setSelectedSchool(newSchool);
          }}
        />

        <FormControl sx={{ width: '82%', ml: '2.5rem', mt: '0.5rem', mb: '0.5rem' }}>
          <Select
            displayEmpty
            value={admissionYearVal}
            onChange={handleChange}
            input={<OutlinedInput />}
            MenuProps={MenuProps}
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

        <div style={{textAlign:'center'}}>
          <button onClick={() => navigate(-1)} className="cancelBtn">이전</button>
          <button onClick={handlebtn} className="signUpBtnAction">다음</button>
        </div>
      </div>
    </>
  )
}

export default Register