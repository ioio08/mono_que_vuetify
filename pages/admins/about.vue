<template>
  <div >
    <Explain></Explain>
    <v-sheet class="message">
      <v-row justify="center">
        <v-col cols="12" class="message-title">
          <h2>M O N O D Y <span> とは、</span></h2>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="9" >
          <h3> M O N O(モノ) と<br>D Y T T(Dialogue with Yourself <br> through things ) を<br> 組み合わせた造語です。</h3>
        </v-col>
        <v-col cols="12" class="message-subtitle">
          <h2>モノと対話することは、<br> あなた自身と対話すること。</h2>
        </v-col>
        <v-col cols="10" class="message-text">
          <p>身近にあるモノ。愛着のあるモノ。 <br>
            よく使うモノ。久々に使うモノ。 <br>
            モノはあなた自身を写す鏡のような存在。<br>
            このアプリはモノとの対話を通して、あなた自身と向き合う<br><span>きっかけ</span> となる場所です。<br>
            向き合った時間を、対話するように綴ってください。</p>
        </v-col>
      </v-row>
    </v-sheet>
    <div class="main" >
      <v-sheet>
        <v-row  justify="space-around">
          <v-col cols="5" class="main-image">
            <v-img src="/images/column.png"></v-img>
            <v-img src="/images/postView.png"></v-img>
          </v-col>
          <v-col cols="6">
            <div class="main-title">
              <h1>【 記事の閲覧 】</h1>
              <h2>ユーザーが投稿した【モノ】にまつわる、<br>「コラム」「質問」を一覧で確認できます。</h2>
            </div>
            <div class="main__functions">
              <h1>【 機能 】</h1>
              <h2>全文検索</h2>
              <h3>記事の本文に一致する文章があれば、その記事だけを表示できます。</h3>
            </div>
            <div class="main__functions">
              <h2>タグ検索</h2>
              <h3>タグ一覧から選んでクリックすると、その単語をタグづけされている記事だけを表示できます。</h3>
            </div>
            <div class="main__functions">
              <h2>記事の閲覧</h2>
              <h3>気になる記事をクリックすれば、その記事を閲覧することがきます。</h3>
              <h3>記事は「タイトル」「ペンネーム」「投稿日」「関連タグ」「写真」「本文」の計６項目で構成されています。</h3>
            </div>
          </v-col>
        </v-row>
      </v-sheet>

      <v-sheet class="profile">
        <v-row justify="center">
          <v-col cols="6">
            <div class="main-title">
              <h1>【 プロフィール 】</h1>
              <h2>
                新規登録・ログインをすることで、<br>
                プロフィールを作成することができます。<br>
                プロフィールページは、このアプリを<br>
                より一層あなたのモノにすることができます。
              </h2>
            </div>
            <div class="main__functions">
              <h1>【 機能 】</h1>
              <h2>プロフィール編集</h2>
              <h3>登録した内容を変更することができます。<br>
                  具体的には「登録名」「ペンネーム」「アイコン画像」です。
              </h3>
            </div>
            <div class="main__functions">
              <h2>新規投稿</h2>
              <h3>モノに関する「コラム」「質問」を新しく投稿できます。</h3>
            </div>
            <div class="main__functions">
              <h2>投稿記事の編集</h2>
              <h3>これまでに投稿した「コラム」「質問」を編集することができます。</h3>
            </div>
          </v-col>
          <v-col cols="5">
            <v-img src="/images/account.png"></v-img>
            <v-img src="/images/profile.png"></v-img>
            <v-img src="/images/profileEdit.png"></v-img>
          </v-col>
        </v-row>
      </v-sheet>
      <v-sheet class="post">
        <v-row justify="space-around">
          <v-col cols="5" class="post-image">
            <v-img src="/images/post.png"></v-img>
          </v-col>
          <v-col cols="6">
            <div class="main-title">
              <h1>【 新規投稿 】</h1>
              <h2>
                モノとの対話を綴ることができます。<br>
                誰かの為にではなく、あなたの為に。
              </h2>
            </div>
            <div class="main__functions">
              <h1>【 機能 】</h1>
              <h2>タイトル</h2>
              <h3>タイトルに「モノ」の名前を入れると、後で見返しやすいです。
              </h3>
            </div>
            <div class="main__functions">
              <h2>タグ</h2>
              <h3>記事にタグを付けることで、関連した記事を閲覧しやすくなります。</h3>
            </div>
            <div class="main__functions">
              <h2>写真</h2>
              <h3>モノを写真でも残せます。</h3>
            </div>
            <div class="main__functions">
              <h2>本文</h2>
              <h3>ここに本文を記載してください。<br>
                  改行も反映されるので、あなたなりの書き方で<br>
                  綴ってください。</h3>
            </div>
          </v-col>
        </v-row>
      </v-sheet>
    </div>
    <v-sheet class="last-message"  @mouseover="mouseOverAction" @mouseleave="mouseLeaveAction">
      <v-row justify="center">
        <v-col cols="12">
          <h1>MONODYを始める</h1>
          <div class="arrow" :class="{ onHover: onHover }"></div>
          <v-btn large :class="{ onButton: onHover }" style="margin:0 0 40px 6%" to="/">ホーム画面へ</v-btn>
        </v-col>
      </v-row>

    </v-sheet>

  </div>
