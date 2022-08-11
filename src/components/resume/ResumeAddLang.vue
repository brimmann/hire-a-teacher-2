<template>
  <div
    class="q-mb-md max-width column"
    style="width: 100%; gap: 16px"
  >
    <q-form @submit.prevent.stop="onSave" class="q-col-gutter-sm">
      <q-input outlined v-model="lang.language" label="Language" :rules="[val => !!val || 'Cannot be empty']" lazy-rules/>
      <q-select
        outlined
        level_of_fluency
        v-model="lang.level_of_fluency"
        :options="langLevelList"
        label="Level of fluency"
        :rules="[val => !!val || 'Select an level']" lazy-rules
      />
      <div class="flex-center">
        <q-btn
          outline
          color="white"
          text-color="black"
          label="Discard"
          class="q-mr-md"
          @click="onDiscard"
          unelevated

        />
        <q-btn
          color="primary"
          label="Save"
          type="submit"
          unelevated
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import {mapStores} from "pinia/dist/pinia.esm-browser";
import {useResumeStore} from "stores/resume";

export default {
  name: "ResumeAddLang",
  data() {
    return {
      lang: {
        editing: false,
        language: '',
        level_of_fluency: '',
      },
      langLevelList: ['Beginner', 'Intermediate', 'Fluent', 'Expert', 'Native'],
    }
  },
  computed: {
    ...mapStores(useResumeStore),
  },
  methods: {
    async onSave() {
      this.resumeStore.languages.push(this.lang);
      this.resumeStore.languages.push(this.lang);
      await this.resumeStore.createResumeLang(this.lang);
      this.resumeStore.adding.newLang = false;
      this.lang = {
        editing: false,
        language: '',
        level_of_fluency: '',
      }
    },
    onDiscard() {
      this.resumeStore.adding.newLang = false;
      this.lang = {
        editing: false,
        language: '',
        level_of_fluency: '',
      }
    }
  }
}
</script>

<style scoped>

</style>
