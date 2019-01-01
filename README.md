# Chatting App
> 채팅 어플리케이션 구현

## TODO

### 2109.01.01
- [ ] 현재 채팅방에 포함된 사용자 리스트 확인 기능
- [ ] 사용자 초대
- [ ] 메시지 보낸 시간 표시

### 프론트앤드

- [x] 로그인 페이지
- [x] 채팅방 리스트 화면
- [x] 채팅창 화면
  - [ ] 현재 채팅방에 포함된 사용자 리스트 확인 기능
  - [x] 메시지 전달 기능
  - [x] 이미지 업로드 기능
  - [ ] 사용자 초대 기능
- [x] 메시지가 오면 제일 하단으로 스크롤 되도록 기능 추가

### 서버 - 서버 api를 구현하면서 프론트앤드 연동 작업도 같이 할 것

- [x] 로그인 api
    - [x] 로그인 시에 store에 저장하도록 처리
- [x] 채팅방 리스트 api
- [x] 채팅방 접속
- [x] 1:1 채팅 기능
- [ ] 사용자 초대
- [ ] 메시지 보낸 시간 표시

### 오류수정
- [x] 채팅 메시지 렌더링 시의 워닝 메시지

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
- 메시지가 오면 제일 하단으로 화면 스크롤 처리
  - *어떠한 기능을 이용해서 구현??*

##### 사용자 초대를 하고자 하는 경우

- **사용자 초대** 버튼을 클릭하면, 서버에 저장되어있는 현재 접속 중인 사용자의 아이디 정보를 가져온다.


#### 서버와의 네트워크 통신

> 왜 아래와 같이 구분하여 구현하였는 지에 대한 배경에 대해 간략히 정리해두기...

- [Socket.io](https://socket.io/)를 이용하여 서비스를 구현한다.

> websocket - html5부터 지원
> pooling 방식은 ~~~

```
Why WebSockets instead of HTTP(S)?
With WebSockets you can establish a persistent connection, which allows for bidirectional communication between client and server. Nowadays, you will mostly find REST based APIs on the web, which are built upon HTTP. These APIs are consumed as follows: The client requests a page or resource and the server responds (request-respone). Thus, using WebSockets over HTTP can have the following advantages:
```


### 개선할 부분.. <a id="more"></a>

#### 프론트앤드

- 채팅 화면 디자인 개선
- 반응형 적용
- 채팅방 검색
- 대화내용 검색
- 채팅방 추가

#### 백앤드

- Database 연동 (firebase, mongodb, redis, ...)
- 화면 리프레쉬하는 경우에, 이미 인증한 사용자 정보가 날라가지 않게 처리하기 (세션, 쿠키) 

### 기타

- [ ] CI/CD 구현하기
