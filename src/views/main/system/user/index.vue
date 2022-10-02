<template>
  <div class="user">
    <div class="search">
      <SearchForm v-bind="SearchFormConfig" v-model="formData">
        <template #footer>
          <div class="search-footer">
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button icon="el-icon-refresh">重置</el-button>
          </div>
        </template>
      </SearchForm>
    </div>
    <div class="content">
      <PageTable v-bind="pageTableConfig" @tableSelect="tableSelect">
        <!-- header中的插槽 -->
        <template #headerHandler>
          <el-button
            plain
            @click="handlerNewUser"
            type="primary"
            icon="el-icon-plus"
            >新增</el-button
          >
          <el-button plain @click="handlerRefresh" icon="el-icon-refresh"
            >刷新</el-button
          >
        </template>
        <!-- 列中的插槽 -->
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
        <template #handler>
          <div class="handle-btn">
            <el-button icon="el-icon-edit" size="small" type="text"
              >编辑</el-button
            >
            <el-button icon="el-icon-delete" size="small" type="text"
              >删除</el-button
            >
          </div>
        </template>
      </PageTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISearchForm, IPageTable } from '@/components/type'
import useSystemStore from '@/stores/modules/system'
import PageTable from '@/components/page-table/index.vue'

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

//接收回传的数据
const formData = ref({
  id: '',
  name: '',
  password: '',
  sport: '',
  createTime: ''
})
//搜索组件的配置
const SearchFormConfig: ISearchForm = {
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

//列表的配置
const pageTableConfig: IPageTable = {
  listData: userList.value,
  propList: [
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
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '200',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '150', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: false,
  title: '用户列表'
}

//处理列表子组件返回的数据
const tableSelect = (selection: any) => {
  console.log(selection)
}
//新建用户
const handlerNewUser = () => {
  console.log('click new user')
}
//刷新列表
const handlerRefresh = () => {
  console.log('click refresh')
}
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
  .handle-btn .el-button {
    margin-left: 0px;
  }
}
</style>
