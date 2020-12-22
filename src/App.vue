<template>
  <Loading v-if="LOADING"/>

  <div v-else>
    <Sidenav/>
    <router-view/>
  </div>
</template>

<script>
import Sidenav from '@/components/Sidenav';
import { mapGetters } from 'vuex';
import message from '@/utils/message';

export default {
  name: 'App',
  computed: {
    ...mapGetters('globals', {
      LOADING: 'getLoading',
      ERROR: 'getError',
    }),
  },
  components: {Sidenav},
  watch: {
    ERROR (val) {
      if (val) {
        M.toast({html: message[val] || val});
      }
    },
  },
};
</script>

<style scoped>

</style>