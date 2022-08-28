<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <div>
    <router-link to="/login"><div>登录</div></router-link>
    <router-link to="/main"><div>主页</div></router-link>
    <router-view />
  </div>

  <HelloWorld msg="RainCMS" />
</template>

<style scoped></style>
