<template>
  <div class="nav-header">
    <el-icon class="fold-icon" :class="isFold" @click="handleFoldClick">
      <component :is="isFold ? 'el-icon-fold' : 'el-icon-expand'"></component>
    </el-icon>
    <div class="content">
      <Breadcrumb :breadcrumb="breadcrumbs" class="nav-breadcrumb" />
      <div class="user-info">
        <el-dropdown trigger="click">
          <span>
            <el-avatar :size="22" :src="avatarUrl" />
            <el-icon class="el-icon--right">
              <el-icon-caret-bottom />
            </el-icon>
          </span>

          <template #dropdown>
            <el-dropdown-menu class="drop-menu">
              <span>{{ name }}</span>
              <el-dropdown-item divided>个人中心</el-dropdown-item>
              <el-dropdown-item>系统管理</el-dropdown-item>
              <el-dropdown-item divided @click="logout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/stores/modules/login'
import Breadcrumb from '@/baseui/breadcrumb/breadcrumb.vue'
import router from '@/router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import localCache from '@/utils/cache'
import { useMessageBox } from '@/hooks/useMessageBox'

//声明触发的事件
const emit = defineEmits(['foldChange'])

//store
const loginStore = useLoginStore()

const name = computed(() => {
  return loginStore.userInfo.name
})

//data
let isFold = ref(false)
const avatarUrl = ref(
  'https://avatars.githubusercontent.com/u/49900967?s=40&v=4'
)

//面包屑数据
//使用computed进行更新(依赖发生改变的时候，computed会重新计算)
const breadcrumbs = computed(() => {
  const userMenu = loginStore.userMenus
  const route = useRoute()
  const currentPath = route.path

  return pathMapBreadcrumbs(userMenu, currentPath)
})

//折叠事件,并发送给父组件
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}

const logout = () => {
  //弹出退出确认
  // ElMessageBox.confirm('确认注销并退出系统吗', '警告', {
  //   confirmButtonText: '确认',
  //   cancelButtonText: '取消',
  //   type: 'warning'
  // }).then(() => {
  //   localCache.clearCache()
  //   router.push('/main')
  // })
  useMessageBox('确定注销并退出系统吗', '警告')
    .then(() => {
      localCache.clearCache()
      router.push('/main')
      ElMessage.success('退出成功')
    })
    .catch(() => {
      ElMessage.info('取消退出')
    })
}
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-icon {
    font-size: 20px;
    cursor: pointer;
    margin-top: 2px;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 16px;
  }
}

.user-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  .el-icon--right {
    position: relative;
    bottom: 4px;
    right: 3px;
  }
}

.user-info:hover {
  .el-icon--right {
    color: black;
  }
}

.drop-menu:first-child {
  font-size: 14px;
  color: @primary-text;
  text-align: center;
  padding: 5px 0px;
}
</style>
