<template>
  <div>
    <Sidenav/>
    <router-view/>
  </div>
</template>

<script>
import Sidenav from '@/components/Sidenav';

export default {
  name: 'App',
  components: {Sidenav},
};
</script>

<style scoped>

</style>