</template>

<script>
import Explain from '~/components/UI/Explain'

export default {
  components: {
    Explain,
  },
  data:() => ({
    onHover: false,
  }),
  methods: {
    mouseOverAction() {
      this.onHover = true
    },
    mouseLeaveAction() {
      this.onHover = false
    },
  }
}
</script>

<style lang="scss" scoped>
.message {
  background:linear-gradient(-45deg,#b1b1b183 25%,$v-chip-form-background-color 70% ) !important;
  h2 {
    text-align: center;
    font-size: 5rem;
    color: $explain-font-color !important;

    span {
      font-size: 4rem;
      color: $main-font-color !important;
    }
  }

  h3 {
    font-size: 3rem;
  }

  p {
    font-size: 2rem;
  }

  &-subtitle {
    margin-top: 5%;
  }

  &-text {
    span {
      color: $explain-font-color;
    }
  }
}

.v-sheet {
  background:linear-gradient(-90deg,#b1b1b183 50%,$v-chip-form-background-color 75%  );
  color: $main-font-color !important;
  opacity: .9;
  padding: 2%;
  margin:10% 0;
  position: relative;

}

.profile {
  background:linear-gradient(-90deg,$v-chip-form-background-color 20%,#b1b1b183 70%  );
}
.v-image {
  margin-bottom: 5%;
  border-radius: 20px;
}

.main {
  h1 {
    font-weight: lighter;
    margin-bottom: 5%;
    z-index: 10;
    position: relative;
    opacity: 1;
  }

  &-title {
    h1 {
      font-size: 40px;
    }
  }

  &__functions {
    margin-top: 6%;

    h1 {
      font-size: 36px;
    }

    h2 {
      z-index: 10;
      position: relative;
      opacity: 1;
      font-weight: bold;
    }

    h3 {
      z-index: 10;
      position: relative;
      opacity: 1;
    }
  }
}

.last-message {
  padding: 5% 0 5% 3%;
  background:linear-gradient(-55deg,#b1b1b183 40%,$v-chip-form-background-color 50%  );
  h1 {
    font-size: 5rem;
    color: $explain-font-color !important;

  }

  .arrow {
    position:relative;
    opacity: 0;
    display: inline-block;
    margin-bottom: 12px;
    height:25px;
    width:16px;
    background:linear-gradient(90deg, #9de0d7 0%,  #1eceb6 40%) !important;

    &::before {
      position:absolute;
      opacity: 0;
      content:"";
      border:solid 25px transparent;
      border-left:solid 25px #1eceb6 ;
      top: -14px;
      left:12px;
    }
  }

  .v-btn {
    opacity:0;
  }

  .onHover {
    width: 800px;
    opacity: 1;
    transition: 2s;

    &::before {
      opacity: 1;
      left:800px;
      transition: 2s;
    }
  }

  .onButton {
    transition-delay : 2s;
    opacity: 1;
  }
}


</style>