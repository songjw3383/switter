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
- 먼저 fbase.js 에서 import를 위에 처럼 해주고, dbService라고 이름을 정해준뒤, firestore를 export 해준다.
- Home.js 에서는 submit(onSubmit) 할때 마다 document를 생성하게 되는데, .add를 사용하여 데이터 sweets collection에 대한 document 내용을 추가하도록 설정해준다.

* 트윗들을 가져오는 방법
- state를 생성, 시작할때 dbService 에 대한 정보를 getSweets의 dbService.get 으로부터 받아오도록한다(async~ await)
- 기본적으로 .get은 QuerySnapshot을 가져오는데, QuerySnapshot 중 .forEach로 트윗 data를 받아오도록 한다.
- 그리고 setSweets은 배열을 리턴하게 되는데, 첫번째 요소는 가장최근의 document이고, 두번째 요소는 그 이전의 document로 설정한다. 

* 트윗한 사람이 누군지 알기위한 방법
- App.js 에서는 authenticate를 다루기 때문에 여기서 수정하였다.
- 로그인 하게 되면 onAuthStateChanged가 호출되고 로그인한 user를 받게된다. 이 user는 어디서든 사용하기위해 저장 -> AppRouter로 이동 -> Home.js prop으로 이동
- userObj.uid 로부터 사용자 uid를 얻어오게 하면된다.

* 실시간(realtime) 으로 만드는 방법
- onsnapshot 사용 (listener이다) : 실시간의 변화를 감지한다.
- 그리고 snapshot의 정보를 map을 이용하여 새로운 컴포넌트인 Sweet component를 만든다. 기본적으로 sweetObj와 isOwner를 가지는데, sweetObj는 sweet의 모든 데이터이다.

* 트윗을 삭제하고 등록하는 방법
- Sweet.js 를 생성후 sweetObj 와 isOwner를 가져오며 export 해준다. 
- 또한 트윗을 누군가 작성했는지 여부를 home.js 에서 isOwner을 사용하여 sweet.creatorId 와 userObj.uid 의 일치여부에 따라 판단하게 한다. 일치하게되면 true

**삭제**
- onDeleteClick 함수 생성후 confirm 으로 확인메세지 작성(const ok)
- 그리고 확인을 누를시 true를 반환 -> dbService.doc() 사용, 빈칸은 path가 된다.

**수정**
- [editing, setEditing] 은 편집 모드를 위한 state이며 false값을 가진다
- [newSweet, setNewSweet] 은 text 입력을 업데이트 해주기 위한 state이며 sweetObj의 text를 가진다.
- 그리고 삭제와 똑같이 dbService.doc() 를 사용하고 .update를 사용. update의 값은 newSweet의 text를 가지게 된다 -> newSweet은 input된 text를 의미(새로 수정된 text)

