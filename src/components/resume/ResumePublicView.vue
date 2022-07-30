<template>
  <resume-intro-section read-only/>
  <q-bar style="border-radius: 0; width: 100%" class="row q-mb-md q-mt-md bg-teal max-width" tag="div">
    <div class="text-center text-white">Work Experience</div>
  </q-bar>
  <resume-exp-section read-only/>
  <q-bar style="border-radius: 0; width: 100%" class="row q-mb-md q-mt-md bg-teal max-width" tag="div">
    <div class="text-center text-white">Educations</div>
  </q-bar>
  <resume-edu-section read-only/>
  <q-bar style="border-radius: 0; width: 100%" class="row q-mb-md q-mt-md bg-teal max-width" tag="div">
    <div class="text-center text-white">Skills</div>
  </q-bar>
  <resume-skills-section read-only/>
  <q-bar style="border-radius: 0; width: 100%" class="row q-mb-md q-mt-md bg-teal max-width" tag="div">
    <div class="text-center text-white">Languages</div>
  </q-bar>
  <resume-lang-section read-only/>
</template>

<script>
import ResumeIntroSection from "components/resume/ResumeIntroSection";
import {useUserStore} from "stores/user";
import axios from "axios";
import {mapStores} from "pinia";
import {useResumeStore} from "stores/resume";
import ResumeEduSection from "components/resume/ResumeEduSection";
import ResumeSkillsSection from "components/resume/ResumeSkillsSection";
import ResumeLangSection from "components/resume/ResumeLangSection";
import ResumeExpSection from "components/resume/ResumeExpSection";
export default {
  name: "ResumePublicView",
  components: {ResumeExpSection, ResumeLangSection, ResumeSkillsSection, ResumeEduSection, ResumeIntroSection},
  props: {
    resumeId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      resume: null,
    }
  },
  computed: {
    ...mapStores(useUserStore, useResumeStore)
  },
  created() {
    console.log('resume-view', this.resumeId)
    const token = this.userStore.token;
    axios.get('http://127.0.0.1:8000/api/v1/resume/public?id=' + this.resumeId, {
      headers: {
        Authorization: 'Token ' + token,
      },
    }).then((response) => {
      this.resume = response.data;
      this.resumeStore.intro = this.resume.intro;
      this.resumeStore.experiences = this.resume.experiences;
      this.resumeStore.educations = this.resume.educations;
      this.resumeStore.skills = this.resume.skills;
      this.resumeStore.languages = this.resume.languages;
      this.resumeStore.initBufferExp();
      this.resumeStore.initBufferEdu();
      this.resumeStore.initBufferLang();
      console.log(response);
    }).catch((e) => {
      console.log('view-resume-error', e.message);
    })
  }
}
</script>

<style scoped>

</style>
