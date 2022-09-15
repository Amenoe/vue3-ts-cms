<template>
  <div class="login"><LoginPanelVue /></div>
</template>

<script setup lang="ts">
import LoginPanelVue from './cpns/LoginPanel.vue'
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('../../assets/images/login-bg.svg');
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
