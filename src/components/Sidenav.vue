<template>
  <div>
    <nav class="blue darken-1">
      <div class="nav-wrapper">
        <div>

          <!-- Кнопка вызова мобильного меню -->
          <Media
              :query="{maxWidth: 576}"
          >
            <a href="#" @click.prevent="openSidenav"><i class="material-icons">menu</i></a>
          </Media>
          <!-- /Кнопка вызова мобильного меню -->

          <router-link to="/" class="brand-logo">Название</router-link>
        </div>

        <!-- Меню ПК -->
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <router-link
              tag="li"
              v-for="link of links"
              :key="link.title"
              :to="{name: link.url}"
              exact-active-class="active"
          >
            <a>{{ link.title }}</a>
          </router-link>

          <li v-if="isUserLoggedIn"><a href="#" @click.prevent="logout($event, 'PC')">Выход</a></li>
        </ul>
      </div>
    </nav>

    <!-- Меню Мобильное -->
    <Media
        :query="{maxWidth: 576}"
    >
      <ul id="slide-out" class="sidenav" ref="sidenav">
        <li class="nameMenu">Меню</li>
        <li>
          <div class="divider"></div>
        </li>
        <router-link
            tag="li"
            v-for="link of links"
            :key="link.title"
            :to="link.url"
            exact-active-class="active"
        >
          <a class="waves-effect" @click="closeSideNav">{{ link.title }}</a>
        </router-link>

        <li v-if="isUserLoggedIn"><a href="#" @click.prevent="logout($event, 'MOB')">Выход</a></li>
      </ul>
    </Media>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

let sidenav = null;

export default {
  name: 'Sidenav',
  computed: {
    ...mapGetters('user', {
      isUserLoggedIn: 'getIsUserLoggedIn',
    }),
    links () {
      if (this.isUserLoggedIn) {
        return [
          {title: 'Заказы', url: 'Orders'},
          {title: 'Добавить новый', url: 'New'},
          {title: 'Мои объявления', url: 'List'},
        ];
      }
      return [
        {title: 'Логин', url: 'Login'},
        {title: 'Регистрация', url: 'Registration'},
      ];
    },
  },
  methods: {
    ...mapActions('user', {
      LOGOUT: 'logout',
    }),
    openSidenav () {
      sidenav.open();
    },
    closeSideNav () {
      sidenav.close();
    },
    async logout (event, dev) {
      await this.LOGOUT();

      if (dev === 'MOB') {
        this.closeSideNav();
      }

      this.$router.push({
        name: 'Home',
      });
    },
  },
  mounted () {
    this.$nextTick(() => {
      sidenav = M.Sidenav.init(this.$refs.sidenav);
    });
  },
  destroyed () {
    if (sidenav && sidenav.destroy) {
      sidenav.destroy();
    }
  },
};
</script>

<style scoped>
.nav-wrapper {
  padding: 0 30px;
}

.nameMenu {
  font-size: 20px;
  margin-left: 35px;
}

@media (max-width: 576px) {
  .brand-logo {
    top: 0;
    z-index: 100;
  }
}
</style>