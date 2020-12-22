<template>
  <div class="container">
    <h3 class="center">Мои объявления</h3>

    <div v-if="!ADS.length">
      <h5 class="center">У Вас пока нет объявлений</h5>
    </div>

    <div class="wrapperCollection" v-else>
      <div class="collection__item"
           v-for="ad of ADS"
           :key="ad.id"
      >
        <div class="collection__img">
          <img :src="ad.imgSrc" :alt="ad.title">
        </div>
        <div class="collection__title">
          <h5 class="title">{{ ad.title }}</h5>
          <p>{{ ad.description }}</p>
        </div>
        <div class="collection__but">
          <router-link :to="`/ad/${ad.alias}`" class="waves-effect waves-light btn blue darken-1">Открыть</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AdList',
  metaInfo: {
    title: 'Мои объявления',
  },
  computed: {
    ...mapGetters('ads', {
      ADS: 'myAds',
    }),
  },
};
</script>

<style scoped>
.wrapperCollection {
  margin-top: 60px;
}

.collection__item {
  display: flex;
  align-items: center;
  box-shadow: 0 0 8px 0 #cccccc;
  margin-bottom: 10px;
}

.collection__img {
  position: relative;
  flex-shrink: 0;
  width: 300px;
  height: 150px;
  display: block;
  margin-right: 20px;
}

.collection__img img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.collection__title {
  height: 150px;
  overflow: hidden;
}

.collection__but {
  padding-right: 50px;
  margin-left: auto;
}
</style>