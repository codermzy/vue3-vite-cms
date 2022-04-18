<template>
  <div class="login-account">
    <el-form ref="formRef" label-width="60px" :rules="rules" :model="account">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'Element-plus'

import { useUserStore } from '@/store/modules/user'

import { rules } from './config/account-config'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? '',
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const userStore = useUserStore()

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        // 1.判断用户名和密码
        if (valid) {
          // 1.判断用户是否选中记住密码
          if (isKeepPassword) {
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // 2.执行登陆逻辑
          userStore.accountLoginAction({ ...account })
        }
      })
    }

    return {
      account,
      formRef,
      rules,
      loginAction,
    }
  },
})
</script>

<style scoped></style>
