<template>
  <div>
    <h2>这里是登录页面</h2>
    <button @click="add">+1</button>
    {{ store.count }}
    <button @click="sub">-1</button>
    <button @click="getData">发送请求</button>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/stores/index'
import rainRequest from '@/service'
const store = useStore() //返回store实例，在模板中使用
const add = () => {
  store.increment()
}
const sub = () => {
  store.count--
}
const getData = () => {
  rainRequest.request({
    url: '/home/multidata',
    method: 'GET',
    interceptors: {
      requestInterceptor: (config) => {
        console.log('单独请求的config')
        return config
      }
    }
  })
}
</script>

<style lang="less" scoped>
@fontSize: 30px;
@fontColor: yellow;

h2 {
  font-size: @fontSize;
  color: @fontColor;
}
</style>
