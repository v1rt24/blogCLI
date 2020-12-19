<template>
  <div>
    <div class="slider" ref="slider">
      <ul class="slides">
        <li
            v-for="ad of ads"
            :key="ad.id"
        >
          <img :src="ad.imgSrc">
          <div class="caption center-align">
            <h3>{{ ad.title }}</h3>
            <h5 class="light grey-text text-lighten-3">{{ ad.description }}</h5>
          </div>
          <router-link
              class="waves-effect waves-light btn-small blue darken-1 sliderLink"
              :to="`/ad/${ad.id}`"
          >
            {{ad.title}}
          </router-link>
        </li>
      </ul>
    </div>

    <div class="container">
      <div class="row">
        <div
            class="col s12 m6 l4"
            v-for="ad of ads"
            :key="ad.id"
        >
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" :src="ad.imgSrc">
            </div>
            <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">
              {{ ad.title }}
              <i class="material-icons right">more_vert</i>
            </span>
            </div>
            <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">
              {{ ad.title }}
              <i class="material-icons right">close</i>
            </span>
              <p>{{ ad.description }}</p>
            </div>
            <div class="card-action">
              <router-link class="waves-effect btn-flat" :to="`/ad/${ad.id}`">Открыть</router-link>
              <button class="waves-effect waves-light btn cyan">Купить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let slider = null;

export default {
  name: 'Home',
  metaInfo: {
    title: 'Главная',
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
        imgSrc: 'https://i.7fon.org/1000/c105373.jpg',
        title: 'This is our big Tagline!',
        description: 'Here our small slogan.',
        promo: true,
      },
      {
        id: 3,
        imgSrc: 'https://i.7fon.org/1000/x228850.jpg',
        title: 'This is our big Tagline!',
        description: 'Here our small slogan.',
        promo: true,
      },
      {
        id: 4,
        imgSrc: 'https://i.7fon.org/1000/g703543.jpg',
        title: 'This is our big Tagline!',
        description: 'Here our small slogan.',
        promo: false,
      },
      {
        id: 5,
        imgSrc: 'https://i.7fon.org/1000/m597877.jpg',
        title: 'This is our big Tagline!',
        description: 'Here our small slogan.',
        promo: true,
      },
    ],
  }),
  mounted () {
    slider = M.Slider.init(this.$refs.slider, {
      indicators: false,
    });
  },
  destroyed () {
    if (slider && slider.destroy) {
      slider.destroy();
    }
  },
};
</script>

<style scoped>
.card-image {
  height: 300px;
}

.card-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-action {
  text-align: right;
}

.card-action button {
  margin-left: 5px;
}

.sliderLink {
  position: absolute;
  left: 10%;
  bottom: 10%;
}

.card .card-action a:not(.btn):not(.btn-large):not(.btn-small):not(.btn-large):not(.btn-floating) {
  color: black;
}

@media (max-width: 576px) {
  .sliderLink {
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>