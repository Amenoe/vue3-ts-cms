<template>
  <div class="login"><LoginPanelVue /></div>
</template>

<script setup lang="ts">
/*import request from '@/service'
import { onMounted } from 'vue'
onMounted(() => {
  request
    .request({
      url: '/home/multidata',
      method: 'GET',
      showLoading: true
    })
    .then((res) => {
      console.log(res)
    })
})*/
import LoginPanelVue from './cpns/LoginPanel.vue'
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('../../assets/image/login-bg.svg');
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
