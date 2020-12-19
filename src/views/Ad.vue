<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m8 offset-m2 wrapperCard">
        <div class="card">
          <div class="card-image">
            <img src="https://i.7fon.org/1000/x86444.jpg" alt="">
            <span class="card-title">This is our big Tagline!</span>
          </div>
          <div class="card-content">
            <p>Here our small slogan.</p>
          </div>
          <div class="card-action">
            <router-link :to="'#'" class="waves-effect waves-light btn blue darken-1 btn-flat white-text">Редактировать</router-link>
            <router-link :to="'#'" class="waves-effect waves-light btn teal darken-3">Купить</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ad',
  metaInfo () {
    return {
      title: this.ads[0].title,
    };
  },
  data: () => ({
    ads: [
      {
        id: 1,
        imgSrc: 'https://i.7fon.org/1000/x86444.jpg',
        title: 'This is our big Tagline!',
        description: 'Here our small slogan.',
        promo: true,
      }
    ],
  }),
};
</script>

<style scoped>
.wrapperCard {
  margin-top: 50px;
}

.card-action {
  display: flex;
  justify-content: flex-end;
}

.card-action a {
  margin-left: 10px;
}

@media (max-width: 320px) {
  .card-action {
    flex-direction: column;
  }

  .card-action a {
    margin-left: 0;
    margin-bottom: 10px;
  }
}
</style>