<template>
  <div class="overview">
    <Card title="关于">
      <template #content>
        <div class="c-left">
          <div>
            RainCMS 是基于 Vue3、Vuex、VueRouter、Vite、 ElementPlus
            、TypeScript、Echart5 等后台系统解决方案。
          </div>
        </div>
      </template>
    </Card>
    <el-row :gutter="12" class="el-row">
      <el-col :span="12">
        <Card title="技术栈" class="margin-t12 card-left">
          <template #content>
            <div class="c-left">
              <ul>
                <template v-for="item in technologyStacks" :key="item.title">
                  <li class="item-tech">
                    <span>{{ item.title }}</span>
                    <el-link type="primary">{{ item.desp }}</el-link>
                  </li>
                </template>
              </ul>
            </div>
          </template>
        </Card>
      </el-col>
      <el-col :span="12">
        <Card title="主要依赖" class="margin-t12 card-right">
          <template #content>
            <Descriptions
              :dependencies="dependencies"
              :column="2"
            ></Descriptions>
          </template>
        </Card>
        <Card title="联系信息" class="margin-t12 card-right">
          <template #content>
            <div class="c-left">
              <div class="content-item">
                <el-icon>
                  <el-icon-promotion />
                </el-icon>
                项目地址:
                <el-link href="https://github.com/Amenoe/vue3-ts-cms">
                  https://github.com/Amenoe/vue3-ts-cms
                </el-link>
              </div>
              <div class="content-item margin-t10">
                <el-icon><el-icon-userFilled /></el-icon>
                QQ邮箱: 370343459@qq.com
              </div>

              <div class="content-item margin-t10">
                <el-icon><el-icon-comment /></el-icon>
                Gmail: yuyi370343459@Gmail.com
              </div>
            </div>
          </template>
        </Card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import Card from '@/baseui/card/card.vue'
import Descriptions from '@/baseui/descriptions/descriptions.vue'
import { technologyStacks } from './config/technology-stack'
import { dependencies } from './config/dependencies'
</script>

<style scoped lang="less">
.c-left {
  text-align: left;
}
.margin-t12 {
  margin-top: 12px;
}

.el-row {
  display: flex;
  flex-flow: wrap;
  .card-left {
    height: 100%;
    padding-bottom: 12px;
    .item-tech {
      margin-bottom: 8px;
      span {
        margin-right: 16px;
      }
    }
  }
  .card-right {
    height: 50%;
  }
}

.content-item {
  line-height: 32px;
  font-size: 16px;
  .el-icon {
    top: 1px;
  }
  .el-link {
    font-size: 16px;
    margin-bottom: 3px;
  }
}
</style>
