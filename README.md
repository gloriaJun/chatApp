# Chatting App
> 채팅 어플리케이션 구현

## Contents

- [개발 환경](#configuration)
- [프로젝트 구조](#structure)
- [Installation](#installation)
- [Requirement](#requirement)
- [문제 해결 전략](#solution)
- [개선할 부분..](#more)

### 개발 환경 <a id="configuration"></a>

#### Backend

- Node.js
- Socket.io

#### Frontend

- Vue.js
- Vuetify.js

#### Testing

- Jest

### Project Structure <a id="structure"></a>

```bash
├── README.md
├── backend
│   ├── package.json
│   └── src
│       ├── model
│       ├── server.js
│       └── socketEvents.js
└── frontend
    ├── babel.config.js
    ├── package.json
    ├── postcss.config.js
    ├── public
    │   ├── favicon.ico
    │   └── index.html
    ├── src
    │   ├── App.vue
    │   ├── assets
    │   ├── components
    │   ├── constants
    │   ├── directives
    │   ├── main.js
    │   ├── plugins
    │   ├── router
    │   ├── socket.js
    │   ├── stores
    │   ├── styles
    │   └── views
    └── tests
        ├── e2e
        └── unit
```

### Installation <a id="installation"></a>

#### 패키지 설치

```bash
cd backend
yarn install

cd frontend
yarn install
```

#### 프로젝트 실행

```bash
cd backend
yarn start

cd frontend
yarn serve
```
- 접속: http://localhost:8080

#### 테스트 실행

```bash
# unit test
yarn run test:unit
```

### Requirement <a id="requirement"></a>

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

### 문제해결 전략 <a id="solution"></a>

#### UI 구성

- UI Component 라이브러리는 Vuetify.js를 사용
- 화면 구성은 아래와 같이 구현
  - 로그인 화면 : Login.vue
  - 로그인 후에 구현되어있는 채팅룸 리스트를 확인하기 위한 화면 : ChatHome.vue
  - 채팅룸 화면 : ChatRoom.vue
  
- 화면을 구성하는 아래의 부분은 컴포넌트로 구현하여 화면에서 사용한다.
  - 로그인 폼
  - 로그인 후의 채팅 어플리케이션 상단 툴바
  - 메시지 입력 박스
  - 이미지 업로드 버튼
  - 메시지 리스트
  - 채팅룸 리스트

#### 각 화면에 대한 기능 구현

##### 로그인 화면

- 사용자는 첫 진입 시, ID를 입력하여 접속할 수 있다.
  - 이미 서버에서 사용 중인 아이디라면 중복 에러가 발생되어 화면에 에러메시지가 출력되도록 처리
    - 사용 중인 아이디인지 어떻게 체크할 것인가??
      - 서버에서 로그인이 성공하면 사용자에 대해 내부 배열에 저장하여, 사용자명이 배열에 포함되어 있는 지 체크한다.  

- 사용자 정보 모델 
```
{
  socketId: String,
  username: String,
}
```

##### 채팅룸 리스트 화면

- 이미 생성되어 있는 채팅룸 리스트를 어떻게 서버에서 받아올 것인가?
  - 로그인을 성공하면 서버에서 콜백메서드에 생성되어있는 채팅룸 배열을 담아서 전달한다.
     - 클라이언트는 전달받은 값을 store에 저장

- 채팅룸 모델 
```
{
  roomId: Number,
  name: String,
  member: Array,
}
```

##### 채팅방 화면

- 내가 전달한 메시지인 경우에 별도의 다른 색상으로 표현
   - 현재 접속된 사용자의 메시지인지 확인하기 위해 로그인 후에 사용자의 정보를 store에 저장한다.
- 메시지 객체를 store에 저장한다.
   - 채팅룸을 나가면 해당 객체는 초기화한다.
- 메시지가 전달되면 제일 하단으로 화면을 스크롤 처리
   - 메시지 객체가 변경되면 일정 시간 후에 스크롤 이벤트를 발생시킨다.
   - 재사용성을 위해 vue.js의 directive를 이용하여 구현
- 채팅방에 사용자를 초대
  - 초대가 가능한 사용자 정보를 어떻게 불러올 것인가?
    - 채팅방의 사용자 초대 버튼을 클릭하는 시점에 서버로 요청
    - 현재 온라인 상태(서버에 접속되어 있는)인 사용자 중에 채팅방의 member로 포함되어있지 않은 사용자를 필터링 하여 서버에서 전달한다.

#### 그룹 채팅

- socket.io의 room을 이용하여 채팅 그룹을 생성하고, 해당 그룹에 메시지를 전달하도록 한다.
```javascript
// 룸을 생성 또는 조인
socket.join(roomName);

// 해당 룸에 속한 클라이언트에 메시지를 브로드캐스팅
io.to(roomName).emit('event name');
```

#### 서버와의 통신

- 어떠한 기술을 사용할 것인가??
  - [Socket.io](https://socket.io/)를 이용하여 서비스를 구현한다.
  - html5의 websocket을 이용하는 경우 구형 브라우저는 지원이 되지 않는 문제가 있을 수 있음
  - socket.io는 *브라우저와 웹 서버의 종류와 버전을 파악하여 가장 적합한 기술을 선택하여 사용하는 방식*
- 로그인, 채팅방 목록 등 모두 소켓 통신을 이용하여 구현할 것인지? 채팅방 접속 이후와 사용자 초대 기능에 대하여 소켓통신을 구현할 것인지??
  - 각기 나누어 기술을 구현하는 것이 적합한지 아닌지 정확한 판단이 되지 않으므로 socket 통신 기술을 이용하여 구현
  - 만약, 사용자 초대 기능과 채팅방 기능에 대해서만 소켓통신을 사용하고 실시간 통신이 필요하지 않은 기능에 대해서는 http 통신을 이용한다면...
    - socket.io의 namespace를 이용하여 사용자 초대와 채팅방 기능을 구분하여 통신하도록 구현하는 것도 방법일 듯 함.

### 더 개선해보기 <a id="more"></a>

#### 프론트앤드

- [ ] 채팅방 검색
- [ ] 대화내용 검색
- [ ] 채팅방 추가
- [ ] 현재 채팅방에 포함된 사용자 리스트 확인 기능
- [ ] 반응형 적용

#### 백앤드

- [ ] Database 연동 (firebase, mongodb, redis, ...)

### 기타

- [ ] 화면 리프레쉬하는 경우에, 이미 인증한 사용자 정보가 날라가지 않게 처리하기 (세션, 쿠키) 
  - 백앤드에서 세션을 이용해서???
  - 아니면, 프론트에서 브라우저 쿠키에 저장해놓고, 쿠키 정보가 있으면 다시 로그인을 시도해서???
- [ ] CI/CD 구현하기

