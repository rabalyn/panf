<template>
  <q-page>
    <h4 class="text-h4 q-ma-md">Speisekarte</h4>
    <div class="row">
      <q-input
        class="cols q-ma-md"
        label="orderdate"
        type="date"
        v-model="orderdate"
      />
      <q-input
        class="cols q-ma-md"
        label="pickuptime"
        type="text"
        v-model="pickuptime"
      />

      <q-input
        class="q-ma-md"
        label="collector"
        type="text"
        v-model="collector"
      />
      <q-input
        class="q-ma-md"
        label="caller"
        type="text"
        v-model="caller"
      />
    </div>

    <q-separator class="q-ma-md" />

    <pre>{{ order }}</pre>
    <div class="row">
      <q-input
        class="cols q-ma-md"
        label="Name"
        type="text"
        v-model="basket.name"
      />
    </div>

    <div class="row">
      <div class="cols">
        <h6 class="text-h6 q-ma-md">Speisen</h6>
        <q-btn
          v-for="meal in meals"
          :key="meal.id"
          class="q-ma-md"
          ripple
          no-caps
          @click="addMealToBasket(meal)"
        >
          {{ getMealTypeIcon(meal.type) }}
          {{ t(meal.nameI18nKey) }}: {{  formatPrice(meal.priceInCents) }}
        </q-btn>
      </div>
    </div>

    <div class="row">
      <div class="cols">
        <h6 class="text-h6 q-ma-md">Extras</h6>
        <q-btn
          v-for="ingredient in ingredients"
          :key="ingredient.id"
          class="q-ma-md"
          ripple
          no-caps
          @click="addExtraToBasket(ingredient)"
        >
          {{ t(ingredient.nameI18nKey) }}: {{  formatPrice(ingredient.priceInCents) }}
        </q-btn>
      </div>
    </div>

    <div class="row q-ma-md">
      <q-btn
        label="Bestellen"
        @click="createOrder(basket)"
      />
    </div>

    <div class="row">
      <pre>{{ orderedMeals }}</pre>
      <pre>{{ basket }}</pre>

      <div v-if="orderedMeals.length">
        <div
          v-for="orderMeal in orderMeals"
          :key="orderMeal.id"
        >
          {{ getNameOfMeal(orderMeal) }}
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import type { Meals as TMeals, Ingredients as TIngredients } from 'api'
import { formatPrice } from '../lib/utils/formatPrice'
import { getMealTypeIcon } from '../lib/utils/getMealTypeIcon'
import { ServiceInstance } from 'feathers-pinia/dist'
import { Orders as TOrders, OrdersMeals as TOrdersMeals } from 'api'
const { api } = useFeathers()
const { t } = useI18n()
const { currentRoute } = useRouter()

const orderId = computed(() => {
  if (currentRoute?.value?.params?.id && typeof currentRoute?.value?.params?.id === 'string') {
    return currentRoute?.value?.params?.id
  }
})

const orderMealsParams = computed(() => {
  return {
    query: { orderId }
  }
})
const { data: orderMeals } = api.service('orders-meals').useFind(orderMealsParams, { paginateOn: 'hybrid' })

const orderMealIds = computed(() => orderMeals.value.map((x: TOrdersMeals) => x.mealId))
const orderedMealsParams = computed(() => {
  return {
    query: {
      id: {
        $in: orderMealIds
      }
    }
  }
})
const { data: orderedMeals } = api.service('meals').useFind(orderedMealsParams, { paginateOn: 'hybrid' })

const getNameOfMeal = (orderMeal: TOrdersMeals) => {
  const meals = orderedMeals.value.filter((x: TOrdersMeals) => x.id === orderMeal.mealId)
  return t(meals[0].nameI18nKey)
}

const orderdate = ref('')
const pickuptime = ref('')
const caller = ref('')
const collector = ref('')

// @ts-expect-error id is fine
const { data: order } = api.service('orders').useGet(orderId)
watch(order, () => {
  if (order.value.orderdate) {
    orderdate.value = order.value.orderdate
  }
  if (order.value.pickuptime) {
    pickuptime.value = order.value.pickuptime
  }
  if (order.value.caller) {
    caller.value = order.value.caller
  }
  if (order.value.collector) {
    collector.value = order.value.collector
  }
})

watch(orderdate, () => {
  console.log(orderdate)
  order.value.orderdate = new Date(orderdate.value).valueOf()
  order.value.save()
})

onMounted(() => {
  if (!pickuptime.value) {
    pickuptime.value = '12:00'
  }
  if (!orderdate) {
    // @ts-expect-error foo
    orderdate.value = new Date()
  }
})

watch(pickuptime, () => {
  console.log(pickuptime)
  const date = new Date()
  date.setHours(parseInt(pickuptime.value.split(':')[0]))
  date.setMinutes(parseInt(pickuptime.value.split(':')[1]))
  if (order.value) {
    order.value.pickuptime = date.valueOf()
    order.value.save()
  }
})
watch(caller, () => {
  console.log(caller)
  order.value.caller = caller
  order.value.save()
})
watch(collector, () => {
  console.log(collector)
  order.value.collector = collector
  order.value.save()
})

type TBasket = {
  name: string,
  meal: ServiceInstance<TMeals> | undefined,
  extras: ServiceInstance<TIngredients>[],
  nextras: ServiceInstance<TIngredients>[]
}
const basket = ref<TBasket>({
  name: '',
  meal: undefined,
  extras: [],
  nextras: []
})

const params = computed(() => {
  return { query: { $limit: 10, $skip: 0 } }
})
const { data: meals } = api.service('meals').useFind(params, { immediate: true, paginateOn: 'hybrid' })

const ingredientParams = computed(() => {
  return { query: { $limit: 100, $skip: 0 } }
})
const { data: ingredients } = api.service('ingredients').useFind(ingredientParams, { immediate: true, paginateOn: 'hybrid' })

const addMealToBasket = async (meal: ServiceInstance<TMeals>) => {
  basket.value.meal = meal
}

const addExtraToBasket = (ingredient: ServiceInstance<TIngredients>) => {
  basket.value.extras.push(ingredient)
}

const createOrder = async (basket: TBasket) => {
  console.log(basket)
  const OrdersMeals = api.service('orders-meals')
  const myMealOrder: ServiceInstance<TOrdersMeals> = OrdersMeals.new({
    mealId: basket?.meal?.id,
    orderId
  })

  try {
    myMealOrder.save()
  } catch (error) {
    console.error(error)
  }
}
</script>

<style>
</style>

<i18n>
{
  de: {
    margherita: 'Margherita',
    salami: 'Salami',

    caesar: 'Caesar Salat',

    cheese: 'Käse',
    onion: 'Zwiebeln'
  },
  en: {
    margherita: 'Margherita',
    salami: 'Salami',

    caesar: 'Caesar Salad',

    cheese: 'Cheese',
    onion: 'Onions'
  }
}
</i18n>
