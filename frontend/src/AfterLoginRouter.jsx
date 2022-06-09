import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainBoard from './pages/MainBoard';

import NoticeBoard from './pages/NoticeBoard';
import HotBoard from './pages/HotBoard';
import InformationBoard from './pages/InformationBoard';
import FreeBoard from './pages/FreeBoard';
import ClubBoard from './pages/ClubBoard';

// import Board from './component/Table/Board';
// import BoardDetail from './component/Table/BoardDetail';
// // import NoticeBoard from './component/Table/NoticeBoard';
// import NoticeBoardDetail from './component/Table/NoticeBoardDetail';

import UseTerms from './pages/UseTerms';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CommunityRule from './pages/CommunityRule';

// import Error from "./component/Error";

function AfterLoginRouter() {
    return (
        <div>
            <Routes>
                <Route path="/main" element={<MainBoard />} />
                {/* <Route path="/main/mainboard" element={<MainBoard />} /> */}

                <Route path="/main/noticeboard" element={<NoticeBoard />} />
                <Route path="/main/hotboard" element={<HotBoard />} />
                <Route path="/main/informationboard" element={<InformationBoard />} /> 
                <Route path="/main/freeboard" element={<FreeBoard />} />
                <Route path="/main/clubboard" element={<ClubBoard />} />

                {/* <Route path="/main/board" element={<Board />} />
                <Route path="/main/boarddetail" element={<BoardDetail />} />
                <Route path="/main/noticeboarddetail" element={<NoticeBoardDetail />} /> */}

                <Route path="/main/useterms" element={<UseTerms />} />
                <Route path="/main/privacypolicy" element={<PrivacyPolicy />} />
                <Route path="/main/communityRule" element={<CommunityRule />} />

                {/* <Route path="*" element={<Error/>}/> */}
            </Routes>

        </div>
    )
}

export default AfterLoginRouter