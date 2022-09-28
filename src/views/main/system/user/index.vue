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
    <div class="content">
      <PageTable :list-data="userList" :prop-list="propList">
        <template #status="scope">
          <el-button
            plain
            size="small"
            :type="scope.row.enable ? 'success' : 'danger'"
            >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
          >
        </template>
        <template #createAt="scope">
          <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
        </template>
        <template #updateAt="scope">
          <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
        </template>
      </PageTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IForm } from '@/components/type'
import useSystemStore from '@/stores/modules/system'
import PageTable from '@/components/page-table/index.vue'

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

const userList = computed(() => systemStore.userList)
const userCount = computed(() => systemStore.userCount)

//表格列表的数据 props是表格列对应的值，label是表格的列的标题，minWidth是最小宽度
const propList = [
  { prop: 'name', label: '用户名', minWidth: '100' },
  { prop: 'realname', label: '姓名', minWidth: '100' },
  { prop: 'cellphone', label: '手机号', minWidth: '120' },
  { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
  {
    prop: 'createAt',
    label: '创建时间',
    minWidth: '200',
    slotName: 'createAt'
  },
  { prop: 'updateAt', label: '更新时间', minWidth: '200', slotName: 'updateAt' }
]
</script>

<style scoped lang="less">
.search {
  padding: 20px;
}
.search-footer {
  text-align: right;
  margin-right: 40px;
}
.content {
  padding: 20px;
}
</style>
