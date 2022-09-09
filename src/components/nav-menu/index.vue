<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="../../assets/image/logo.svg" alt="logo" />
      <span>RainCMS</span>
    </div>
    <el-menu default-active="2" class="el-menu-vertical">
      <!-- 所有的菜单数据 -->
      <template v-for="item in userMenu" :key="item.id">
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
              <el-menu-item :index="String(subitem.id)">
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

const loginStore = useLoginStore()
const userMenu = computed(() => {
  return loginStore.userMenu
})

//获取图标
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
  background-color: rgb(41, 45, 67);

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
  background-color: rgb(41, 45, 67);
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
  background-color: rgba(31, 34, 51);
  color: rgba(255, 255, 255); //这个竟然变的是箭头的颜色
}

.el-sub-menu {
  // 二级菜单
  .el-menu-item {
    padding-left: 50px !important;
    background-color: rgba(41, 45, 67);
    color: rgba(255, 255, 255, 0.7);
  }

  .el-menu-item:hover {
    background-color: rgba(31, 34, 51);
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
    color: @primary-color !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
