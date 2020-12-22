<template>
  <div>
    <button
        class="waves-effect waves-light btn"
        :class="bg"
        @click="openModal"
    >
      Купить
    </button>

    <!-- Modal Structure -->
    <div id="modalBuy" class="modal" ref="buyModal">
      <div class="modal-content">
        <h4>{{ ad.title }}</h4>
        <form @submit.prevent="buyHandler">
          <div class="input-field">
            <input id="name" type="text" v-model="name">
            <label for="name">Имя</label>
            <span
                class="error"
                v-if="$v.name.$dirty && !$v.name.required"
            >
              Введите имя
            </span>
          </div>

          <div class="input-field">
            <input id="phone" type="text" v-model="phone" v-phone>
            <label for="phone">Телефон</label>
            <span
                class="error"
                v-if="$v.phone.$dirty && !$v.phone.required"
            >
              Введите номер телефона
            </span>
          </div>

          <div class="modal-footer">
            <a class="waves-effect waves-light btn-flat black-text modal-close">Закрыть</a>
            <button class="btn waves-effect waves-light" type="submit">
              Купить
              <i class="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import phone from '@/directives/phone';
import { mapActions } from 'vuex';

let buyModal = null;

export default {
  name: 'BuyModal',
  props: {
    bg: {
      type: String,
      default: 'cyan',
    },
    ad: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    name: '',
    phone: '',
  }),
  validations: {
    name: {
      required,
    },
    phone: {
      required,
    },
  },
  methods: {
    ...mapActions('orders', {
      CREATE_ORDER: 'createOrder',
    }),
    openModal () {
      buyModal = M.Modal.init(this.$refs.buyModal, {
        onCloseEnd: () => {
          this.clearFields();
          buyModal.destroy();
        },
      });
      buyModal.open();
    },
    async buyHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }

      buyModal.close();

      try {
        await this.CREATE_ORDER({
          name: this.name,
          phone: this.phone,
          alias: this.ad.alias,
          adId: this.ad.id,
          ownerId: this.ad.ownerId,
        });

        this.clearFields();
      }
      catch (error) {
        console.log(error);
      }
    },
    clearFields () {
      this.name = this.phone = '';
      this.$v.$reset();
    },
  },
  directives: {
    phone,
  },
  destroyed () {
    if (buyModal && buyModal.destroy) {
      buyModal.destroy();
    }
  },
};
</script>

<style scoped>

</style>