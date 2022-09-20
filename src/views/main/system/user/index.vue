<template>
  <div class="user">
    <div class="search">
      <SearchForm v-bind="formConfig" />
    </div>
    <div class="content"></div>
  </div>
</template>

<script setup lang="ts">
import type { IForm } from '@/components/type'
const formConfig: IForm = {
  formItems: [
    { label: '用户名', type: 'input', placeholder: '请输入用户名' },
    { label: '密码', type: 'password', placeholder: '请输入密码' },
    {
      label: '喜欢的运动',
      type: 'select',
      placeholder: '请选择喜欢的运动',
      options: [
        { label: '跑步', value: 'runing' },
        { label: '足球', value: 'football' }
      ]
    },
    {
      label: '创建时间',
      type: 'datepicker',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  labelWidth: '100px'
}
</script>

<style scoped lang="less"></style>
