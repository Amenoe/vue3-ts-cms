<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="../../assets/images/logo.svg" alt="logo" />
      <span v-if="!collapse">RainCMS</span>
    </div>
    <!-- 如果菜单的项太多，可以设置unique-opened -->
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical"
      background-color="#2f344e"
      :collapse="props.collapse"
      unique-opened
      active-text-color="#409eff"
    >
      <!-- 所有的菜单数据 -->
      <template v-for="item in userMenus" :key="item.id">
        <!-- 拿到一级标签，该标签还有子标签 -->
        <template v-if="item.type === 1">
          <!-- 包含子标签的组件,可以通过插槽显示标题 -->
          <el-sub-menu :index="String(item.id)">
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span class="title">{{ item.name }}</span>
            </template>
            <!-- 获取二级标签，该标签还是包含子标签 -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="String(subitem.id)"
                @click="handleItemClick(subitem)"
              >
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 如果直接拿到二级标签，那就直接显示 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="String(item.id)">
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/stores/modules/login'
import { useRouter, useRoute } from 'vue-router'
import { pathMapToMenu } from '@/utils/mapMenus'
//接收父组件传的数据
const props = defineProps({
  //是否折叠
  collapse: {
    type: Boolean,
    require: true
  }
})
const router = useRouter()
const route = useRoute()
const currentPath = route.path

//store
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
//data
//根据当前的url匹配路由，修改侧边栏的默认选中
const currentMenu = pathMapToMenu(userMenus, currentPath)
console.log(currentMenu)
const defaultActive = ref(String(currentMenu.id))

//methods
const handleItemClick = (item: any) => {
  defaultActive.value = item.id + ''
  router.push({ path: item.url ?? '/404' })
}
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
}

.logo {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  height: 28px;
  padding: 12px 10px 8px 10px;
  background-color: #2f344e;

  img {
    height: 100%;
    margin: 0 10px;
  }

  span {
    color: white;
    font-weight: 700;
    font-size: 16px;
  }
}

// 菜单
.el-menu {
  border-right: none;
}
//一级菜单
:deep(.el-sub-menu__title) {
  color: rgba(255, 255, 255, 0.7); //一级菜单的箭头颜色
  // 一级菜单标题的颜色
  .title {
    color: rgba(255, 255, 255, 0.7);
  }
}

//一级菜单hover时的高亮，color改变的是箭头的颜色
:deep(.el-sub-menu__title:hover) {
  background-color: #292d43;
  color: rgba(255, 255, 255); //这个竟然变的是箭头的颜色
}

.el-sub-menu {
  // 二级菜单
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #232638;
    color: rgba(255, 255, 255, 0.7);
  }

  .el-menu-item:hover {
    background-color: #1c1f2e;
  }
}

//选中后变色
.el-sub-menu.is-active {
  //选中后一级菜单文字变色
  .el-sub-menu__title .title {
    color: rgba(255, 255, 255);
  }
  //选中后二级菜单文字变色
  .el-menu-item.is-active {
    color: @primary-color;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}

//折叠时二级菜单
.el-menu--popup .el-menu-item {
  color: rgba(255, 255, 255, 0.7);
}
.el-menu--popup .el-menu-item.is-active {
  color: @primary-color;
}
</style>
