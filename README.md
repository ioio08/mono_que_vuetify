## <img width="1280" alt="スクリーンショット 2020-12-15 18 31 47" src="https://user-images.githubusercontent.com/66821960/102196959-e424c980-3f03-11eb-8a59-4c64e330e241.png">

# プロダクト名
##  MONODY( モノディー )
『モノと対話するように』をコンセプトに、皆さんの身の周りにある「モノ」との関わり方を、対話する様に綴ってもらう投稿型アプリケーションです。

アクセス：[ここをクリック](https://mono-que-data.firebaseapp.com/auth/login)してアプリケーションに進めます。
※ゲストログインボタンがあるので、ログイン後の機能確認の際にご利用ください。


# 目次
 - [使用言語](#使用言語)
   - 言語名
 - [開発環境](#開発環境)
   - 利用技術
   - バージョン
 - [アプリ概要](#アプリ概要)
   - 目的
   - 構成
   - 詳細(フロントエンド、バックエンドの役割について)
 - [工夫ポイント](#工夫ポイント)
   - 工夫内容
   - コード


# 使用言語
|  マークダウン |  ベース  | フレームワーク | バックエンド |
| :-----------: | :------: | :------------: | :----------: |
|  HTML　<img width= '20px'  src="https://cdn.svgporn.com/logos/html-5.svg">  |  JavaScript (ES6)　<img width= '25px'  src="https://cdn.svgporn.com/logos/javascript.svg">  | Nuxt.js　<img width= '20px'  src="https://cdn.svgporn.com/logos/nuxt-icon.svg">  |  Firebase　<img width= '20px'  src="https://cdn.svgporn.com/logos/firebase.svg">  |
|  SCSS　<img width= '30px'  src="https://cdn.svgporn.com/logos/sass.svg">  |    | vuetify　<img width= '18px'  src="https://cdn.svgporn.com/logos/vuetifyjs.svg"> |



# 開発環境
 - npm v6.14.8
 - Node.js v12.19.0
 - Nuxt.js v2.14.7

# ライブラリ
 - dotenv v1.4.1
 - Firebase v8.1.1
 - vuexfire v3.2.4

# アプリ概要

### 目的：
1. SPA開発の理解を深める為。
1. モノに特化した投稿アプリケーションを開発する為。

### 構成：
1. フロントエンドはJavaScriptをベースに、フレームワークのNuxt.jsを利用して開発しています。
1. バックエンドは Firebaseを利用し、ユーザーデータや投稿データの管理、認証機能などを実装しています。

### 詳細：
#### フロントエンド( Nuxt.js )
1. ユーザー利用のストレス解消を考慮したデザイン(hoverやscrollでのイベント発火、サイドナビゲーションで簡易ページ遷移など)
1. モバイル、タブ、パソコンサイズのレスポンシブ対応
1. リアルタイムのデータバインディング(非同期通信)
1. ログイン状態の有無でページ遷移制御(middleware)
1. ユーザーや投稿記事に応じた動的ルーティングをディレクトリ構造に利用
1. ユーザー情報、投稿記事のテキストと画像のCRUD機能（ログインユーザーのみ編集・削除可能）
1. 投稿記事のページネーション
1. 全文、タグでの検索機能(フロントエンド制御の為、バックエンド制御に改善予定)
#### バックエンド( Firebase )
1. Cloud Firestoreでユーザー、投稿記事のデータを管理
1. Firebase Storageで画像データを管理(Firestoreで画像を保存する際に,Storage保存で発行したURLを使用)
1. Email, Googleカウントでの認証機能( 新規登録・ログイン共に可能  )
1. ログイン状態の永続化、ルーティング制御


# 工夫ポイント
## 工夫リスト
1. [投稿ページをコンポーネント化し、新規投稿と編集に対応する様に設計](#https://github.com/ioio08/mono_que_vuetify#1-%E6%8A%95%E7%A8%BF%E3%83%9A%E3%83%BC%E3%82%B8%E3%82%92%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E5%8C%96%E3%81%97%E6%96%B0%E8%A6%8F%E6%8A%95%E7%A8%BF%E3%81%A8%E7%B7%A8%E9%9B%86%E3%81%AB%E5%AF%BE%E5%BF%9C%E3%81%99%E3%82%8B%E6%A7%98%E3%81%AB%E8%A8%AD%E8%A8%88-pullreq-)
1. [google認証実装](#https://github.com/ioio08/mono_que_vuetify#2-google%E8%AA%8D%E8%A8%BC%E5%AE%9F%E8%A3%85-storeauthjs-)
1. [ヘッダーアイコンを、ユーザーが登録している画像で表示](#https://github.com/ioio08/mono_que_vuetify#3-%E3%83%98%E3%83%83%E3%83%80%E3%83%BC%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3%E3%82%92%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E7%99%BB%E9%8C%B2%E7%94%BB%E5%83%8F%E3%81%A7%E8%A1%A8%E7%A4%BA-pullreq-)

### 1. 投稿ページをコンポーネント化し、新規投稿と編集に対応する様に設計( [pullReq](https://github.com/ioio08/mono_que_vuetify/pull/30/files#diff-ae46465c9f268c047c82f7d908ced92f01677a97d48a6415374944929cf9665b) )

#### <script> dataのプロパティ `newPost(投稿データの設定値)` を三項演算子で実装し、propsデータの有無でデフォルト値を指定
```
props: {
  # Column, Questionからデータ受け取り
  postData: {
    type: Object,
    required: false
  },
  <!- 省略 ->

# 新規投稿 / 編集によってnewPostの設定を調整する三項演算子
# 新規投稿：this.postData = null なので、初期値の設定
# 編集：this.postData がpropsで渡され、newPostとして設定

newPost: this.postData
? { ...this.postData}
: {
  text: {
    author:'',
    title:'',
    content:'',
  },
  image:{
    src:null,
    name:'',
  },
  tags: []
},
```

### 2. google認証実装( /store/auth.js )

#### ログイン状態の永続化( [pullReq](https://github.com/ioio08/mono_que_vuetify/pull/41/files#diff-e5325c6d5dcefa6b26e2deb7b2a561d472d0f9247f76925abc303bc8d98b7a55) )
#### ログインのエラーハンドリング( [pullReq](https://github.com/ioio08/mono_que_vuetify/pull/82/files#diff-e5325c6d5dcefa6b26e2deb7b2a561d472d0f9247f76925abc303bc8d98b7a55))
```
# Google認証でのログイン処理＋ユーザー情報取得 => ユーザー登録
  async signInWithGoogle({ commit, dispatch }) {
    # setPersistence(firebase.auth.Auth.Persistence.LOCAL) でログイン状態を永続化
    # Cookieを利用しない
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    try {
      # google認証のメソッド => データを取得してdocに格納
      const doc = await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())

      # <!- 省略  ->

    } catch (error) {
      # エラー分によってメッセージをswitchさせる関数
      let errorMessage = dispatch('errorHandling', await (error, 'popup'))
      commit('setErrorMessage', errorMessage)
    }
  },

  # エラーコードによって描画するメッセージをswitchする関数
  errorHandling(error, method) {
    switch (error.code) {
      case 'auth/cancelled-popup-request':
      case 'auth/popup-closed-by-user':
        return null;
      case 'auth/email-already-in-use':
        if (method.indexOf('signup') !== -1) {
          return 'このメールアドレスは使用されています';
        } else {
          return 'メールアドレスまたはパスワードが違います';
        }
      case 'auth/invalid-email':
        return 'メールアドレスの形式が正しくありません';
      case 'auth/user-disabled':
        return 'サービスの利用が停止されています';
      case 'auth/user-not-found':
        return 'メールアドレスまたはパスワードが違います';
      case 'auth/user-mismatch':
        if (method === 'signin/popup') {
          return '認証されているユーザーと異なるアカウントが選択されました';
        } else {
          return 'メールアドレスまたはパスワードが違います';
        }
      case 'auth/weak-password':
        return 'パスワードは6文字以上にしてください';
      case 'auth/wrong-password':
        return 'メールアドレスまたはパスワードが違います';
      case 'auth/popup-blocked':
        return '認証ポップアップがブロックされました。ポップアップブロックをご利用の場合は設定を解除してください';
      case 'auth/operation-not-supported-in-this-environment':
      case 'auth/auth-domain-config-required':
      case 'auth/operation-not-allowed':
      case 'auth/unauthorized-domain':
        return '現在この認証方法はご利用頂けません';
      case 'auth/requires-recent-login':
        return '認証の有効期限が切れています';
      default:
        if (method.indexOf('signin') !== -1) {
          return '認証に失敗しました。しばらく時間をおいて再度お試しください';
        } else {
          return 'エラーが発生しました。しばらく時間をおいてお試しください';
        }
    }
  }
```

### 3. ヘッダーアイコンを、ユーザー登録画像で表示( [pullReq](https://github.com/ioio08/mono_que_vuetify/pull/69/files#diff-abda917bdb0f4670d443fba843cbfb2e5def3a9d1c3fdf792fa6823271bd0bb6) )

#### ログインしたタイミングでアイコンを表示（未ログインは場合は非表示）

```
//// Header.vue ////

# v-showでloggedIn（ログインの有無をtrue,falseで格納）がtrueの場合表示
# imageのsrc属性をバインディングさせて、動的に変更
<v-avatar
  v-bind="attrs"
  v-on="on"
  v-show="loggedIn"
  size="40"
>
  <v-img :src="userImage" />
</v-avatar>
```

#### ログインしたユーザーの登録データから、登録している画像データを取得し、storeに格納。その後Headerでは、storeからgetters経由で画像データーを取得し、リアルタイムでレンダリングする。

```
//// /plugins/firebase.auth.js ////

# ログインの有無を識別するメソッド( auth.onAuthStateChanged() )
auth.onAuthStateChanged(user => {
  # ログイン済のユーザー
  if (user) {
    # ログインした場合に登録画像をリアルタイムで描画する為の処理
    # usersコレクションへの参照のインタスタンス作成
    const userRef = db.collection('users').doc(user.uid)

    # ログイン中のユーザー情報を確認して画像を取得
    userRef.get().then(doc => {
      store.commit('auth/setUserImage', doc.data().image.src)
    })

    store.commit('auth/setUid', user.uid)

    # loggedIn をtureに変更する
    store.commit('auth/setAuthStatus', true)

    # <!- 省略 ->
```

```
////  Header.vue  ////

# computedでgettersデータを取得し、レンダリングする。
computed: {
  ...mapGetters({
    userImage: 'auth/getUserImage',
    loggedIn: 'auth/getAuthStatus'
  }),
},

```