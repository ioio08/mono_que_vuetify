<template>
  <div class="main-title">
    <h1>M O N O D Y</h1>
    <h2 >M O N O × D Y T T</h2>
    <h3>M O N O(モノ) と D Y T T(Dialogue with Yourself through things ) を組み合わせた造語です。</h3>
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
    <div class="circle4"></div>

  </div>
</template>

<style lang="scss" scoped>

.main-title {
  background-color: $header-background-color;
  color: $header-font-color;

  text-align: center;
  max-width: 100% !important;
  position: relative;
  z-index: 1;

  h1 {
    font-size: 8rem;
    z-index: 10;
  }
  h2 {
    font-size: 4rem;
    z-index: 10;
  }
  h3 {
    font-size: 2rem;
    z-index: 10;
  }

  .circle1 {
    position: absolute;
    top: -20px;
    left: -20px;

    width: 100px;
    height: 100px;
    background: $v-main-background-color;
    border-radius: 50%;
    z-index: 2;
  }
  .circle2 {
    position: absolute;
    top: 200px;
    left: 200px;

    width: 100px;
    height: 100px;
    background: $v-main-background-color;
    border-radius: 50%;
    z-index: 2;

  }
  .circle3 {
    position: absolute;
    top: -20px;
    left: -20px;

    width: 100px;
    height: 100px;
    background: $v-main-background-color;
    border-radius: 50%;
    z-index: 2;

  }
  .circle4 {
    position: absolute;
    top: -20px;
    left: -20px;

    width: 100px;
    height: 100px;
    background: $v-main-background-color;
    border-radius: 50%;
    z-index: 2;

  }


}

</style>