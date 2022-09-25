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
      <el-form-item label="账号" prop="name">
        <el-input v-model="loginForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { encrypt, decrypt } from '@/utils/jsencrypt'
import localCache from '@/utils/cache'
import useLoginStore from '@/stores/modules/login'

import type { FormInstance } from 'element-plus'

const loginRef = ref<FormInstance>()

const loginForm = ref({
  name: '',
  password: ''
})

//自定义校验规则
const loginRules = {
  name: [
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
const loginAction = (rememberPsw: boolean) => {
  //el-form的验证，通过返回true，不通过返回false
  loginRef.value?.validate((valid) => {
    if (valid) {
      //1. 是否记住密码
      if (rememberPsw) {
        localCache.setCache('name', loginForm.value.name)
        localCache.setCache('password', encrypt(loginForm.value.password))
        localCache.setCache('rememberPsw', rememberPsw)
      } else {
        localCache.delCache('name')
        localCache.delCache('password')
        localCache.delCache('rememberPsw')
      }

      //2. 开始登录验证
      const loginStore = useLoginStore()
      loginStore.accountLoginRequestAction(loginForm.value)
    }
  })
}

//获取localStorage的值,设置到表单中
const setFormValue = () => {
  const name = localCache.getCache('name')
  const password = localCache.getCache('password')
  loginForm.value = {
    name: name === undefined ? loginForm.value.name : name,
    password:
      password === undefined
        ? loginForm.value.password
        : (decrypt(password) as string)
  }
}

setFormValue()

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped></style>
