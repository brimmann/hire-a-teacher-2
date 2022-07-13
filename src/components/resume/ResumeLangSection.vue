<template>
  <q-card flat bordered class="q-mt-xs q-mb-sm max-width q-pb-lg" style="width: 100%">
    <template v-for="(lang, index) in resumeStore.languages" :key="index">
      <div class="q-ma-none q-pa-none" v-if="index % 2 === 0" v-show="!lang.editing">
        <q-card-section class="row q-pt-sm items-center q-pb-xs">
          <div>
            <span class="text-subtitle1 text-bold">{{ lang.language }}</span>
            <span class="text-body2 text-grey-8">- {{ lang.level_of_fluency }}</span>
          </div>
          <q-space />
          <q-btn flat size="md" color="primary" icon="edit" @click="onEditLang(index)" />
          <q-btn flat size="md" color="primary" icon="delete" @click="onDeleteLang(index)" />
        </q-card-section>
        <q-separator inset />
      </div>
      <div
        v-else
        v-show="lang.editing"
        class="q-mb-md q-pa-lg max-width column"
        style="width: 100%; gap: 16px"
      >
        <q-input outlined v-model="lang.language" label="Field of study" />
        <q-select
          outlined
          square
          v-model="lang.level_of_fluency"
          :options="langLevelList"
          label="Level of fluency"
        />
        <div class="flex-center">
          <q-btn
            outline
            color="white"
            text-color="black"
            label="Discard Changes"
            class="q-mr-md"
            @click="onDiscardChangesLang(index)"
            unelevated
          />
          <q-btn
            color="primary"
            label="Save Changes"
            unelevated
            @click="onSaveChangesLang(index)"
          />
        </div>
      </div>
    </template>
  </q-card>
</template>

<script>
import { mapStores } from 'pinia/dist/pinia.esm-browser';
import { useResumeStore } from 'stores/resume';

export default {
  name: 'ResumeLangSection',
  data() {
    return {
      langLevelList: ['Beginner', 'Intermediate', 'Fluent', 'Expert', 'Native'],
    };
  },
  computed: {
    ...mapStores(useResumeStore),
  },
  methods: {
    onEditLang(index) {
      this.resumeStore.languages[index].editing = true;
      this.resumeStore.languages[index + 1].editing = true;
    },
    async onSaveChangesLang(index) {
      this.resumeStore.languages[index - 1] = JSON.parse(
        JSON.stringify(this.resumeStore.languages[index])
      );
      this.resumeStore.languages[index].editing = false;
      this.resumeStore.languages[index - 1].editing = false;

      let payload = JSON.parse(JSON.stringify(this.resumeStore.languages[index]));
      payload.id = this.resumeStore.languages[index].id;
      await this.resumeStore.updateResumeLang(payload);
    },
    onDiscardChangesLang(index) {
      this.resumeStore.languages[index] = JSON.parse(
        JSON.stringify(this.resumeStore.languages[index - 1])
      );
      this.resumeStore.languages[index].editing = false;
      this.resumeStore.languages[index - 1].editing = false;
    },
    async onDeleteLang(index) {
      const id = this.resumeStore.languages[index].id;
      this.resumeStore.languages.splice(index, 2);
      await this.resumeStore.deleteResumeLang(id);
    },
  },
};
</script>

<style scoped></style>
