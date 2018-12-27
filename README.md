# Chatting App
> 채팅 어플리케이션 구현

## TODO
#### 프론트앤드
[x] 로그인 페이지
[ ] 채팅방 리스트 화면
[] 사용자 초대 기능
[] 현재 채팅방에 포함된 사용자 리스트 확인 기능
[] 채팅창 화면 
    [] 메시지 전달 기능
    [] 이미지 업로드 기능

#### 서버 - 서버 api를 구현하면서 프론트앤드 연동 작업도 같이 할 것
[] 로그인 api
[] 채팅방 리스트 api
[] 채팅방 접속
[] 


#### 기타
[] gitlab 또는 travisCI를 이용해서 CI/CD 구현하기
[] gitlab에서 데모페이지를 구현가능하도록 페이지 생성이 가능하다면 생성하기


## Contents
1. [개발 환경](#dev-spec)
2. [프로젝트 구조](#prj-structure)
3. [Installation](#installation)
4. [Requirement](#requirement)
5. [문제 해결 전략](#solution)
6. [개선할 부분..](#more)

<h2 id="dev-spec">
    1. 개발 환경
</h2>

#### Backend
- Node.js
- websocket

#### Frontend
- Vue.js
- Vuetify.js

#### Testing
- Mocha


<h2 id="prj-structure">
    2. Project Structure
</h2>

```bash
```


<h2 id="installation">
    3. Installation
</h2>

```bash
# build

# run
```



<h2 id="requirement">
    4. Requirement
</h2>

- Client side rendering으로 개발
- 언어에 대한 제한은 없음
- 서버 구현 방법에 대한 제한 없음 (REST API, Long Polling, Socket...)
- 프론트엔드 구현 방법은 제한 없음 (Angular, React, Preact, Vue, jQuery...)
- UI 구현에 대한 제약은 없음
- 단위 테스트 필수, UI 테스트(Storybook, Selenium)와 통합 테스트는 선택


#### User Story
- 사용자는 첫 진입 시, ID를 입력하여 접속할 수 있다.
- 채팅방 리스트에서 채팅방을 선택하여 들어갈 수 있다.
- 채팅방에 다른 사용자를 초대할 수 있다.
- 사용자는 채팅방에서 텍스트를 입력할 수 있다.
- 사용자는 채팅방에서 이미지를 입력할 수 있다.


<h2 id="solution">
    5. 문제해결 전략
</h2>

###### 사용자가 접속을 시도하는 과정
- 사용자가 이미 사용 중인 아이디로 접속을 시도하는 경우
    - 서버에서 '이미 등록된 아이디 입니다'라는 메시지를 에러 코드와 함께 전달한다.
- 접속을 성공하면, 서버에서 이미 등록되어있는 채팅방 리스트를 전달받아와서 화면에 출력한다.

###### 채팅방 리스트
- 

###### 사용자 초대
- 접속되어있는 사용자에 대한 리스트가 출력된다


###### 서버와의 통신하는 부분
> 왜 아래와 같이 구분하여 구현하였는 지에 대한 배경에 대해 간략히 정리해두기...

- REST API로 구현할 부분
    - 사용자 접속
    - 채팅방 리스트

- websocket으로 구현할 부분
    - 채팅방에 접속하는 시점부터??



<h2 id="more">
    6. 개선할 부분..
</h2>

