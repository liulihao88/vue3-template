<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <el-tag class="m-r-8" type="primary">Tag 1</el-tag>
    <el-tag class="m-r-8" type="success">Tag 2</el-tag>
    <el-tag class="m-r-8" type="info">Tag 3</el-tag>
    <el-tag class="m-r-8" type="warning">Tag 4</el-tag>
    <el-tag class="m-r-8" type="danger">Tag 5</el-tag>
    <br />
    <el-tag effect="dark" class="m-r-8" type="primary">Tag 1</el-tag>
    <el-tag effect="dark" class="m-r-8" type="success">Tag 2</el-tag>
    <el-tag effect="dark" class="m-r-8" type="info">Tag 3</el-tag>
    <el-tag effect="dark" class="m-r-8" type="warning">Tag 4</el-tag>
    <el-tag effect="dark" class="m-r-8" type="danger">Tag 5</el-tag>
  </div>
</template>
