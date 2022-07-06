<template>
  <q-page padding class="column items-center">
    <resume-intro-section/>
    <q-bar style="border-radius: 0; width: 100%" class="row q-mb-md bg-primary max-width" tag="div">
      <div class="text-center text-white">Work Experience</div>
      <q-space />
      <q-btn flat size="md" color="white" icon="add_box" @click="addNewExp" v-if="!resumeStore.adding.newExp" />
    </q-bar>
    <resume-add-exp v-if="resumeStore.adding.newExp"/>
    <resume-exp-section v-if="resumeStore.experiences.length !== 0"/>
    <q-bar
      style="border-radius: 0; width: 100%"
      class="row q-mb-md q-mt-lg bg-primary max-width"
      tag="div"
    >
      <div class="text-center text-white">Educations</div>
      <q-space />
      <q-btn flat size="md" color="white" icon="add_box" v-if="!resumeStore.adding.newEdu" @click="addNewEdu"/>
    </q-bar>
    <resume-add-edu v-if="resumeStore.adding.newEdu"/>
    <resume-edu-section v-if="resumeStore.educations.length !== 0"/>
    <q-bar
      style="border-radius: 0; width: 100%"
      class="row q-mb-md q-mt-md bg-primary max-width"
      tag="div"
    >
      <div class="text-center text-white">Skills</div>
      <q-space />
      <q-btn flat size="md" color="white" icon="add_box" @click="addNewSkill" v-if="!resumeStore.adding.newSkill"/>
    </q-bar>
    <resume-add-skill v-if="resumeStore.adding.newSkill"/>
    <resume-skills-section v-if="resumeStore.skills.length !== 0"/>
    <q-bar
      style="border-radius: 0; width: 100%"
      class="row q-mb-md q-mt-md bg-primary max-width"
      tag="div"
    >
      <div class="text-center text-white">Languages</div>
      <q-space />
      <q-btn flat size="md" color="white" icon="add_box" v-if="!resumeStore.adding.newLang" @click="addNewLang" />
    </q-bar>
    <resume-add-lang v-if="resumeStore.adding.newLang"/>
    <resume-lang-section v-if="resumeStore.languages.length !== 0"/>
    <q-bar
      style="border-radius: 0; width: 100%"
      class="row q-mb-md q-mt-md bg-primary max-width"
      tag="div"
    >
      <div class="text-center text-white">Additional Text</div>
      <div class="text-center text-grey-5 text-body2">Optional</div>
      <q-space />
      <q-btn flat size="md" color="white" icon="add_box" />
    </q-bar>
    <q-bar
      style="border-radius: 0; width: 100%"
      class="row q-mb-md q-mt-md bg-primary max-width"
      tag="div"
    >
      <div class="text-center text-white">Certifications / Licenses</div>
      <div class="text-center text-grey-5 text-body2">Optional</div>
      <q-space />
      <q-btn flat size="md" color="white" icon="add_box" />
    </q-bar>
    <q-bar
      style="border-radius: 0; width: 100%"
      class="row q-mb-md q-mt-md bg-primary max-width"
      tag="div"
    >
      <div class="text-center text-white">Military Service</div>
      <div class="text-center text-grey-5 text-body2">Optional</div>
      <q-space />
      <q-btn flat size="md" color="white" icon="add_box" />
    </q-bar>
    <q-bar
      style="border-radius: 0; width: 100%"
      class="row q-mb-md q-mt-md bg-primary max-width"
      tag="div"
    >
      <div class="text-center text-white">Awards</div>
      <div class="text-center text-grey-5 text-body2">Optional</div>
      <q-space />
      <q-btn flat size="md" color="white" icon="add_box" />
    </q-bar>
    <q-bar
      style="border-radius: 0; width: 100%"
      class="row q-mb-md q-mt-md bg-primary max-width"
      tag="div"
    >
      <div class="text-center text-white">Groups</div>
      <div class="text-center text-grey-5 text-body2">Optional</div>
      <q-space />
      <q-btn flat size="md" color="white" icon="add_box" />
    </q-bar>
    <q-bar
      style="border-radius: 0; width: 100%"
      class="row q-mb-md q-mt-md bg-primary max-width"
      tag="div"
    >
      <div class="text-center text-white">Patents</div>
      <div class="text-center text-grey-5 text-body2">Optional</div>
      <q-space />
      <q-btn flat size="md" color="white" icon="add_box" />
    </q-bar>
    <q-bar
      style="border-radius: 0; width: 100%"
      class="row q-mb-md q-mt-md bg-primary max-width"
      tag="div"
    >
      <div class="text-center text-white">Publications</div>
      <div class="text-center text-grey-5 text-body2">Optional</div>
      <q-space />
      <q-btn flat size="md" color="white" icon="add_box" />
    </q-bar>
  </q-page>
</template>

<script>
import { mapStores } from 'pinia';
import { useResumeStore } from 'stores/resume';
import ResumeIntroSection from "components/resume/ResumeIntroSection";
import ResumeExpSection from "components/resume/ResumeExpSection";
import ResumeEduSection from "components/resume/ResumeEduSection";
import ResumeSkillsSection from "components/resume/ResumeSkillsSection";
import ResumeLangSection from "components/resume/ResumeLangSection";
import ResumeAddExp from "components/resume/ResumeAddExp";
import ResumeAddEdu from "components/resume/ResumeAddEdu";
import ResumeAddSkill from "components/resume/ResumeAddSkill";
import ResumeAddLang from "components/resume/ResumeAddLang";

export default {
  name: 'ResumePage',
  components: {
    ResumeAddLang,
    ResumeAddSkill,
    ResumeAddEdu,
    ResumeAddExp,
    ResumeLangSection, ResumeSkillsSection, ResumeEduSection, ResumeExpSection, ResumeIntroSection},
  computed: {
    ...mapStores(useResumeStore),
  },
  methods: {
    addNewExp() {
      this.resumeStore.adding.newExp = true;
    },
    addNewEdu() {
      this.resumeStore.adding.newEdu = true;
    },
    addNewSkill() {
      this.resumeStore.adding.newSkill = true;
    },
    addNewLang() {
      this.resumeStore.adding.newLang = true;
    }
  }
};
</script>

<style>
.max-width {
  max-width: 800px;
}
</style>
