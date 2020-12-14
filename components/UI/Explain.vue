<template>
  <div>
    <div class="main-title">
      <h1>M O N O D Y</h1>
      <h3>モノと対話するように</h3>
      <slot />
      <div class="circle1"></div>
      <div class="circle2"></div>
      <div class="circle3"></div>
      <div class="circle4"></div>

    </div>
  </div>
</template>

<style lang="scss" scoped>

.main-title {
  // background-color: $header-background-color;
  background:linear-gradient(130deg,$header-background-color 20% ,#a5a5a5be 80%, );
  color: $explain-font-color;
  margin-top: 5%;
  padding: 5% 3% 10% 3%;
  opacity: .9;

  text-align: center;
  max-width: 100% !important;
  position: relative;

  @include pc {
    min-height: unset;
  }

  h1 {
    font-size: 8rem;
    z-index: 10;
    position: relative;
    opacity: 1;

    @include tab{
      font-size: 5rem;
    }

    @include mb{
      font-size: 3rem;
    }

  }
  h3 {
    font-size: 3rem;
    z-index: 10;
    position: relative;
    opacity: 1;
    font-weight: lighter;

    @include tab {
      font-size: 1.8rem;
    }

    @include mb {
      font-size: 1.1rem;
    }
  }

  // メインタイトル左側のパーツ
  .circle1 {
    position: absolute;
    top: 10%;
    left: 25%;

    width: 6%;
    height: 0;
    padding: 4%;
    background: $explain-background-color;
    opacity: .8;
    border-radius: 50%;
    z-index: -2;

  }

  //  メインタイトル右側のパーツ
  .circle2 {
    position: absolute;
    top: 3%;
    left: 52%;

    width: 10%;
    height: 0;
    padding: 6%;
    background: $explain-background-color;
    opacity: .8;
    border-radius: 50%;
    z-index: -2;
  }

  // サブタイトル左側のパーツ
  .circle3 {
    position: absolute;
    top: 45%;
    left: 33%;

    width: 8%;
    height: 0;
    padding: 5%;
    background: $explain-background-color;
    opacity: .8;
    border-radius: 50%;
    z-index: -2;
  }
  // サブタイトル右側のパーツ
  .circle4 {
    position: absolute;
    top: 65%;
    left: 60%;

    width: 6%;
    height: 0;
    padding: 3%;
    background: $explain-background-color;
    opacity: .8;
    border-radius: 50%;
    z-index: -2;
  }
}

</style>