<template>
  <div class="http404-container">
    <div class="http404">
      <h1 class="http404-title">404错误!</h1>
      <h2 class="http404-desc">找不到网页!</h2>
      <div class="http404-info">
        对不起，您正在寻找的页面不存在。尝试检查URL的错误，然后按浏览器上的刷新按钮或尝试在我们的应用程序中找到其他内容。
      </div>
      <router-link class="http404-btn" to="/main">返回首页</router-link>
    </div>
    <div class="http404-img">
      <img src="~assets/images/404-img.svg" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.http404-img {
  position: absolute;
  top: -8%;
  right: -5%;

  animation: opacity 1s ease-in-out;

  img {
    height: 100vh;
    width: auto;
    user-select: none;
  }
}

.http404 {
  position: absolute;
  top: 30%;
  left: 28%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  z-index: 9;
  &-title {
    font-size: 32px;
    font-weight: 700;
    color: @primary-color;
    animation: slideUp 0.7s forwards;
  }
  &-desc {
    font-size: 22px;
    font-weight: 700;
    animation: slideUp 0.7s 0.1s forwards;
  }
  &-info {
    color: @regular-text;
    font-size: 13px;
    line-height: 21px;
    margin-bottom: 30px;
    animation: slideUp 0.7s 0.2s forwards;
  }
  &-btn {
    display: block;
    width: 110px;
    height: 36px;
    color: white;
    background-color: @primary-color;
    border-radius: 100px;
    text-align: center;
    line-height: 36px;
    font-size: 14px;
    text-decoration: none;
    animation: slideUp 0.7s 0.3s forwards;
  }
}

@keyframes slideUp {
  0% {
    transform: translateY(60px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes opacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
