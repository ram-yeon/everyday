<p align="right">
<a href="https://github.com/ram-yeon/everyday"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fbo-ram-jeong&count_bg=%23F12793&title_bg=%23171617&icon=github.svg&icon_color=%23E7E7E7&title=GitHub&edge_flat=false)"/></a>
</p>

# 에브리데이 <img src="https://user-images.githubusercontent.com/84834172/182754138-323a3cad-79d1-4b48-abc9-c4d2ddaec498.png" alt="에브리데이 웹사이트 로고" width=26px />
> <a href="https://everytime.kr/">에브리타임</a> 카피사이트 프로젝트

## Table of Contents
1. [About The Project](#about-the-project)
    - [Built With](#built-with)
2. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
3. [Contact](#contact)
4. [Acknowledgments](#acknowledgments)

## About The Project
[(back to top)](#table-of-contents)<br/><br/>
<img src="https://user-images.githubusercontent.com/84834172/182807248-b246b2aa-148f-46e5-b3d3-0888a07d07a2.jpg" alt="에브리데이 웹사이트 화면" />

> 에브리데이는 대학교 커뮤니티인 <a href="https://everytime.kr/">에브리타임</a>의 카피사이트 프로젝트로, 기존 에브리타임 웹사이트가 가지고 있는 기능을 간소화하여 만든 커뮤니티 웹사이트입니다.

[주요 기능]
- 로그인/로그아웃
- 회원가입
- 이메일 인증
- 아이디/비번 찾기
- 학교검색
- 게시판
- 좋아요 기능
	
### Built With
<a href="https://spring.io/projects/spring-boot"><img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=flat-square&logo=Spring Boot&logoColor=white"/></a> <a href="https://ko.reactjs.org/"><img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/></a>
<br/>
<a href="https://www.java.com/ko/"><img src="https://user-images.githubusercontent.com/84834172/182914035-4bd5d509-cf68-40ba-a641-5c1bf76fc5d9.svg"/></a>
<a href=""><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black"/></a> 
<a href="https://developer.mozilla.org/ko/docs/Web/CSS"><img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/></a>
<br/>
<a href="https://www.mysql.com/"><img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/></a>
<img src="https://img.shields.io/badge/JPA-000000?style=flat-square&logo=JPA&logoColor=white"/></a>
<br/>
<a href="https://www.jetbrains.com/ko-kr/idea/"><img src="https://img.shields.io/badge/IntelliJ IDEA-000000?style=flat-square&logo=IntelliJ IDEA&logoColor=white"/></a>
<a href="https://code.visualstudio.com/"><img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logo=Visual Studio Code&logoColor=white"/></a>
<br/>
<a href="https://www.postman.com/"><img src="https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=Postman&logoColor=white"/></a>
<a href="https://www.erdcloud.com/"><img src="https://img.shields.io/badge/ERDCloud-9388fb?style=flat-square&logo=ERDCloud&logoColor=white"/></a>

## Getting Started
[(back to top)](#table-of-contents)<br/>
### Prerequisites
if using npm<br/>
```npm install```<br/><br/>
if yarn version upgrade<br/>
```
1. react root 폴더로 이동 
   $ cd ./frontend
2. yarn berry 버전으로 설정 (이미 yarn 이 설치되어있다는 가정하에)
   $ yarn set version berry
3. node_module 폴더 삭제
4. .yarnrc.yml 파일 확인
   nodeLinker가  node-modules 폴더로 설정되어있으면 해당 라인 제거
5. 의존성 업데이트
   $yarn install
```

MySQL<br/>
1. Create and Use Database<br/>
```CREATE DATABASE {DB NAME};```<br/>
```USE {DATABASE};```<br/><br/>
2. Download and Execute [SQL Script](https://github.com/ram-yeon/everyday/blob/main/document/everyday-DB-query.pdf)<br/>

### Installation
1. Clone the repo<br/>
```git clone https://github.com/ram-yeon/everyday.git```<br/>
2. Install NPM packages<br/>
```npm install or yarn install```<br/>
3. ```npm start or yarn start```<br/><br/>
(Spring Boot with IntelliJ IDEA)
4. Setting Environment variables<br/>
Run > Edit Configurations --> Application > ramyeon.everyday.EverydayApplication<br/>
_Add Environment variables:_
```
   MAIL_USERNAME={your mail}@gmail.com;
   MAIL_PASSWORD={your password};
   MYSQL_USERNAME={your MySQL username};
   MYSQL_PASSWORD={your MySQL password};
   FILE_DIR={file upload path}
```
5. Change DataBase Connection Info<br/>
src/main/resources/application.yml<br/>
   spring: > datasource: > url: ><br/>
```jdbc:mysql://{IP:Port}/{DataBase Name}?useSSL=false&useUnicode=true&serverTimezone={Timezone}&allowPublicKeyRetrieval=true```
   <br/><br/>
6. Run Application<br/>
   Run > Run... or _Alt+Shift+F10_

## Contact
[(back to top)](#table-of-contents)<br/>
<h4>Organizations</h4>
https://github.com/ram-yeon/everyday

<h4>backend developer</h4>
원동연<br/>
https://github.com/Won-dy <br/>
<a href="mailto:junhfireace@gmail.com?">junhfireace@gmail.com</a>

<h4>frontend developer</h4>
정보람<br/>
https://github.com/bo-ram-jeong<br/>
https://bo-ram-jeong.github.io<br/>
<a href="mailto:boram33377@gmail.com?">boram33377@gmail.com</a>

## Acknowledgments
[(back to top)](#table-of-contents)<br/>
- <a href="https://mui.com/">MUI</a>
- <a href="https://ant.design/">Ant Design</a>
- <a href="https://shields.io/">Img Shields</a>
- <a href="https://pages.github.com/">GitHub Pages</a>
- <a href="https://react-icons.github.io/react-icons/search">React Icons</a>

:books: Lastly, I would like to thank the developer of BoBaeJeong who is currently working at a company called KANAK.<br/>
Thank you for continuously providing advice and information and being our mentors during the four-month project to the two students who are preparing as new developers.<br/>

