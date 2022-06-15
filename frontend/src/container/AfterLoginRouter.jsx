import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainBoard from '../pages/MainBoard';

import NoticeBoard from '../pages/Notice/NoticeBoard';
import HotBoardList from '../pages/HotBoard/HotBoardList';
import InformationBoardList from '../pages/InformationBoard/InformationBoardList';
import FreeBoardList from '../pages/FreeBoard/FreeBoardList';
import ClubBoardList from '../pages/ClubBoard/ClubBoardList';

// import BoardList from '../component/Table/BoardList';
import BoardDetail from '../component/Table/BoardDetail';
import NoticeBoardDetail from '../component/Table/NoticeBoardDetail';

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
                <Route path="/informationboard" element={<InformationBoardList />} />
                <Route path="/freeboard" element={<FreeBoardList />} />
                <Route path="/clubboard" element={<ClubBoardList />} />

                <Route path="/boarddetail" element={<BoardDetail />} />
                <Route path="/noticeboarddetail" element={<NoticeBoardDetail />} />

                <Route path="/useterms" element={<UseTerms />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                <Route path="/communityRule" element={<CommunityRule />} />

                <Route path="*" element={<Error />} />
            </Routes>

        </div>
    )
}

export default AfterLoginRouter