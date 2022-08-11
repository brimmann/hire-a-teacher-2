<template>
  <div class="row max-width q-mb-md" style="width: 100%;">
    <q-form @submit.prevent.stop="onSave"  style="width: 100%;">
      <q-input outlined v-model="skill" label="Skill" :rules="[val => !!val || 'Cannot be empty']" lazy-rules class="q-mb-sm"/>
      <q-space/>
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
        label="Add"
        unelevated
        type="submit"
      />
    </q-form>
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
    async onSave() {
      this.resumeStore.skills.push({
        skill: this.skill
      });
      this.resumeStore.adding.newSkill = false;
      await this.resumeStore.createResumeSkill({skill: this.skill});
      this.skill = '';
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
