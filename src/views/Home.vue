<template>
  <div>
    <div class="slider" ref="slider">
      <ul class="slides">
        <li
            v-for="ad of ADS_PROMO"
            :key="ad.id"
        >
          <img :src="ad.imgSrc">
          <div class="caption center-align">
            <h3>{{ ad.title }}</h3>
            <h5 class="light grey-text text-lighten-3">{{ ad.description }}</h5>
          </div>
          <router-link
              class="waves-effect waves-light btn-small blue darken-1 sliderLink"
              :to="`/ad/${ad.alias}`"
          >
            {{ ad.title }}
          </router-link>
        </li>
      </ul>
    </div>

    <div class="container">
      <div class="row">
        <div
            class="col s12 m6 l4"
            v-for="ad of ADS"
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
              <router-link class="waves-effect btn-flat" :to="`/ad/${ad.alias}`">Открыть</router-link>
              <ByModal
                  bg="cyan"
                  :ad="ad"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

let slider = null;

export default {
  name: 'Home',
  metaInfo: {
    title: 'Главная',
  },
  computed: {
    ...mapGetters('ads', {
      ADS: 'ads',
      ADS_PROMO: 'promoAds',
    }),
  },
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
  display: flex;
  justify-content: flex-end;
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