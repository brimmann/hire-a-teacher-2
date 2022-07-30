<template>
  <q-page class="column flex-center" v-if="this.teacherStore.applications.length < 1">
    <div class="text-body1 q-mb-sm">No applications, try applying for some jobs</div>
    <q-btn flat no-caps color="primary" label="Go back to search" to="search"/>
  </q-page>
  <q-page padding class="column items-center" v-else>
    <div
      :style="{ width: $q.screen.width < 680 ? '95%' : '80%' }"
      class="column q-gutter-y-lg max-width"
    >
      <div class="text-h6 text-grey">List of your active applications</div>
      <job-item-apps v-for="(application, index) in this.teacherStore.applications" :application="application" :key="index"/>
    </div>
  </q-page>
</template>

<script>
import { mapStores } from 'pinia';
import { useTeacherStore } from 'stores/teacher';
import JobItemApps from 'components/job-applications/JobItemAppsTeacher';
export default {
  name: 'JobApplications',
  components: { JobItemApps },
  data() {
    return {
      testJob: {
        id: 29,
        title: 'English Teacher (Primary / Secondary)',
        org_id: 35,
        status: 'active',
        exp_level: 'Entry',
        type: 'Full-time',
        city: 'Lahore',
        date_posted: '1658650818217',
        expire_date: '2022/07/26',
        description:
          'Unique Group of Institutions is hiring for English Teachers the Candidates must have Qualification in the related subject (English) such as BS English or MA English.\n\nMust know about the Syllabus of PTB classes, Grammar Rules, and Use of Board.\n\nMultiple vacancies are available from class 1-5, 6-8, and Matric Level.',
        tags: 'ENGLISH,CLASSROOM,MANAGMENT,TEACHING',
        apps_no: 0,
      },
    };
  },
  computed: {
    ...mapStores(useTeacherStore),
  },
  created() {
    this.teacherStore.getApplications();
  }
};
</script>

<style scoped></style>
