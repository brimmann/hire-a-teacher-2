<template>
  <main-org-apps-view
    v-if="status === 'main'"
    @resume="viewResume"
    @job-based="status = 'job-based'"
  />
  <q-page padding class="column items-center" v-else-if="status === 'job-based'">
    <div class="row q-mb-md justify-between items-center full-width">
      <q-btn
        flat
        no-caps
        color="primary"
        icon="arrow_back"
        label="Return back"
        @click="status = 'main'"
      />
    </div>
    <job-based-org-apps-view @resume="viewResume" />
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
    <q-dialog v-model="accept" persistent>
      <q-card square flat class="full-width">
        <q-card-section class="row justify-between">
          <div class="text-subtitle1 text-bold">Scheduling interview</div>
          <q-space />
          <q-btn dense flat icon="close" @click="accept = false"/>
        </q-card-section>

        <q-stepper v-model="step" vertical color="primary" animated>
          <q-step :name="1" title="You must know" icon="settings" :done="step > 1">
            <div class="text-body1">
              By accepting the application you are officially inviting Mohammad Rashid for an
              in-person interview.
            </div>
            <q-stepper-navigation>
              <q-btn @click="step = 2" color="primary" label="Continue" />
            </q-stepper-navigation>
          </q-step>

          <q-step
            :name="2"
            title="Add an address"
            icon="location_on"
            :done="step > 2"
          >
            <q-input square outlined style="width: 100%" v-model="address"/>
            <q-stepper-navigation>
              <q-btn @click="step = 3" color="primary" label="Continue" />
              <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
            </q-stepper-navigation>
          </q-step>

          <q-step :name="3" title="Choose interview date" icon="calendar_month" :done="step > 3">
            <q-input outlined v-model="date" readonly>
              <template #append>
                <div class="row q-gutter-sm items-center">
                  <q-separator vertical/>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-time v-model="date" mask="YYYY-MM-DD HH:mm A">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </div>
              </template>
            </q-input>
            <q-stepper-navigation>
              <q-btn color="primary" label="Finish" @click="finish"/>
              <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </q-card>
    </q-dialog>
    <div class="row q-mb-md justify-between items-center full-width">
      <q-btn
        flat
        no-caps
        color="primary"
        icon="arrow_back"
        label="Return back"
        @click="status = previousStatus"
      />
      <q-space />
      <q-btn
        unelevated
        no-caps
        color="primary"
        icon-right="check"
        class="q-mr-md"
        label="Accept application"
        @click="accept = true"
      />
      <q-btn unelevated no-caps color="red" icon-right="close" label="Reject application" />
    </div>
    <div class="full-width q-mb-lg" style="max-width: 800px">
      <single-job-item-org :job="orgStore.viewingJob" />
    </div>
    <q-separator class="full-width" style="max-width: 800px" />
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
import SingleJobItemOrg from 'components/job-applications/SingleJobItemOrg';
import { mapStores } from 'pinia';
import { useOrgStore } from 'stores/org';
export default {
  name: 'JobApplicationsOrg',
  components: { SingleJobItemOrg, ResumePublicView, JobBasedOrgAppsView, MainOrgAppsView },
  data() {
    return {
      status: 'main',
      previousStatus: 'main',
      viewingResumeId: null,
      accept: false,
      step: 1,
      date: '2022-08-01 12:44 PM',
      address: "",
      viewIngApplication: null
    };
  },
  computed: {
    ...mapStores(useOrgStore),

  },
  methods: {
    viewResume(app) {
      this.viewingResumeId = app.app.teacher;
      this.viewIngApplication = app
      this.previousStatus = this.status;
      this.status = 'resume';
    },
    scrollToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    async finish(){
      const payload = {
        time: this.date,
        address: this.address,
        job: this.viewIngApplication.app.job,
        teacher: this.viewIngApplication.app.teacher
      }
      await this.orgStore.accept(payload)
      this.accept = false;
      this.status = this.previousStatus;
    }
  },
};
</script>

<style scoped></style>
