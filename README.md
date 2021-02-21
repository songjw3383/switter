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

### 2. AUTHENTICATION
- Auth 를 사용하기 위해서는 import를 해야한다.
> import "firebase/auth"
- user 로그인 여부는 authService.currentUser 를 사용한다
> 기본적으로 currentUser은 User | null 을 반환하게 된다.
```
const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
```
- jsconfig.json 세팅으로 import { authService } from "fbase" 이런식으로 import 해줄 수 있다.

- Firebase 에서 sign-in method 를 세팅해준다 ( 이메일/패스워드 , 깃허브, 구글)

** email, password form 작성 **
- onchange는 값을 적을때 마다 실행되는 함수이다. (email/password)
- target 이 변경이 일어난 부분이다. name은 name이고 value는 키보드를 통해 입력
- name 과 email 이 같은 경우 state인 email을 변경, 그 외에 경우 state인 password를 변경하게 된다. 이때 키보드를 통해 입력되는 value 값이 사용되는 것이다.
- onSubmit에선 preventDefault를 사용하여 새로고침을 방지

- Email auth provider -> createWithEmailAndPassword 는 이메일주소와 패스워드로 연결된 새로운 유저 계정 만들기
> 만약 newAccount 가 true 일시 새로운 계정을 만들기 위해 사용, 또한 promise를 주는데 이건 await을 써야한다는 의미
- Email auth provider => signInWithEmailAndPassword // 이미 계정이 있는경우

* persistance
- 나의 사용자들을 어떻게 기억할 것인지 선택할 수 있도록 해준다.
1. local(default) : 브라우저를 닫더라도 사용자 정보는 기억될 것이라는 의미 --> 이것을 사용
2. session : 브라우저가 열려 있는 동안만 기억됨
3. none : 새로고침하면 로그아웃됨.

* onAuthStateChanged
- 사용자의 로그인 상태의 변화를 관찰하는 관찰자를 추가시킴, 의미는 기본적으로 event listener이고 변화가 있을때 변경을 감지한다.

* error에 대한 useState를 만듬으로써 error 메세지 출력을 해준다

* toggle을 사용함으로써 sign in 과 create Account 를 구별 해준다.

* 구글과 깃허브 로그인 구현하기
- signingWithPopup : provider를 만들고 provider로 로그인 해야한다.
- 여기선 onSocialClick 이라는 함수를 만들고 깃헙과 구글 버튼에 함수를 부여, 또한 구글이나 깃헙일때 provider = new firebaseInstance.auth.(google or git) 를 실행.

* Home 에선 기본적으로 tweet을 쓸 수 있는 형태로 작성해야함.
- Navigation.js 생성후 <Router> 상단에 로그인되어있는 사람만 Navigation을 볼수 있게 만듬
> {isLoggedIn && <Navigation />}
- 또한 Navigation.js 에서 home/profile 목록과 경로설정을 해주었다. 또한 routes에 profile을 가는 경로를 작성 
- 그리고 Profile에서 로그아웃을 하기위한 버튼을 생성
- 로그아웃을 누르고 home으로 가기위한 방법은 **Redirect** 와 useHistory() 두가지 방법이 있다.
1. Redirect는 경로가 다른곳으로 가면 무조건 home으로 가게 하는 것
2. useHistroy() 는 특정 행동을 하면 그 행동에만 home으로 가게하는것
> 여기선 useHistory()를 사용하여 로그아웃 버튼을 눌렀을 때만 home으로 가게 설정하였다

```
const history = useHistory();
    const onLogOutClick =() => {
        authService.signOut();
        history.push("/");
    };
```

### 3.SWEETING
* 기본적으로 Home 화면에서 트위팅 기능을 하기 위한 폼을 작성해주었다.

* Database 사용 -> Cloud Firebase -> Test Mode
> import "firebase/firestore"; 추가 

- 기본적으로 Cloud Firebase는 NoSQL 기반 (상당히 유연하고, 사용하기 쉬움)
1. Collection : 폴더와 같은 것
2. Document : 문서, 텍스트와 비슷한 것
> Collection 안에 Document 가 있다고 생각하면 됨. 

* 코드내에서 collection 추가 및 document 생성
먼저 fbase.js 에서 import를 위에 처럼 해주고, dbService라고 이름을 정해준뒤, firestore를 export 해준다.
Home.js 에서는 submit(onSubmit) 할때 마다 document를 생성하게 되는데, .add를 사용하여 데이터 sweets collection에 대한 document 내용을 추가하도록 설정해준다.

* 트윗들을 가져오는 방법
state를 생성, 시작할때 dbService 에 대한 정보를 getSweets의 dbService.get 으로부터 받아오도록한다(async~ await)
기본적으로 .get은 QuerySnapshot을 가져오는데, QuerySnapshot 중 .forEach로 트윗 data를 받아오도록 한다.
그리고 setSweets은 배열을 리턴하게 되는데, 첫번째 요소는 가장최근의 document이고, 두번째 요소는 그 이전의 document로 설정한다. 

* 트윗한 사람이 누군지 알기위한 방법
App.js 에서는 authenticate를 다루기 때문에 여기서 수정하였다.
로그인 하게 되면 onAuthStateChanged가 호출되고 로그인한 user를 받게된다. 이 user는 어디서든 사용하기위해 저장 -> AppRouter로 이동 -> Home.js prop으로 이동
userObj.uid 로부터 사용자 uid를 얻어오게 하면된다.

* 실시간(realtime) 으로 만드는 방법
onsnapshot 사용 (listener이다) : 실시간의 변화를 감지한다.

* 트윗을 삭제하고 등록하는 방법
