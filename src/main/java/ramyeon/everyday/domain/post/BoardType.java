package ramyeon.everyday.domain.post;

import java.util.ArrayList;
import java.util.List;

public enum BoardType {  // 게시판 종류
    FREE, INFO, CLUB, HOT, NOTICE;  // 자유, 정보, 동아리, 핫, 공지사항 게시판

    // 일반 게시판 조회
    public static List<BoardType> getNormalBoard() {
        List<BoardType> normalBoards = new ArrayList<>();
        normalBoards.add(FREE);
        normalBoards.add(INFO);
        normalBoards.add(CLUB);
        return normalBoards;
    }

}
