<template>
  <div>
    <div class="container">
      <h3 class="center">Добавить новый заказ</h3>

      <div class="row">
        <form class="col s12 m6 offset-m3" @submit.prevent="adHandler">
          <div class="row">
            <div class="input-field col s12">
              <input
                  id="title"
                  type="text"
                  v-model.trim="title"
                  :class="{invalid: $v.title.$dirty && !$v.title.required}"
              >
              <label for="title">Заголовок</label>
              <span
                  class="error"
                  v-if="$v.title.$dirty && !$v.title.required"
              >
              Введите заголовок
            </span>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                  id="alias"
                  type="text"
                  v-model.trim="alias"
                  :class="{invalid: $v.alias.$dirty && !$v.alias.required}"
              >
              <label for="alias">Алиас</label>
              <span
                  class="error"
                  v-if="$v.alias.$dirty && !$v.alias.required"
              >
              Введите алиас
            </span>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <textarea
                  class="materialize-textarea"
                  id="desc"
                  type="text"
                  v-model.trim="description"
                  :class="{invalid: $v.description.$dirty && !$v.description.required}"
              ></textarea>
              <label for="desc">Текст</label>
              <span
                  class="error"
                  v-if="$v.description.$dirty && !$v.description.required"
              >
              Введите текст
            </span>
            </div>
          </div>

          <!-- Загрузка картинки -->
          <div class="file-field input-field">
            <div class="btn blue darken-1">
              <span>Файл</span>
              <input type="file" @change="loadImgMet" accept="image/*">
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text">
            </div>
            <span
                class="error"
                v-if="$v.imgSrc.$dirty && !$v.imgSrc.required"
            >
              Добавьте картинку
            </span>
          </div>

          <div style="margin-bottom: 30px;">
            <img :src="imgSrc" height="150" alt="" v-if="imgSrc">

            <div class="switch">
              <div>Добавить в слайдер на главной?</div>
              <label>
                Нет
                <input type="checkbox" v-model="promo">
                <span class="lever"></span>
                Да
              </label>
            </div>
          </div>
          <!-- /Загрузка картинки -->

          <button
              class="btn waves-effect waves-light blue darken-1"
              :disabled="LOADING"
              type="submit"
          >
            Войти
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'NewAdd',
  metaInfo: {
    title: 'Добавить новый заказ',
  },
  data: () => ({
    title: '',
    alias: '',
    description: '',
    promo: false,
    image: null,
    imgSrc: '',
  }),
  validations: {
    title: {
      required,
    },
    alias: {
      required,
    },
    description: {
      required,
    },
    imgSrc: {
      required,
    },
  },
  computed: {
    ...mapGetters('globals', {
      LOADING: 'getLoading',
    }),
  },
  methods: {
    ...mapActions('ads', {
      CREATE_ADS: 'createAds',
    }),
    async adHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }

      const dataForm = {
        title: this.title,
        alias: this.alias,
        description: this.description,
        image: this.image,
        promo: this.promo,
      };

      try {
        await this.CREATE_ADS(dataForm);
        this.$router.push({
          name: 'List',
        });
      }
      catch (error) {
        console.log(error);
      }
    },
    loadImgMet (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.imgSrc = reader.result;
        };
        reader.readAsDataURL(file);
        this.image = file;
      }
      else {
        this.imgSrc = '';
      }
    },
  },
};
</script>

<style scoped>
.switch label input[type=checkbox]:checked + .lever:after {
  background-color: #1E88E5;
}

.switch label .lever:before {
  background-color: rgba(30, 136, 229, 0.15);
}

.switch label input[type=checkbox]:checked + .lever {
  background-color: rgba(30, 136, 229, 0.5);
}
</style>