**Recap**
1. Home에서 listener로 snapshot을 이용 -> 변화를 감지하고 알림을 받음 (여기선 sweets 컬렉션에 대한 정보를 array에 담고 state 배열에 집어넣는다(setSweets(sweetArray))
2. map을 이용하고 Sweet component를 만든다. 그리고 두개의 prop을 가지는데 첫번째는 sweetObj 두번째는 isOwner을 받는다
- sweetObj는 sweet의 모든 데이터, isOwner은 기본적으로 true와 false를 갖는데 sweet을 만든사람(sweet.creatorId)와 userObj.uid가 같으면 true를 갖는다.
- userObj.uid 는 App으로 부터 얻는다.
3. App.js는 기본적으로 init, isLoggedIn, userObj 세개의 state를 갖는다.
- init은 기본적으로 true -> 왜냐하면 어플리케이션이 언제 시작해도 onAuthStateChanged가 실행돼야 하기때문, 그리하여 로그인돼야만 user정보를 가져올수 있기때문에 Home의 isOwner에서 userObj를 사용할 수 있는 것이다.
4. Sweet.js는 기본적으로 editing과 newSweet 두개의 state를 갖는다.
- editing은 기본적으로 sweet을 수정하고 있는지 아닌지를 뜻함
- newSweet과 setNewSweet은 input값을 수정할 수 있다.
- 그리고 editing 에는 많은 조건들이 존재

### 4.FILE UPLOAD
- 파일 미리보기 구현
1. 파일을 불러오기 위한 form을 작성하고, 이미지 미리보기를 하기위하여 onFileChange 함수를 생성하고, event.taget.files 로 파일 정보를 갱신
2. fileReader API 사용 : 말 그대로 파일 이름을 읽는 것, 파일을 갖고 reader(=> fileReader())을 만든 다음 readAsDataURL 을 사용하여 파일을 읽는 것
3. attachment와 setAttachment로 이미지가 첨부되었을때 미리보기를 가능하게 하고, 미리보기 사진을 지우수있는 clear를 구현

- Firebase 스토리지 사용 및 파일 업로드
1. firbase/storage를 import 후 storageService 이름으로 export,
2. storageService.ref().child 를 사용, child의 기본적 인자는 이미지의 path, 그리고 어떤 특별한 식별자를 랜덤으로 생성해주는 uuid를 설치
> npm install uuid
3. putString을 사용하여 추가된 파일을 ref()라는 공간에 넣는다.
> putString은 data 와 데이터의 형식을 요구, 여기서 data는 attachment의 string 그리고 format은 data_url
4. file의 url을 가져오기 위해 reference.ref.getDownloadURL 사용
5. 마지막으로 sweet에 첨부된 이미지를 보여주기위한 코드 작성
> {sweetObj.attachmentUrl && <img src={sweetObj.attachmentUrl} width="50px" height="50px" />}

- 파일 삭제 방법
1. attachmentUrl 을 refFromURL 에 넘기면 그 object에 대한 reference 를 얻을 수 있다. 삭제 또한 가능
2. refFromURL.delete() 를 사용하여 삭제
> await storageService.refFromURL(sweetObj.attachmentUrl).delete();

### 5.EDIT PROFILE
- Sweet을 받아오는 방법
1. getMySweets 만들고 useEffect() 작성
2. Router로 부터 userObj를 얻어 Profile.js에 prop형식으로 받아오게 한다. 
3. 그리고 await dbService.collection.where 로 필터링을 한후 .get으로 받아오게한다. (creatorid 가 userObj.uid 와 같은지에 대하여)
> 또한 firestore에선 .where 와 .orderBy를 사용하기 위해 pre-made query를 만들어줘야함 -> index 생성필요(in firestore)

- profile 을 로그인한 사람의 이름으로 바꾸는 방법
1. form(onchange,onsubmit) 작성 후 userObj.updateProfile() 사용

- 프로필 이름 업데이트 후 자동으로 바뀌게 하는 방법 (새로고침 x)
1. App.js 에서 const refreshUser 함수 작성
2. refreshUser 함수내에서 setUserObj 전체 내용이 아닌 일부 내용만을 가져오게하고 updateProfile 함수를 작성
> 인자는 arg, Profile.js -> onSubmit -> userObj.updateProfile({displayName : newDisplayName,}); 을 의미

### 6.FINISHING UP
- Sweet 부분을 담당하는 sweetFactory.js 를 분리하여 작성
- Auth.js 의 form 부분을 authFrom.js로 분리하여 작성
- CSS 작업
- gh pages 를 이용한 배포작업
> https://songjw3383.github.io/switter
- firebase 보안 설정 -> 구글,깃허브 로그인 오류해결을 위해
> Authentication -> Sign-in method -> 승인된 도메인에 **songjw3383.github.io** 추가, 규칙) allow read, write: if request.auth != null; 추가 (승인된 사람만 읽기,쓰기 허용)
- https://console.developers.google.com/apis/credentials API 키 보안 강화
> HTTP referres 및 1.songjw3383.github.io 2.localhost 3.switter-514d7.firebaseapp.com 3개 URL 추가

### 7.CONCLUSION
<p align="left">
<img src="https://user-images.githubusercontent.com/56250064/109417612-bda50380-7a07-11eb-82a9-205716e482f6.png" width="300" height="700">
<img src="https://user-images.githubusercontent.com/56250064/109417614-bed63080-7a07-11eb-80aa-d02a8df8d2fa.png" width="300" height="700">
<img src="https://user-images.githubusercontent.com/56250064/109417615-bed63080-7a07-11eb-823f-0ea39ae7fd8f.png" width="300" height="700">
</p>
