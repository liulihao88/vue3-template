<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

// defineOptions({
//   name: "Menu1-1"
// });
</script>

<template>
  <div class="dark:text-white">
    <el-button type="primary" @click="router.push({ name: 'Menu1-1' })">去到1-1</el-button>

    <el-tag>更改下面的代码下面的</el-tag>
    <pre>
      /** 过滤children长度为0的的目录，当目录下没有菜单时，会过滤此目录，目录没有赋予roles权限，当目录下只要有一个菜单有显示权限，那么此目录就会显示 */
function filterChildrenTree(data: RouteComponent[]) {
  const newTree = cloneDeep(data).filter(
    (v: any) => v?.children?.length !== 0 || v?.meta?.showLink !== false
  );
  newTree.forEach(
    (v: { children }) => v.children && (v.children = filterTree(v.children))
  );
  return newTree;
}
    </pre>
  </div>
</template>
