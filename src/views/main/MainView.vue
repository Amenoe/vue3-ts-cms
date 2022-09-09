<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '200px'"> <NavMenu /> </el-aside>
      <el-container class="page">
        <el-header class="page-header"> <NavHeader /> </el-header>
        <el-main class="page-content">
          Main
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import NavMenu from '@/components/nav-menu/index.vue'
import NavHeader from '@/components/nav-header/index.vue'
let isCollapse = ref(false)
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .main-content,
  .page {
    height: 100%;
  }
  .page-content {
    height: calc(100% - 48px);
  }
  .el-header,
  .el-footer {
    display: flex;
    color: #333;
    text-align: center;
    align-items: center;
  }
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  transition: width 0.3s linear;
}
.el-main {
  color: #333;
  text-align: center;
  background-color: @primary-light-9;
}
</style>
