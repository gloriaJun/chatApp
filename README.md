# Chatting App
> 채팅 어플리케이션 구현

## TODO 2019.01.02
- [ ] 컴포넌트 단위테스트 작성
- [ ] 문제해결 전략 정리

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

- Mocha

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

```bash
# run
cd backend
yarn start

cd frontend
yarn serve

# unit test
yarn run test:unit
```

http://localhost:8080

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

#### 사용자가 접속을 시도하는 과정

- 접속한 사용자의 정보를 vuex에 저장한다.
- 이미 사용 중인 사용자명이면 중복 에러를 발생시킴
  - 서버에서 사용자리스트 배열에서 이미 등록된 사용자인지 여부를 체크해서 콜백 메서드를 이용해서 클라이언트로 결과를 전달한다.
- 로그인 에러가 발생하지 않으면, 콜백 메서드를 이용하여 서버에서 채팅방 리스트를 전달받아와서 화면에 출력한다.
  - model 정의한 객체에서 배열로 정의된 데이타를 리턴하도록 구현

#### 채팅방에 접속한 이후

- 현재 접속된 채팅방의 채팅 메시지는 vuex에서 관리한다.
  - 채팅방을 나가면 초기화한다.
- 메시지가 오면 제일 하단으로 화면 스크롤 처리
  - 데이타 변경이 발생하면, 스크롤 기능이 구현되도록 처리 (vue.js directive를 이용)

##### 사용자 초대를 하고자 하는 경우

- **사용자 초대** 버튼을 클릭하면, 서버에 저장되어있는 현재 접속 중인 사용자의 아이디 정보를 가져온다.
  - 초대 가능한 사용자의 경우, 현재 채팅방에 포함되어 있지 앟은 멤버를 필터링하여 전달


#### 서버와의 네트워크 통신

- [Socket.io](https://socket.io/)를 이용하여 서비스를 구현한다.


### 개선해야하는 부분.. <a id="more"></a>

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
