<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const objectCount = ref([])
const objectCount2 = ref([])
const objectSize = ref([])
const objectSize2 = ref([])

setTimeout(() => {
  objectCount.value = [
    {
      tenant: 'zhou',
      timeValue: [
        {
          time: '1751012011.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751033611.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751055211.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751076811.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751098411.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751120011.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751141611.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751163211.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751184811.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751206411.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751228011.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751249611.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751271211.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751292811.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751314411.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751336011.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751357611.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751379211.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751400811.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751422411.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751465611.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751487211.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751508811.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751530411.593',
          value: '42671',
          value2: '42671',
        },
      ],
    },
  ]

  objectCount2.value = [
    {
      tenant: 'zhou',
      timeValue: [
        {
          time: '1751012011.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751033611.593',
          value: '42671',
          value2: '42671',
        },
        {
          time: '1751055211.593',
          value: '42671',
          value2: '42671',
        },
      ],
    },
  ]

  objectSize.value = [
    {
      tenant: 'zhou',
      timeValue: [
        {
          time: '1751012001.593',
          value: '103441763540',
        },
        {
          time: '1751033611.593',
          value: '103441763540',
        },
        {
          time: '1751055211.593',
          value: '103441763540',
        },
        {
          time: '1751076811.593',
          value: '103441763540',
        },
        {
          time: '1751098411.593',
          value: '103441763540',
        },
        {
          time: '1751120011.593',
          value: '103441763540',
        },
        {
          time: '1751141611.593',
          value: '103441763540',
        },
        {
          time: '1751163211.593',
          value: '103441763540',
        },
        {
          time: '1751184811.593',
          value: '103441763540',
        },
        {
          time: '1751206411.593',
          value: '103441763540',
        },
        {
          time: '1751228011.593',
          value: '103441763540',
        },
        {
          time: '1751249611.593',
          value: '103441763540',
        },
        {
          time: '1751271211.593',
          value: '103441763540',
        },
        {
          time: '1751292811.593',
          value: '103441763540',
        },
        {
          time: '1751314411.593',
          value: '103441763540',
        },
        {
          time: '1751336011.593',
          value: '103441763540',
        },
        {
          time: '1751357611.593',
          value: '103441763540',
        },
        {
          time: '1751379211.593',
          value: '103441763540',
        },
        {
          time: '1751400811.593',
          value: '103441763540',
        },
        {
          time: '1751422411.593',
          value: '103441763540',
        },
        {
          time: '1751465611.593',
          value: '103441763540',
        },
        {
          time: '1751487211.593',
          value: '103441760',
        },
        {
          time: '1751508811.593',
          value: '103441763540',
        },
        {
          time: '1751530411.593',
          value: '103441763540',
        },
      ],
    },
  ]

  objectSize2.value = [
    {
      tenant: 'zhou',
      timeValue: [
        {
          time: '1751012001.593',
          value: '10344176340',
        },
        {
          time: '1751033611.593',
          value: '13441763540',
        },
        {
          time: '1751055211.593',
          value: '10344163540',
        },
      ],
    },
  ]
}, 0)
</script>

<template>
  <div>
    <gObjectLine :objectCount="objectCount" :objectSize="objectSize" class="h-400" />
    <br />
    <gObjectLine :objectCount="objectCount2" :objectSize="objectSize2" class="h-400" />
  </div>
</template>
