<template>
  <div class="login-phone">
    <el-form
      class="login-form"
      ref="loginRef"
      :rules="loginRules"
      :model="loginForm"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="loginForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="login-code">
          <el-input v-model="loginForm.code"></el-input>
          <el-button class="code-button" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
const loginForm = reactive({
  phone: '',
  code: ''
})

const loginRef = ref<FormInstance>() //拿到表单实例
//自定义校验规则
const loginRules = {
  phone: [
    //分别是：是否必须，提示信息，触发时机
    { required: true, trigger: 'blur', message: '请输入您的账号' },
    {
      pattern: /^[A-Za-z0-9]{3,10}$/,
      trigger: 'blur',
      message: '请输入3到10位字母或数字'
    }
  ],
  code: [
    { required: true, trigger: 'blur', message: '请输入您的密码' },
    {
      pattern: /^[A-Za-z0-9]{3,10}$/,
      trigger: 'blur',
      message: '请输入3到10位字母或数字'
    }
  ]
}

const loginAction = () => {
  //el-form的验证，通过返回true，不通过返回false
  loginRef.value?.validate((valid) => {
    if (valid) {
      //2. 开始登录验证
      console.log('手机登录')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style scoped lang="less">
.login-code {
  display: flex;
  .code-button {
    margin-left: 8px;
  }
}
</style>
