<template>
  <div class="row max-width q-mb-md" style="width: 100%;">
    <q-input outlined v-model="skill" label="Skill" class="col-7" />
    <q-space/>
    <q-btn
      outline
      color="white"
      text-color="black"
      label="Discard"
      class="q-mr-md col-2"
      @click="onDiscard"
      unelevated
    />
    <q-btn
      color="primary"
      label="Add"
      unelevated
      @click="onSave"
      class="col-2"
    />
  </div>
</template>

<script>
import {mapStores} from "pinia/dist/pinia.esm-browser";
import {useResumeStore} from "stores/resume";

export default {
  name: "ResumeAddSkill",
  data() {
    return {
      skill: ''
    }
  },
  computed: {
    ...mapStores(useResumeStore),
  },
  methods: {
    onSave() {
      this.resumeStore.skills.push(this.skill);
      this.skill = '';
      this.resumeStore.adding.newSkill = false;
    },
    onDiscard() {
      this.skill = '';
      this.resumeStore.adding.newSkill = false;
    }
  },
}
</script>

<style scoped>

</style>
