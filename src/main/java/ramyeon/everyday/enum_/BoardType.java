package ramyeon.everyday.enum_;

import ramyeon.everyday.exception.NotFoundEnumException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

    private static final Map<String, BoardType> boardTypeMap = Stream.of(values()).collect(Collectors.toMap(BoardType::name, Function.identity()));

    // String to BoardType
    public static BoardType findBoardType(String boardType) {
        return Optional.ofNullable(boardTypeMap.get(boardType)).orElseThrow(() -> new NotFoundEnumException("잘못된 [게시판 종류] 값"));
    }
}
