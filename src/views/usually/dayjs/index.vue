<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import dayjs from 'dayjs'
const { proxy } = getCurrentInstance()
let now = dayjs(null)
</script>

<template>
  <o-flex direction="column">
    <div>
      {{ dayjs('2018-04-04T16:00:00.000Z').format() }}
    </div>
    <div>
      <div>
        {{ dayjs('2018-04-13 19:18:17.040+02:00').format() }}
      </div>
    </div>
    <div>
      {{ dayjs('2018-04-13 19:18').format() }}
    </div>
    <div>
      {{ dayjs('2019-01-25').add(1, 'day').subtract(1, 'year').format() }}
    </div>
  </o-flex>
</template>
