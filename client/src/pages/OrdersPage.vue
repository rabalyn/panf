<template>
  <q-page>
    <q-card
      v-for="order in activeOrders"
      :key="order.id"
    >
      <q-card-section>
        <q-btn
          :icon="order.isActive ? 'spinner' : 'no'"
          :label="new Date(order.orderdate).toLocaleDateString()"
          @click="push({ path: `/orders/${order.id}`})"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
const { api } = useFeathers()
const { push, currentRoute } = useRouter()
console.log(currentRoute)
const ordersParams = computed(() => {
  return {
    query: {
      isActive: 1
    }
  }
})
const { data: activeOrders } = api.service('orders').useFind(ordersParams, { immediate: true, paginateOn: 'hybrid' })
</script>

<style>
</style>

<i18n>
{
  de: {

  },
  en: {

  }
}
</i18n>
