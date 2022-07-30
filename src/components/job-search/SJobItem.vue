<template>
  <q-card square flat bordered class="my-card">
    <q-card-section class="bg-teal text-white">
      <div class="text-h6" :class="{'text-custom': $q.screen.width < 500}">{{ job.title }}</div>
      <div class="text-subtitle1 text-teal-3 non-selectable">{{ job.apps_no }} applications</div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-mb-none">
      <div class="text-caption q-mb-sm">{{ job.exp_level }} - {{ job.type }} - Posted {{ postTime }}</div>
      <div class="text-grey">{{ job.city }}</div>
      <div class="text-grey">Expires on July 22</div>
    </q-card-section>
    <q-separator inset/>
    <q-card-actions class="q-px-md">
      <q-btn no-caps padding="sm lg" color="primary" label="Apply now" unelevated @click="applyForJob"/>
      <q-space />
      <q-btn
        :ripple="false"
        dense
        unelevated
        no-caps
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
        :label="expanded ? 'Hide details' : 'Show details'"
        :class="{'text-warning': expanded}"
      />
    </q-card-actions>
    <q-slide-transition>
      <div v-show="expanded">
        <q-separator/>
        <q-card-section class="q-py-sm">
          <div class="text-body1 text-grey q-mb-sm">Job description:</div>
          <div class="text-body1">
            {{ job.description }}
          </div>
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script>

import {mapStores} from "pinia";
import {useTeacherStore} from "stores/teacher";

export default {
  name: 'SJobItem',
  props: {
    job: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      expanded: false,
      currentDate: Date.now(),
      interval: null
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
        return Math.round(elapsed/1000) + ' seconds ago';
      }

      else if (elapsed < msPerHour) {
        return Math.round(elapsed/msPerMinute) + ' minutes ago';
      }

      else if (elapsed < msPerDay ) {
        clearInterval(this.interval);
        return Math.round(elapsed/msPerHour ) + ' hours ago';
      }

      else if (elapsed < msPerMonth) {
        clearInterval(this.interval);
        return Math.round(elapsed/msPerDay) + ' days ago';
      }

      else if (elapsed < msPerYear) {
        clearInterval(this.interval);
        return Math.round(elapsed/msPerMonth) + ' months ago';
      }

      else {
        clearInterval(this.interval);
        return Math.round(elapsed/msPerYear ) + ' years ago';
      }
    }
  },
  methods: {
    applyForJob(job) {
      const store = this.teacherStore;

      store.applyingJob.job = this.job;
      store.applyingJob.previous = store.jobSearchStatus;
      store.jobSearchStatus = 'applying';
    },
  },
  created() {
    this.interval = setInterval(() => this.currentDate = Date.now(), 1000);
  }
};
</script>

<style scoped>

.text-custom {
  font-size: 1.1rem;
}
</style>

