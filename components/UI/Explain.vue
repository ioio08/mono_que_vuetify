<template>
  <div>
    <div class="main-title">
      <h1>M O N O D Y</h1>
      <h3>モノと対話するように</h3>
      <p>M O N O(モノ) と<br>D Y T T(Dialogue with Yourself through things ) を<br> 組み合わせた造語です。<slot /> </p>
      <div class="circle1"></div>
      <div class="circle2"></div>
      <div class="circle3"></div>
      <div class="circle4"></div>

    </div>
    <div class="app-nav">

    </div>
  </div>
</template>

<style lang="scss" scoped>

.main-title {
  background-color: $header-background-color;
  color: $explain-font-color;
  border-radius: 20px;
  padding: 3%;
  opacity: .9;

  text-align: center;
  max-width: 100% !important;
  position: relative;
  z-index: 1;

  h1 {
    font-size: 8rem;
    z-index: 10;
    position: relative;
    opacity: 1;

  }
  h3 {
    font-size: 4rem;
    z-index: 10;
    position: relative;
    opacity: 1;
    font-weight: lighter;
  }
  p {
    text-align-last: left;
    margin: 3% 0 0 15%;
    font-size: 2rem;
    z-index: 10;
    position: relative;
    opacity: 1;

    button {
      margin: 2% 0 0 20%;
    }
  }

  .circle1 {
    position: absolute;
    top: 30px;
    left: 600px;

    width: 200px;
    height: 200px;
    background: $explain-background-color;
    opacity: .8;
    border-radius: 50%;
    z-index: -2;
  }
  .circle2 {
    position: absolute;
    top: 200px;
    left: 180px;

    width: 170px;
    height: 170px;
    background: $explain-background-color;
    opacity: .8;
    border-radius: 50%;
    z-index: -2;

  }
  .circle3 {
    position: absolute;
    top: 230px;
    left: 800px;

    width: 120px;
    height: 120px;
    background: $explain-background-color;
    opacity: .8;
    border-radius: 50%;
    z-index: -2;

  }
  .circle4 {
    position: absolute;
    top: 15px;
    left: 80px;

    width: 130px;
    height: 130px;
    background: $explain-background-color;
    opacity: .8;
    border-radius: 50%;
    z-index: -2;
  }


}

</style>