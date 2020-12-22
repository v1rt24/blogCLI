<template>
  <div>
    <h1 class="center">Регистрация</h1>

    <div class="container">
      <div class="row">
        <form class="col s12 m6 offset-m3" @submit.prevent="loginHandler">
          <div class="row">
            <div class="input-field col s12">
              <input
                  id="email"
                  type="email"
                  v-model.trim="email"
                  :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
              >
              <label for="email">Email</label>
              <span
                  class="error"
                  v-if="$v.email.$dirty && !$v.email.required"
              >
              Введите почту
            </span>
              <span
                  class="error"
                  v-if="$v.email.$dirty && !$v.email.email"
              >
              Некорректная почта
            </span>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                  id="password"
                  type="password"
                  v-model.trim="password"
                  :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
              >
              <label for="password">Пароль</label>
              <span
                  class="error"
                  v-if="$v.password.$dirty && !$v.password.required"
              >
              Введите пароль
            </span>
              <span
                  class="error"
                  v-if="$v.password.$dirty && !$v.password.minLength"
              >
              Пароль должен быть не менее {{ $v.password.$params.minLength.min }} <br>
              Вы ввели {{ password.length }}
            </span>
            </div>
          </div>
          <button class="btn waves-effect waves-light blue darken-1" type="submit" :disabled="$v.$invalid || LOADING">
            Зарегистрироваться
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'Registration',
  metaInfo: {
    title: 'Регистрация',
  },
  data: () => ({
    email: '',
    password: '',
  }),
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
  computed: {
    ...mapGetters('globals', {
      LOADING: 'getLoading',
    }),
  },
  methods: {
    ...mapActions('user', {
      REGISTER_USER: 'registerUser',
    }),
    async loginHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }

      const dataForm = {
        email: this.email,
        password: this.password,
      };

      try {
        await this.REGISTER_USER(dataForm);
        this.$router.push({
          name: 'Home',
        });
      }
      catch (error) {
        // console.log(error);
      }
    },
  },
};
</script>

<style scoped>

</style>