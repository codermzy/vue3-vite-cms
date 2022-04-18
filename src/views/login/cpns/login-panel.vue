<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>

    <el-tabs v-model="currentTab" type="border-card" stretch>
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon><user-filled /></el-icon> 账号登录
          </span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane label="手机登录" name="phone">
        <template #label>
          <span>
            <el-icon><iphone /></el-icon>手机登陆
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link href="javascript:;" type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick">
      立即登陆
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import LoginAccount from './login-account.vue'

// 当前标签页
const currentTab = ref('account')
// 是否记住密码
const isKeepPassword = ref(true)
// account组件对象
const accountRef = ref<InstanceType<typeof LoginAccount>>()

const handleLoginClick = () => {
  accountRef.value?.loginAction(isKeepPassword.value)
}
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;
  padding: 15px;

  .title {
    text-align: center;
  }
  .account-control {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
