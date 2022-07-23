<template>
  <component :is="currentComponent">Loading your resume, please wait...</component>
</template>

<script>
import { mapStores } from 'pinia/dist/pinia';
import { useResumeStore } from 'stores/resume';
import ResumePage from 'pages/ResumePage';
import BuildingResume from 'pages/BuildingResume';
import WaitingResume from "pages/WaitingPage";

export default {
  name: 'ResumeContainer',
  components: {
    WaitingResume,
    BuildingResume,
    ResumePage,
  },
  computed: {
    ...mapStores(useResumeStore),
    currentComponent() {
      if (this.resumeStore.resumeLoading) {
        return 'WaitingResume'
      }
      return this.resumeStore.adding.resume || !this.resumeStore.noResume ? 'ResumePage' : 'BuildingResume';
    },
  },
  beforeMount() {
    this.resumeStore.getResume(false);
  }
};
</script>

<style scoped></style>
