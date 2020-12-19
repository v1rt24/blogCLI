<template>
  <div class="container">
    <h3 class="center">Мои объявления</h3>

    <div class="wrapperCollection">
      <div class="collection__item"
           v-for="ad of ads"
           :key="ad.id"
      >
        <div>
          <img :src="ad.imgSrc" :alt="ad.title">
        </div>
        <div class="collection__title">
          <h5 class="title">{{ ad.title }}</h5>
          <p>{{ ad.description }}</p>
        </div>
        <div class="collection__but">
          <router-link :to="`/ad/${ad.id}`" class="waves-effect waves-light btn blue darken-1">Открыть</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdList',
  metaInfo: {
    title: 'Мои объявления',
  },
  data: () => ({
    ads: [
      {
        id: 1,
        imgSrc: 'https://i.7fon.org/1000/x86444.jpg',
        title: 'This is our big Tagline!',
        description: 'Here our small slogan.',
        promo: true,
      },
      {
        id: 2,
        imgSrc: 'https://i.7fon.org/1000/x86444.jpg',
        title: 'This is our big Tagline!',
        description: 'Here our small slogan.',
        promo: true,
      },
    ],
  }),
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

.collection__item img {
  height: 150px;
  display: block;
  margin-right: 20px;
}

.collection__but {
  padding-right: 50px;
  margin-left: auto;
}
</style>