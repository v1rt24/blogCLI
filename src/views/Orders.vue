<template>
  <div class="container">
    <h1 class="center">Заказы</h1>

    <ul class="collection">
      <li class="collection-item"
          v-for="order of orders"
          :key="order.id"
      >
        <div class="wrapperCollection">
          <label>
            <input type="checkbox" :checked="order.done" :disabled="order.done" @change="markDone(order)"/>
            <span>{{ order.name }}</span> /
            <span>{{ order.phone }}</span>
          </label>
          <router-link
              :to="`/ad/${order.adId}`"
              class="waves-effect waves-light btn-small blue darken-2 secondary-content"
          >
            Открыть
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Orders',
  metaInfo: {
    title: 'Заказы',
  },
  data: () => ({
    orders: [
      {
        id: 1,
        name: 'Роман',
        phone: '+79298134567',
        adId: '8',
        done: false,
      },
    ],
  }),
  methods: {
    markDone (order) {
      order.done = true;
    },
  },
};
</script>

<style scoped>
.wrapperCollection {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wrapperCollection span {
  color: black;
}

[type="checkbox"]:checked + span:not(.lever):before {
  border-right: 2px solid #1976d2;
  border-bottom: 2px solid #1976d2;
}
</style>