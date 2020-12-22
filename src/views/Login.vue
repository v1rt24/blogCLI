<template>
  <div>
    <h1 class="center">Логин</h1>

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
                  :class="{invalid: $v.password.$dirty && !$v.password.required}"
              >
              <label for="password">Пароль</label>
              <span
                  class="error"
                  v-if="$v.password.$dirty && !$v.password.required"
              >
              Введите пароль
            </span>
            </div>
          </div>
          <button class="btn waves-effect waves-light blue darken-1" type="submit" :disabled="LOADING">
            Войти
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'Login',
  metaInfo: {
    title: 'Логин',
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
    },
  },
  computed: {
    ...mapGetters('globals', {
      LOADING: 'getLoading',
    }),
  },
  methods: {
    ...mapActions('user', {
      LOGIN: 'loginUser',
    }),
    ...mapActions('globals', {
      ERROR: 'error',
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
        await this.LOGIN(dataForm);
        this.$router.push({
          name: 'Home',
        });
      }
      catch (error) {
        // console.log(error);
      }
    },
  },
  mounted () {
    const loginError = this.$route.query.loginError;

    if (loginError) {
      this.ERROR('Авторизуйтесь');
    }
  },
};
</script>

<style scoped>

</style>