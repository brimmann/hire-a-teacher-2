<template>
  <main-org-apps-view v-if="status === 'main'" @resume="viewResume" @job-based="status='job-based'"/>
  <q-page padding class="column items-center" v-else-if="status === 'job-based'">
    <div class="row q-mb-md justify-between items-center full-width">
      <q-btn flat no-caps color="primary" icon="arrow_back" label="Return back" @click="status = 'main'"/>
    </div>
    <job-based-org-apps-view @resume="viewResume"/>
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

  <q-page v-else-if="status === 'resume'" padding class="column items-center">
    <div class="row q-mb-md justify-between items-center full-width">
      <q-btn flat no-caps color="primary" icon="arrow_back" label="Return back" @click="status = previousStatus"/>
      <q-space />
      <q-btn
        unelevated
        no-caps
        color="primary"
        icon-right="check"
        class="q-mr-md"
        label="Accept application"
      />
      <q-btn unelevated no-caps color="red" icon-right="close" label="Reject application" />
    </div>
    <div class="full-width q-mb-lg" style="max-width: 800px">
      <single-job-item-org :job="orgStore.viewingJob"/>
    </div>
    <q-separator class="full-width" style="max-width: 800px"/>
    <resume-public-view :resume-id="viewingResumeId" />
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
</template>

<script>
import MainOrgAppsView from 'components/job-applications/MainOrgAppsView';
import JobBasedOrgAppsView from 'components/job-applications/JobBasedOrgAppsView';
import ResumePublicView from 'components/resume/ResumePublicView';
import SingleJobItemOrg from "components/job-applications/SingleJobItemOrg";
import {mapStores} from "pinia";
import {useOrgStore} from "stores/org";
export default {
  name: 'JobApplicationsOrg',
  components: {SingleJobItemOrg, ResumePublicView, JobBasedOrgAppsView, MainOrgAppsView },
  data() {
    return {
      status: 'main',
      previousStatus: 'main',
      viewingResumeId: null,
    };
  },
  computed:{
    ...mapStores(useOrgStore)
  },
  methods: {
    viewResume(resumeId) {
      this.viewingResumeId = resumeId;
      this.previousStatus = this.status;
      this.status = 'resume';
    },
    scrollToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
};
</script>

<style scoped></style>
