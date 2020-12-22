import store from '@/store';

export default (to, from, next) => {
  if (store.getters['user/getUser']) {
    next();
  }
  else {
    next({
      name: 'Login',
      query: {
        loginError: 'true',
      },
    });
    // next('/login?loginError=true');
  }
}