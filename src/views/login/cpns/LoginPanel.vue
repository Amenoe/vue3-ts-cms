<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><el-icon-user-filled /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <LoginAccount ref="accountRef"></LoginAccount>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <el-icon><el-icon-iphone /></el-icon>
          <span>手机登录</span>
        </template>
        <LoginPhone ref="phoneRef"></LoginPhone>
      </el-tab-pane>
    </el-tabs>
    <div class="login-option">
      <el-checkbox
        class="remember-psw"
        label="记住密码"
        v-model="rememberPsw"
      />
      <el-link class="forget-psw" type="primary">忘记密码?</el-link>
    </div>
    <el-button type="primary" class="login-button" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import LoginAccount from './LoginAccount.vue'
import LoginPhone from './LoginPhone.vue'

import LocalCache from '@/utils/cache'
//定义属性
const rememberPsw = ref(LocalCache.getCache('rememberPsw'))
const currentTab = ref('account')

//获取子组件实例对象
const accountRef = ref<InstanceType<typeof LoginAccount>>()
const phoneRef = ref<InstanceType<typeof LoginPhone>>()

//登录按钮调用子组件方法
const handleLoginClick = () => {
  if (currentTab.value === 'account') {
    accountRef.value?.loginAction(rememberPsw.value)
  } else {
    phoneRef.value?.loginAction()
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 320px;
  .title {
    text-align: center;
    color: #505050;
  }
  .demo-tabs {
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
  }
  .login-button {
    width: 100%;
    padding: 16px 0;
  }
}

.login-option {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;

  .forget-psw {
    color: @primary-color;
    font-size: @body-font-size;
  }
}
</style>
