<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m8 offset-m2 wrapperCard">
        <div class="card">
          <div class="card-image">
            <img :src="ad.imgSrc" :alt="ad.title">
            <span class="card-title">{{ ad.title }}</span>
          </div>
          <div class="card-content">
            <p>{{ ad.description }}</p>
          </div>
          <div class="card-action">
            <edit-ad-modal
                v-if="isOwnew"
                :ad="ad"
            />
            <ByModal
                bg="teal darken-3"
                :ad="ad"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import editAdModal from '@/components/editAdModal';

export default {
  name: 'Ad',
  props: {
    alias: {
      type: String,
      required: true,
    },
  },
  metaInfo () {
    return {
      title: this.ad.title,
    };
  },
  computed: {
    ...mapGetters('ads', {
      AD_BY_ID: 'adById',
    }),
    ...mapGetters('user', {
      USER: 'getUser',
    }),
    ad () {
      return this.AD_BY_ID(this.alias);
    },
    isOwnew () {
      if (this.USER) {
        return this.ad.ownerId === this.USER.id;
      }
    },
  },
  components: {
    editAdModal,
  },
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