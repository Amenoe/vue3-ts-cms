<template>
  <div class="login-account">
    <!-- 通过model将loginForm的值给el-form用于校验，ref用于登录验证 -->
    <el-form
      class="login-form"
      :rules="loginRules"
      :model="loginForm"
      ref="loginRef"
    >
      <!-- label设置标签前面的文本，如果想自己设定label的宽度可以在el-form里设置label-width -->
      <el-form-item label="账号" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { off } from 'process'

const loginRef = ref<FormInstance>()

const loginForm = reactive({
  username: '',
  password: ''
})

//自定义校验规则
const loginRules = {
  username: [
    //分别是：是否必须，提示信息，触发时机
    { required: true, trigger: 'blur', message: '请输入您的账号' },
    {
      pattern: /^[A-Za-z0-9]{3,10}$/,
      trigger: 'blur',
      message: '请输入3到10位字母或数字'
    }
  ],
  password: [
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
      //为true执行登录
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped></style>
