<template>
  <div
    class="q-mb-md max-width column"
    style="width: 100%; gap: 16px"
  >
    <q-input outlined v-model="lang.name" label="Language" />
    <q-select
      outlined
      square
      v-model="lang.fluencyLevel"
      :options="langLevelList"
      label="Level of fluency"
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
        unelevated
        @click="onSave"
      />
    </div>
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
        name: '',
        fluencyLevel: '',
      },
      langLevelList: ['Beginner', 'Intermediate', 'Fluent', 'Expert', 'Native'],
    }
  },
  computed: {
    ...mapStores(useResumeStore),
  },
  methods: {
    onSave() {
      this.resumeStore.languages.push(this.lang);
      this.resumeStore.languages.push(this.lang);
      this.resumeStore.adding.newLang = false;
      this.lang = {
        editing: false,
        name: '',
        fluencyLevel: '',
      }
    },
    onDiscard() {
      this.resumeStore.adding.newLang = false;
      this.lang = {
        editing: false,
        name: '',
        fluencyLevel: '',
      }
    }
  }
}
</script>

<style scoped>

</style>
