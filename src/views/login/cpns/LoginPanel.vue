<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><i-ep-user-filled /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <LoginAccount
          ref="accountRef"
          :rememberPsw="rememberPsw"
        ></LoginAccount>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <el-icon><i-ep-iphone /></el-icon>
          <span>手机登录</span>
        </template>
        <LoginPhone ref="phoneRef" :rememberPsw="rememberPsw"></LoginPhone>
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

const rememberPsw = ref(false)

//获取子组件实例对象
const accountRef = ref<InstanceType<typeof LoginAccount>>()
const phoneRef = ref<InstanceType<typeof LoginPhone>>()

//登录按钮调用子组件方法
const handleLoginClick = () => {
  accountRef.value?.loginAction(rememberPsw.value)
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 320px;
  margin-bottom: 120px;
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

  .forget-psw,
  .remember-psw {
    color: @primary-color;
    font-size: @body-font-size;
  }
}
</style>
