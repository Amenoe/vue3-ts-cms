<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <NavMenu :collapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <NavHeader @foldChange="handleFoldChange" />
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view v-slot="{ Component, route }">
              <transition
                name="fade-transform"
                mode="out-in"
                enter-from-class="fade-transform-enter"
              >
                <keep-alive>
                  <component :is="Component" :key="route.path"></component>
                </keep-alive>
              </transition>
            </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
let isCollapse = ref(false)

const handleFoldChange = (isFold: boolean) => {
  isCollapse.value = isFold
}
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
    .page-content {
      height: calc(100% - 48px);
      .page-info {
        border-radius: 6px;
      }
    }
    .el-header,
    .el-footer {
      display: flex;
      color: #333;
      text-align: center;
      align-items: center;
    }
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
  background-color: @aside-back-color;
}
.el-main {
  color: #333;
  text-align: center;
  background-color: @primary-light-9;
}
</style>
