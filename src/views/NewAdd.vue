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

          <!---->
          <div class="file-field input-field">
            <div class="btn blue darken-1">
              <span>Файл</span>
              <input type="file" @change="loadImgMet">
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text">
            </div>
            <span
                class="error"
                v-if="$v.loadImg.$dirty && !$v.loadImg.required"
            >
              Добавьте картинку
            </span>
          </div>

          <div style="margin-bottom: 30px;">
            <img src="https://i.7fon.org/1000/m597877.jpg" height="150" alt="">

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
          <!---->

          <button class="btn waves-effect waves-light blue darken-1" type="submit">
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

export default {
  name: 'NewAdd',
  metaInfo: {
    title: 'Добавить новый заказ',
  },
  data: () => ({
    title: '',
    description: '',
    promo: false,
    loadImg: '',
  }),
  validations: {
    title: {
      required,
    },
    description: {
      required,
    },
    loadImg: {
      required,
    },
  },
  methods: {
    adHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }

      const dataForm = {
        title: this.title,
        description: this.description,
        promo: this.promo,
      };
      console.log(dataForm);
    },
    loadImgMet (event) {
      const img = event.target.files[0];
      if (img) {
        console.log(img);
        this.loadImg = '1';
      }
      else {
        this.loadImg = '';
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