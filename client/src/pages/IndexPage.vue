<template>
  <q-page class="row items-center justify-evenly">
    <pre>
      {{ data }}
    </pre>
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script setup lang="ts">
import { Todo, Meta } from 'components/models'
import ExampleComponent from 'components/ExampleComponent.vue'
import { ref } from 'vue'

const { api } = useFeathers()

const params = computed(() => {
  return { query: { $limit: 10, $skip: 0 } }
})
const { data } = api.service('meals').useFind(params, { immediate: true, paginateOn: 'hybrid' })

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1'
  },
  {
    id: 2,
    content: 'ct2'
  },
  {
    id: 3,
    content: 'ct3'
  },
  {
    id: 4,
    content: 'ct4'
  },
  {
    id: 5,
    content: 'ct5'
  }
])
const meta = ref<Meta>({
  totalCount: 1200
})
</script>
