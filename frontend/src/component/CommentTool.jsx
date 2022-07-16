import { styled } from "@mui/material/styles";
import { Avatar } from "@mui/material";
import { Box } from '@mui/material/';
import moment from 'moment';
import 'moment/locale/ko';

// 프로필 아이콘 글자 한글일때 구분
export const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

// time
export function timeForToday(time) {
  const now = new Date();
  const created_at = new Date(time);

  const minute = Math.floor((now.getTime() - created_at.getTime()) / 1000 / 60);
  if (minute < 1) return "방금전";
  if (minute < 60) {
    return `${minute}분전`;
  }

  const hour = Math.floor(minute / 60);
  if (hour < 24) {
    return `${hour}시간전`;
  }

  const day = Math.floor(minute / 60 / 24);
  if (day < 365) {
    return `${day}일전`;
  }

  return `${Math.floor(day / 365)}년전`;
}

export function displayDateFormat(time) {
  // 현재시간과 time 비교해서 일주일 이내이면 return timeForToday(time);
  // 아니면 monent(time).format('YYYY-MM-DD HH:mm:ss'); 
  const current = moment();
  if (current.diff(time, 'days') > 6) {
    return (moment(time).format("YYYY-MM-DD HH:mm:ss"));
  } else {
    return timeForToday(time);
  }
}

// style
export const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  textAlign: "center",
  color: "#737373",
  fontSize: "1rem",
  lineHeight: "1rem",
}));

export const ProfileIcon = styled(Avatar)(() => ({
  backgroundColor: "orangered",
  width: "2rem",
  height: "2rem",
}));