<template>
  <q-page padding class="column items-center">
    <div class="max-width" :style="{ width: $q.screen.width < 680 ? '95%' : '80%' }">
      <div class="text-h6 text-grey self-start q-mb-sm">Review your application</div>
      <q-card square flat bordered class="my-card">
        <q-card-section class="bg-teal text-white">
          <div class="text-h6" :class="{ 'text-custom': $q.screen.width < 500 }">
            {{ job.title }}
          </div>
          <div class="text-subtitle1 text-teal-3 non-selectable">
            {{ job.apps_no }} applications
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-mb-none">
          <div class="text-caption q-mb-sm">
            {{ job.exp_level }} - {{ job.type }} - Posted {{ postTime }}
          </div>
          <div class="text-grey">{{ job.city }}</div>
          <div class="text-grey">Expires on July 22</div>
        </q-card-section>
        <q-separator inset />
        <q-card-section class="q-py-sm">
          <div class="text-body1 text-grey q-mb-sm">Job description:</div>
          <div class="text-body1">
            {{ job.description }}
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions class="q-px-md">
          <q-space />
          <q-btn
            no-caps
            @click="this.teacherStore.jobSearchStatus = this.teacherStore.applyingJob.previous"
            class="q-mr-md"
            padding="sm lg"
            outline
            label="Return back"
            unelevated
          />
          <q-btn
            no-caps
            @click="proceed"
            padding="sm lg"
            color="primary"
            label="Proceed"
            unelevated
            :loading="applying"
          >
            <template #loading>
              <q-spinner-bars class="on-left" />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapStores } from 'pinia';
import { useTeacherStore } from 'stores/teacher';

export default {
  name: 'ApplyForJob',
  props: {
    job: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentDate: Date.now(),
      interval: null,
      applying: false,
    };
  },
  computed: {
    ...mapStores(useTeacherStore),
    postTime() {
      const current = this.currentDate;
      const previous = new Date(parseInt(this.job.date_posted));
      const msPerMinute = 60 * 1000;
      const msPerHour = msPerMinute * 60;
      const msPerDay = msPerHour * 24;
      const msPerMonth = msPerDay * 30;
      const msPerYear = msPerDay * 365;

      const elapsed = current - previous;

      if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
      } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
      } else if (elapsed < msPerDay) {
        clearInterval(this.interval);
        return Math.round(elapsed / msPerHour) + ' hours ago';
      } else if (elapsed < msPerMonth) {
        clearInterval(this.interval);
        return Math.round(elapsed / msPerDay) + ' days ago';
      } else if (elapsed < msPerYear) {
        clearInterval(this.interval);
        return Math.round(elapsed / msPerMonth) + ' months ago';
      } else {
        clearInterval(this.interval);
        return Math.round(elapsed / msPerYear) + ' years ago';
      }
    },
  },
  methods: {
    async proceed() {
      this.applying = true;
      const store = this.teacherStore;

      await store.getRelevantJobs();
      await store.applyForJob({
        date_applied: new Date().getTime().toString(),
        job: this.job.id,
      });

      if (store.applyingJob.searchString !== null) {
        await store.searchJobs(store.applyingJob.searchString);
      }

      if (store.applyingJob.filters !== null) {
        store.filterJobs(store.applyingJob.filters);
      }

      store.jobSearchStatus = store.applyingJob.previous;
      this.applying = false;
    },
  },
  created() {
    this.interval = setInterval(() => (this.currentDate = Date.now()), 1000);
  },
};
</script>

<style scoped></style>
