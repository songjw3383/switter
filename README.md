# Twitter Clone Coding

## 0218 ~

### 0. INTRODUCTION
* 요구사항
- HTML / CSS / ReactJS / React Hooks

* Firebase 란?
- 처음에는 데이터베이스 였으며 구글에 인수되었다. 좋은 백엔드 기능들을 포괄하고 그 기능들을 제공해준다.

- App 개발에 좋은 기능들 목록
1. Cloud Firestore : 데이터베이스 관련 코드 없이 데이터베이스를 사용하게 해주는 기능
2. Firebase Machine Learning
3. Cloud Functions : 기본적으로 serverless function의 기능을 제공, Aws 의 람다와 비슷
4. Cloud Storage : 기본적으로 업로드의 기능을 해주는 것, 사진과 같은 파일 업로드용
5. Hosting : 배포하기 위한 기능
6. Authentication : 쉽게 인증 기능을 구현해주도록 도와주는 기능
7. Realtime Database : Firebase의 원조 데이터베이스, 지금은 잘 사용하지 않음
8. Crashlytics : analyze , 어플리케이션의 충돌같은 것을 볼 수 있게 해줌
9. Performance Monitoring : app의 성능을 볼 수 있다.
등등..

* Firebase의 장단점?
- 장점 :빠른 처리 속도 (Authenticate 등과 같은..)

- 단점 :구글과 아마존의 데이터와 기능들을 사용하다보니 실제 프로젝트나 회사용도에는 부적합, 그러므로 시작하는 용도나 연습을 위한 용도로 좋음

* Firebase 요금?
- 무료 : Testing / Analytics / App Distribution / App Indexing 
- Phone Authenticate : 한달에 1만명 까지 무료
- Stored data : 1GiB
- Storage : 5GB

### 1. SETUP
* Setup
> create-react-app switter
- Making Firebase project setup
> project name : switter
- Firebase 에서 기본 플랫폼을 선택 -> Web으로 선택
- 설치 -> npm install --save firebase, 그리고 firebase.js 파일 생성 후 Firebase Configuration 복사
- npm run start 로 서버실행

* 환경변수를 이용할때는 **REACT_APP_** 을 꼭 붙여야한다. 또한 .env 파일은 최상위에 위치해야한다. (package.json 바로위에)
> 예시: REACT_APP_API_KEY
- create-react-app 에선 자동적으로 REACT_APP으로 시작하는 환경변수를 찾도록 자동으로 설정이 되어 있다.
- .env 파일을 하는 이유는? -> gitignore에 .env를 추가해줌으로써 git의 버전관리 대상에 포함되지 않게 하기 위해서이다. (Key를 github에 업로드 하지 않기 위해서)

* Router Setup
- 4개의 routes 파일을 만들어준다. -> Auth.js / Profile.js / EditProfile.js / Home.js
- routes를 사용하기 위해 npm i react-router-dom 설치
- components 파일 내부에 Router.js 파일을 생성
- render 시킬 routes는 로그인 여부에 따라 달라지게된다.
```
<Router>
            <Switch>
                {isLoggedIn ? 
                <>
                <Route exact path="/">
                    <Home />
                </Route>
                </> : 
                <Route exact path="/">
                     <Auth />
                </Route>}
            </Switch>
        </Router>
```
> 로그인이 되면 Home 화면을 보게 하고, 로그인이 되지 않은 상태일땐 Auth 화면을 띄우게 만든다

**Fragment? -> <> </> 로 감싸주는걸 말하며 많은 routes를 보내주고 싶을때 쓴다.**
