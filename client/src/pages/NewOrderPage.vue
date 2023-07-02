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
import { OrdersMeals as TOrdersMeals } from 'api'
const { api } = useFeathers()
const { t } = useI18n()
const { currentRoute } = useRouter()

const orderId = computed<string>(() => {
  if (currentRoute?.value?.params?.id) {
    return currentRoute?.value?.params?.id
  }
})

const orderMealsParams = computed(() => {
  return {
    query: { orderId }
  }
})
const { data: orderMeals } = api.service('orders-meals').useFind(orderMealsParams, { paginateOn: 'hybrid' })

const orderMealIds = computed(() => orderMeals.value.map(x => x.mealId))
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

const orderdate = ref()
const pickuptime = ref()
const caller = ref('')
const collector = ref('')

const { data: order } = api.service('orders').useGet(orderId)
console.log(order)
watch(orderdate, () => {
  console.log(orderdate)
})
watch(pickuptime, () => {
  console.log(pickuptime)
})
watch(caller, () => {
  console.log(caller)
})
watch(collector, () => {
  console.log(collector)
})

type TBasket = {
  name: string,
  meal: ServiceInstance<TMeals> | undefined,
  extras: ServiceInstance<TIngredients>[]
}
const basket = ref<TBasket>({
  name: '',
  meal: undefined,
  extras: []
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
