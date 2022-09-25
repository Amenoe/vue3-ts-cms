<template>
  <div class="user">
    <div class="search">
      <SearchForm v-bind="formConfig" v-model="formData">
        <template #footer>
          <div class="search-footer">
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button icon="el-icon-refresh">重置</el-button>
          </div>
        </template>
      </SearchForm>
    </div>
    <div class="content"></div>
  </div>
</template>

<script setup lang="ts">
import type { IForm } from '@/components/type'
import useSystemStore from '@/stores/modules/system'

const formData = ref({
  id: '',
  name: '',
  password: '',
  sport: '',
  createTime: ''
})
const formConfig: IForm = {
  formItems: [
    {
      field: 'id',
      label: 'id',
      type: 'input',
      placeholder: '请输入id'
    },
    {
      field: 'name',
      label: '用户名',
      type: 'input',
      placeholder: '请输入用户名'
    },
    {
      field: 'password',
      label: '密码',
      type: 'password',
      placeholder: '请输入密码'
    },
    {
      field: 'sport',
      label: '喜欢的运动',
      type: 'select',
      placeholder: '请选择喜欢的运动',
      options: [
        { label: '跑步', value: 'runing' },
        { label: '足球', value: 'football' }
      ]
    },
    {
      field: 'createTime',
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
//store
const systemStore = useSystemStore()
systemStore.getPageListAction({
  pageUrl: 'users/list',
  queryInfo: {
    offset: 0,
    size: 10
  }
})
</script>

<style scoped lang="less">
.search-footer {
  text-align: right;
  margin-right: 40px;
}
</style>
