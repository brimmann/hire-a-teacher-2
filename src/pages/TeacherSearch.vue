<template>
  <q-page padding class="column items-center" v-if="status === 'main'">
    <div style="width: 80%; max-width: 800px">
      <div
        class="text-subtitle1 text-grey-8 text-center"
        v-if="orgStore.searchedTeachers.length < 1"
      >
        <span class="text-bold">Nothing yet searched</span>
        , Search a teacher using the input field.
      </div>
      <div v-else class="self-start text-subtitle1 text-grey-8 q-mb-md">
        <span class="text-bold">Search results</span> - Jobs best match your query
      </div>
      <div class="column q-gutter-lg">
        <teacher-item-search
          v-for="(teacher, index) in orgStore.searchedTeachers"
          :key="index"
          :teacher="teacher"
          @resume="viewResume"
          @send-offer="sendOffer"
        />
      </div>
    </div>
  </q-page>
  <q-page v-else-if="status === 'resume'" padding class="column items-center">
    <div class="row q-mb-md justify-between items-center full-width">
      <q-btn
        flat
        no-caps
        color="primary"
        icon="arrow_back"
        label="Return back"
        @click="status = 'main'"
      />
      <q-space />
      <q-btn unelevated no-caps color="primary" class="q-mr-md" label="Send job offer" @click="status='offering'" />
    </div>
    <q-separator spaced class="full-width" style="max-width: 800px" />
    <resume-public-view :resume-id="viewingResume" />
    <q-page-sticky @click="scrollToTop" position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        padding="md"
        align="center"
        no-caps
        dense
        icon="keyboard_arrow_up"
        color="accent"
      />
    </q-page-sticky>
  </q-page>
  <q-page v-else-if="status === 'offering'" padding class="column items-center">
    <div style="width: 80%; max-width: 800px">
      <offering-job/>
      <offer-review-teacher-item :teacher="orgStore.offeringTeacher"/>
      <div class="q-mt-lg">
        <q-btn outline no-caps label="Return back" class="q-mr-md" @click="status='main'"/>
        <q-btn unelevated no-caps label="Send offer to Mohammad Rashid" color="primary"/>
      </div>
    </div>
  </q-page>
</template>

<script>
import TeacherItemSearch from 'components/teacher-search/TeacherItemSearch';
import ResumePublicView from 'components/resume/ResumePublicView';
import { mapStores } from 'pinia';
import { useOrgStore } from 'stores/org';
import OfferReviewTeacherItem from "components/teacher-search/OfferReviewTeacherItem";
import OfferingJob from "components/offers/OfferingJob";
export default {
  name: 'TeacherSearch',
  components: {OfferingJob, OfferReviewTeacherItem, ResumePublicView, TeacherItemSearch },
  data() {
    return {
      status: 'main',
      viewingResume: null
    };
  },
  computed: {
    ...mapStores(useOrgStore),
  },
  methods: {
    scrollToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    sendOffer(teacher) {
      this.orgStore.offeringTeacher = teacher;
      this.status = 'offering'
    },
    viewResume(teacher) {
      this.viewingResume = teacher.teacher_id;
      this.orgStore.offeringTeacher = teacher;
      this.status = "resume"
    }
  },
  beforeMount() {
    this.orgStore.loadJobs();
  },
};
</script>

<style scoped></style>
