<template>
  <div class="container">
    <h1 class="center">Заказы</h1>

    <div v-if="!ORDERS.length">
      Заказов пока нет
    </div>

    <ul class="collection" v-else>
      <li class="collection-item"
          v-for="order of ORDERS"
          :key="order.id"
      >
        <div class="wrapperCollection">
          <label>
            <input type="checkbox" :checked="order.done" :disabled="order.done" @change="markDone(order)"/>
            <span>{{ order.name }}</span> /
            <span>{{ order.phone }}</span>
          </label>
          <router-link
              :to="`/ad/${order.alias}`"
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
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Orders',
  metaInfo: {
    title: 'Заказы',
  },
  computed: {
    ...mapGetters('orders', {
      ORDERS: 'getOrders',
    }),
  },
  methods: {
    ...mapActions('orders', {
      FETCH_ORDERS: 'fetchOrders',
      MARK_ORDER_DONE: 'markOrderDone',
    }),
    async markDone (order) {
      try {
        await this.MARK_ORDER_DONE(order.id);
        order.done = true;
      }
      catch (error) {
        console.log(error);
      }
    },
  },
  async created () {
    try {
      await this.FETCH_ORDERS();
    }
    catch (error) {
      console.log(error);
    }
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