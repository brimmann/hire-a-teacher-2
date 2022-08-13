<template>
  <q-page padding class="column items-center" v-if="status === 'main'">
    <div class="text-subtitle1 text-grey-8 text-center" v-if="orgStore.interviews.length < 1">
      <span class="text-bold">No interviews</span>
    </div>
    <div style="width: 80%; max-width: 800px" v-else>
      <interview-item-org
        class="q-mb-lg"
        v-for="(interview, index) in orgStore.interviews"
        :job="interview.job"
        :interview="interview.interview"
        :index="index"
        :key="index"
        @view-resume="viewResume"
        @select-app="getInterview(interview.interview, interviewIndex)"
        @reject-app="rejectApplicant(interview.interview, index)"
      />
    </div>
    <q-dialog v-model="selectApplicant" persistent>
      <q-card square flat class="full-width">
        <q-card-section class="row justify-between">
          <div class="text-subtitle1 text-bold">Recruiting applicant</div>
          <q-space />
          <q-btn dense flat icon="close" @click="selectApplicant = false" />
        </q-card-section>

        <q-stepper v-model="step" vertical color="primary" animated>
          <q-step :name="1" title="Agreement" icon="handshake" :done="step > 1">
            <div class="text-body2">
              To continue the selection process please agree to the following terms:
              <ul>
                <li class="q-mb-sm">
                  The employer is responsible to obey National Labour Law of Islamic Republic
                  of Pakistan and provide all the rights to the applicant that are applicable.
                </li>
                <li>
                  The <strong>Tokens</strong> that are generated as per recruitment process must be
                  distributed to the the students in order to provide feedback to the applicant
                  profile on www.teacher.pk to contribute to the applicant's profile ranking.
                </li>
              </ul>
            </div>
            <q-stepper-navigation>
              <q-btn @click="step = 2" color="primary" label="Agree" />
            </q-stepper-navigation>
          </q-step>

          <q-step
            :name="2"
            title="Provide estimated number of students"
            icon="groups"
            :done="step > 2"
          >
            <q-input
              square
              bottom-slots
              outlined
              label="Number of students"
              style="width: 100%"
              v-model="numberOfStudents"
            >
              <template #hint>
                Specifying estimated number students that this teacher will teach is required for
                feedback tokens generation
              </template>
            </q-input>
            <q-stepper-navigation>
              <q-btn @click="step = 3" color="primary" label="Continue" />
              <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
            </q-stepper-navigation>
          </q-step>

          <q-step :name="3" title="Choose interview date" icon="calendar_month" :done="step > 3">
            <q-select
              outlined
              bottom-slots
              v-model="duration"
              :options="durationsList"
              label="Course duration"
            >
              <template #hint>
                Primary teaching period for the teacher is required for feedback token activation
              </template>
            </q-select>
            <q-stepper-navigation>
              <q-btn color="primary" label="Finish" @click="selectingTheApplicant" />
              <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </q-card>
    </q-dialog>
  </q-page>
  <q-page v-else padding class="column items-center">
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
      <div class="text-body1 text-grey-7">Interview scheduled {{ viewingInterview.time }}</div>
    </div>
    <resume-public-view :resume-id="viewingInterview.teacher" />
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
import { mapStores } from 'pinia/dist/pinia';
import { useOrgStore } from 'stores/org';
import InterviewItemOrg from 'components/hiring/InterviewItemOrg';
import ResumePublicView from 'components/resume/ResumePublicView';

export default {
  name: 'OrgInterview',
  components: { ResumePublicView, InterviewItemOrg },
  data() {
    return {
      status: 'main',
      selectingInterview: null,
      viewingInterview: null,
      selectApplicant: false,
      interviewIndex: null,
      step: 1,
      numberOfStudents: null,
      duration: {
        label: '15 Days',
        value: 15,
      },
      durationsList: [
        { label: '15 Days', value: 15 },
        { label: '1 Month', value: 30 },
        { label: '2 Months', value: 60 },
        { label: '3 Months', value: 90 },
        { label: '4 Months', value: 120 },
        { label: '6 Months', value: 180 },
      ],
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
    viewResume(interview, interviewIndex) {
      this.interviewIndex = interviewIndex;
      this.viewingInterview = interview;
      this.status = 'resume';
    },
    getInterview(interview) {
      this.selectingInterview = interview;
      this.selectApplicant = true;
    },
    async selectingTheApplicant() {
      try {
        const payload = {
          interview_id: this.selectingInterview.id,
          students: parseInt(this.numberOfStudents),
          days: parseInt(this.duration.value),
        };
        await this.orgStore.selectTheApplicant(payload);
        this.orgStore.interviews.splice(this.interviewIndex, 1);
        this.selectApplicant = false;
        this.step = 1;
        this.numberOfStudents = null;
        this.duration = {
          label: '15 Days',
          value: 15,
        };
      } catch (e) {
        console.log('selecting-error', e.message);
      }
    },
    rejectApplicant(interview, index){
      this.$q.dialog({
        title: 'Rejecting applicant',
        message: 'Do you want reject the applicant?',
        ok: "Yes",
        cancel: "No",
        persistent: true
      }).onOk(async () => {
        await this.orgStore.cancelInterview(interview.id);
        this.orgStore.interviews.splice(index, 1);
      })
    }
  },
  created() {
    this.orgStore.getInterviews();
  },
};
</script>

<style scoped></style>
