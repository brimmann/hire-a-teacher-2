<template>
  <q-card square flat bordered class="my-card">
    <q-card-section class="bg-teal text-white">
      <div class="text-h6">{{ job.title }}</div>
      <div class="text-subtitle1 text-teal-3 cursor-pointer non-selectable">{{ job.apps_no }} applications</div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn dense unelevated  no-caps icon="delete" label="Delete job" />
      <q-btn dense unelevated  no-caps icon="edit" label="Edit job" @click="$emit('edit')"/>
      <q-toggle v-model="jobActive" label="Activate job" />
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
        <q-separator />
        <q-card-section class="q-mb-none">
          <div class="text-caption q-mb-sm">{{ job.exp_level }} - {{ job.type }} - Posted {{ postTime }}</div>
          <div class="text-grey">{{ job.city }}</div>
          <div class="text-grey">Expires on July 22</div>
        </q-card-section>
        <q-separator inset />
        <q-card-section class="text-body1">{{ job.description }}</q-card-section>
        <q-separator inset />
        <q-card-section>
          <div class="text-caption text-grey q-mb-sm">
            These tags will not appear to people that view jobs, it will only be used by search
            engines
          </div>
          <q-chip v-for="(tag, index) in job.tags" class="text-uppercase" outline square dense :label="'#' + tag" :key="index"/>
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script>

export default {
  name: 'JobItem',
  props: {
    job: {
      type: Object,
      required: true,
    }
  },
  emits: ['edit'],
  data() {
    return {
      jobActive: false,
      expanded: false,
      currentDate: Date.now(),
      interval: null
    };
  },
  computed: {
    postTime() {
      const current = this.currentDate;
      const previous = new Date(parseInt(this.job.date_posted));
      const msPerMinute = 60 * 1000;
      const msPerHour = msPerMinute * 60;
      const msPerDay = msPerHour * 24;
      const msPerMonth = msPerDay * 30;
      const msPerYear = msPerDay * 365;
      console.log(current, previous);

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
  created() {
    this.interval = setInterval(() => this.currentDate = Date.now(), 1);
  }
};
</script>

<style scoped></style>
