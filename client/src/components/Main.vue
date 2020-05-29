<template>
  <div>
    <!-- over the fold -->
    <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-dark" id="mainBanner">
      <div class="col-md-6 p-lg-6 mx-auto my-6">
        <h1 id="textMain">Goes beyond the Pro's</h1>
        <p class=""> <button class="btn btn-link"><h4>Lebih Lanjut ></h4></button> <button class="btn btn-link"><h4>Beli ></h4></button> </p>
      </div>
    </div>
    <!-- banner 2 -->
    <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-dark" id="banner2">
      <div class="col-md-6 p-lg-6 mx-auto my-6">
        <div id="textBanner2"> </div>
        <p class=""> <button class="btn btn-link"><h4>Lebih Lanjut ></h4> </button> <button class="btn btn-link"><h4>Beli ></h4></button> </p>
      </div>
    </div>

    <div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
      <div class="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
        <div class="my-3 py-3">
          <h2 class="display-5">Another headline</h2>
          <p class="lead">And an even wittier subheading.</p>
        </div>
        <div class="bg-light shadow-sm mx-auto" style="width: 80%; height: 300px; border-radius: 21px 21px 0 0;"></div>
    </div>
  <div class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
    <div class="my-3 p-3">
      <h2 class="display-5">Another headline</h2>
      <p class="lead">And an even wittier subheading.</p>
    </div>
     <div class="bg-dark shadow-sm mx-auto" style="width: 80%; height: 300px; border-radius: 21px 21px 0 0;"></div>
    </div>
  </div>

<div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
  <div class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
    <div class="my-3 p-3">
      <h2 class="display-5">Another headline</h2>
      <p class="lead">And an even wittier subheading.</p>
    </div>
    <div class="bg-dark shadow-sm mx-auto" style="width: 80%; height: 300px; border-radius: 21px 21px 0 0;"></div>
  </div>
  <div class="bg-primary mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
    <div class="my-3 py-3">
      <h2 class="display-5">Another headline</h2>
      <p class="lead">And an even wittier subheading.</p>
    </div>
    <div class="bg-light shadow-sm mx-auto" style="width: 80%; height: 300px; border-radius: 21px 21px 0 0;"></div>
  </div>
</div>

<div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
  <div class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
    <div class="my-3 p-3">
      <h2 class="display-5">Another headline</h2>
      <p class="lead">And an even wittier subheading.</p>
    </div>
    <div class="bg-white shadow-sm mx-auto" style="width: 80%; height: 300px; border-radius: 21px 21px 0 0;"></div>
  </div>
  <div class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
    <div class="my-3 py-3">
      <h2 class="display-5">Another headline</h2>
      <p class="lead">And an even wittier subheading.</p>
    </div>
    <div class="bg-white shadow-sm mx-auto" style="width: 80%; height: 300px; border-radius: 21px 21px 0 0;"></div>
  </div>
</div>

<div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
  <div class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
    <div class="my-3 p-3">
      <h2 class="display-5">Another headline</h2>
      <p class="lead">And an even wittier subheading.</p>
    </div>
    <div class="bg-white shadow-sm mx-auto" style="width: 80%; height: 300px; border-radius: 21px 21px 0 0;"></div>
  </div>
  <div class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
    <div class="my-3 py-3">
      <h2 class="display-5">Another headline</h2>
      <p class="lead">And an even wittier subheading.</p>
    </div>
    <div class="bg-white shadow-sm mx-auto" style="width: 80%; height: 300px; border-radius: 21px 21px 0 0;"></div>
  </div>
</div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  created() {
    if (this.$store.state.isConfirmOrder) {
      this.$store.dispatch('isConfirmOrder', false)
    }
  }
}
</script>

<style scoped>
  #mainBanner {
    background-image: url('https://i.ytimg.com/vi/5NoZ39sforc/maxresdefault.jpg');
    background-size:auto;
    color: whitesmoke;
    height: 90vh;
    margin: 0;
  }
  #textMain {
    margin-top: 270px;
  }
  #banner2 {
    background-image: url('https://media.idownloadblog.com/wp-content/uploads/2020/04/iPad-Pro-float-ad-banner.jpg');
    background-size: cover;
    height: 100vh;
  }
  #textBanner2 {
    margin-top: 420px;
  }
</style>