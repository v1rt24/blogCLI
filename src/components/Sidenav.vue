<template>
  <div>
    <nav class="blue darken-1">
      <div class="nav-wrapper">
        <div>
          <Media
              :query="{maxWidth: 576}"
          >
            <a href="#" @click.prevent="openSidenav"><i class="material-icons">menu</i></a>
          </Media>
          <div class="brand-logo">Название</div>
        </div>
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
        </ul>
      </div>
    </nav>

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
      </ul>
    </Media>
  </div>
</template>

<script>
let sidenav = null;

export default {
  name: 'Sidenav',
  data: () => ({
    links: [
      {title: 'Логин', url: 'Login'},
      {title: 'Регистрация', url: 'Registration'},
      {title: 'Заказы', url: 'Orders'},
      {title: 'Добавить новый', url: 'New'},
      {title: 'Мои объявления', url: 'List'},
    ],
  }),
  methods: {
    openSidenav () {
      sidenav.open();
    },
    closeSideNav () {
      sidenav.close();
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