<template>
  <div class="d2-page-cover">
    <p class="d2-page-cover__title" @click="$open('https://github.com/power4j/ji-boot')">
      <d2-icon-svg class="logo" name="d2-admin"/> JI-ADMIN-UI {{$version}}</p>
    <p class="d2-page-cover__sub-title">这是一个后台管理系统系统的UI部分，基于d2-crud-plus、d2-admin </p>
    <div class="exampleBox">
      <div class="img-box">
        <el-carousel height="300px">
          <el-carousel-item v-for="item in banners" :key="item.id">
            <img :src="item" alt=""  width="auto" height="300" style="margin: 0 auto;">
          </el-carousel-item>
        </el-carousel>
      </div>

<!--      <div class="left">-->
<!--        <d2-highlight :code="helper.crud" lang="javascript"/>-->
<!--      </div>-->
<!--      <div class="icon">-->
<!--        <i class="el-icon-right"></i>-->
<!--      </div>-->
<!--
      <div class="right">
        <img src="./image/gif.webp">
      </div>

-->

    </div>

    <p class="d2-page-cover__build-time">构建时间 {{$buildTime}}</p>
    <slot name="footer"/>
    <div style="">
      <div class="toStar">喜欢就去star一下吧 <i class="fa fa-hand-o-right"></i></div>
      <a target="blank" href="https://github.com/power4j/ji-boot" >
        <img
          style="position: absolute; top: 0; right: 0; border: 0;vertical-align:top; width: 150px;"
          src="./image/darkblue@2x.png"
          alt="Fork me on GitHub">
      </a>
    </div>
  </div>
</template>
<script>
import helper from './helper'

export default {
  data () {
    return {
      helper: helper,
      banners: [
        'http://picdn.eta.pub/img/ding-err-notify.png',
        'http://picdn.eta.pub/img/wx-err-notify.png',
        'http://picdn.eta.pub/img/ui-sys-res.png',
        'http://picdn.eta.pub/img/swagger.png',
        'http://picdn.eta.pub/img/knife4j.png'
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.img-box{
  width: 500px;
}
.d2-page-cover {
  .logo {
    width: 40px;
    height: 40px;
  }
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .d2-page-cover__logo {
    img {
      width: 200px;
    }
  }
  .d2-page-cover__title {
    margin: 0px;
    margin-bottom: 10px;
    font-weight: bold;
    color: $color-text-main;
    display: -webkit-flex; /* Safari */
    display: flex;
    align-items:center;
    flex-direction: row;
    justify-content: center;
    cursor: pointer;
  }
  .d2-page-cover__sub-title {
    margin: 0px;
    margin-bottom: 10px;
    color: $color-text-normal;
  }
  .d2-page-cover__build-time {
    margin: 0px;
    margin-bottom: 0px;
    margin-top: 10px;
    font-size: 12px;
    color: $color-text-placehoder;
  }

  .exampleBox{
    display: flex;
    align-items:center;
    height:420px;
    width:90%;
    padding:5px;
    margin:auto;
    justify-content: center;
    .left{
      height:100%;
      overflow-y: hidden;
      border: 1px solid #aaa;
    }
    .icon{font-size: 50px;}
    .right{
      height:100%;
      img{
        height:100%;
      }
    }
    .d2-highlight{
      font-size: 8px;
    }
  }

  .toStar{
    position: absolute; top: 20px; right: 150px; border: 0;
    color:#4cc134;
    margin: 10px;
    animation: changeshadow 1s  ease-in  infinite ;
    /* 其它浏览器兼容性前缀 */
    -webkit-animation: changeshadow 1s linear infinite;
    -moz-animation: changeshadow 1s linear infinite;
    -ms-animation: changeshadow 1s linear infinite;
    -o-animation: changeshadow 1s linear infinite;
  }
  @keyframes changeshadow {
    0%{ text-shadow: 0 0 4px #4cc134}
    50%{ text-shadow: 0 0 40px #4cc134}
    100%{ text-shadow: 0 0 4px #4cc134}
  }
  @-webkit-keyframes changeshadow {
    0%{ text-shadow: 0 0 4px #4cc134}
    50%{ text-shadow: 0 0 40px #4cc134}
    100%{ text-shadow: 0 0 4px #4cc134}
  }
  @-moz-keyframes changeshadow {
    0%{ text-shadow: 0 0 4px #4cc134}
    50%{ text-shadow: 0 0 40px #4cc134}
    100%{ text-shadow: 0 0 4px #4cc134}
  }
  @-ms-keyframes changeshadow {
    0%{ text-shadow: 0 0 4px #4cc134}
    50%{ text-shadow: 0 0 40px #4cc134}
    100%{ text-shadow: 0 0 4px #4cc134}
  }
  @-o-keyframes changeshadow {
    0%{ text-shadow: 0 0 4px #4cc134}
    50%{ text-shadow: 0 0 40px #4cc134}
    100%{ text-shadow: 0 0 4px #4cc134}
  }
}
</style>
