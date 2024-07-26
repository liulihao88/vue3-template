<script setup>
import { OnClickOutside } from '@vueuse/components'

function close() {
  /* ... */
}
</script>

<template>
  <OnClickOutside @trigger="close">
    <div>Click Outside of Me</div>
  </OnClickOutside>
</template>
