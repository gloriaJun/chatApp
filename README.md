# Chatting App
> 채팅 어플리케이션 구현

## Contents
1. [개발 환경](#dev-spec)
2. [프로젝트 구조](#prj-structure)
3. [Installation](#installation)
4. [Requirement](#requirement)
5. [문제 해결 전략](#solution)

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

###### 사용자 첫 진입 시, 아이디가 중복되는 경우에는??

######  통신을 어떠한 기술을 이용하여 구현할 것인가?
- websocket을 이용.


