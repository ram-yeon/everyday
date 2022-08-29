import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainBoard from '../pages/MainBoard';                             //메인화면

import HotBoardList from '../pages/HotBoard/HotBoardList';              //HOT 게시물 
import FreeBoardList from '../pages/FreeBoard/FreeBoardList';           //자유게시판
import InformationBoardList from '../pages/InfoBoard/InfoBoardList';    //정보게시판
import ClubBoardList from '../pages/ClubBoard/ClubBoardList';           //동아리화면
import NoticeBoard from '../pages/Notice/NoticeBoard';                  //공지사항

import BoardDetail from '../component/Table/BoardDetail';
import NoticeBoardDetail from '../component/Table/NoticeBoardDetail';

import BoardListAboutMe from '../component/Table/BoardListAboutMe';

import SearchBoardList from '../component/Table/SearchBoardList';

import UseTerms from '../pages/UseTerms';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import CommunityRule from '../pages/CommunityRule';

import Error from "../component/Error";

function AfterLoginRouter() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainBoard />} />

                <Route path="/noticeboard" element={<NoticeBoard />} />
                <Route path="/hotboard" element={<HotBoardList />} />
                <Route path="/infoboard" element={<InformationBoardList />} />
                <Route path="/freeboard" element={<FreeBoardList />} />
                <Route path="/clubboard" element={<ClubBoardList />} />

                <Route path="/hotboard/detail/*" element={<BoardDetail />} />
                <Route path="/infoboard/detail/*" element={<BoardDetail />} />
                <Route path="/freeboard/detail/*" element={<BoardDetail />} />
                <Route path="/clubboard/detail/*" element={<BoardDetail />} />
                <Route path="/noticeboard/detail/*" element={<NoticeBoardDetail />} />
                
                <Route path="/myarticle" element={<BoardListAboutMe />} />
                <Route path="/mycommentarticle" element={<BoardListAboutMe />} />
                <Route path="/mylikearticle" element={<BoardListAboutMe />} />
                <Route path="/mySearch" element={<SearchBoardList />} />                   

                <Route path="/useterms" element={<UseTerms />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                <Route path="/communityRule" element={<CommunityRule />} />

                <Route path="*" element={<Error />} />
            </Routes>
        </div>
    )
}

export default AfterLoginRouter