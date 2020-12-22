<template>
  <div>
    <button class="waves-effect waves-light btn blue darken-1 btn-flat white-text" style="margin-right: 5px;" @click="editOpen">
      Редактировать
    </button>

    <!-- Modal Structure -->
    <div id="modal1" class="modal" ref="modalEdit">
      <div class="modal-content">
        <h5 class="h5">Редактировать: {{ ad.title }}</h5>

        <div class="input-field">
          <input id="title" type="text" v-model="title">
          <label for="title">Заголовок</label>
          <span
              class="error"
              v-if="$v.title.$dirty && !$v.title.required"
          >
              Введите заголовок
            </span>
        </div>

        <div class="input-field">
          <textarea id="desc" class="materialize-textarea" v-model="description"></textarea>
          <label for="desc">Описание</label>
          <span
              class="error"
              v-if="$v.description.$dirty && !$v.description.required"
          >
              Введите описание
            </span>
        </div>
      </div>
      <div class="modal-footer">
        <button class="waves-effect waves-light btn-flat" @click="onclose">Закрыть</button>
        <button class="waves-effect waves-light btn blue darken-1" @click="onSave">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

let modal = null;

export default {
  name: 'editAdModal',
  props: {
    ad: {
      type: Object,
    },
  },
  data () {
    return {
      title: this.ad.title,
      description: this.ad.description,
    };
  },
  validations: {
    title: {
      required,
    },
    description: {
      required,
    },
  },
  methods: {
    ...mapActions('ads', {
      UPDATE_AD: 'updateAd',
    }),
    editOpen() {
      modal.open();
    },
    async onSave () {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }

      modal.close();

      try {
        await this.UPDATE_AD({
          title: this.title,
          description: this.description,
          id: this.ad.id,
        });
      }
      catch (error) {
        console.log(error);
      }
    },
    onclose () {
      modal.close();
      this.clearFields();
    },
    clearFields () {
      this.title = this.ad.title;
      this.description = this.ad.description;
      this.$nextTick(() => {
        this.fieldActive();
      });
    },
    fieldActive () {
      M.updateTextFields();
    },
  },
  mounted () {
    modal = M.Modal.init(this.$refs.modalEdit, {
      dismissible: false,
    });
    this.fieldActive();
  },
  destroyed () {
    if (modal && modal.destroy) {
      modal.destroy();
    }
  },
};
</script>

<style scoped>
.modal-content .h5 {
  margin-bottom: 30px;
}
</style>