<template>
  <q-card square flat bordered class="my-card">
    <q-card-section class="bg-teal text-white">
      <div class="text-h6" :class="{ 'text-custom': $q.screen.width < 500 }">
        {{ application.title }}
      </div>
      <div class="text-subtitle1 non-selectable">Applied on {{ dateApplied }}</div>
      <div class="text-body1 text-teal-3 non-selectable">
        {{ application.apps_no }} applications
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-mb-none">
      <div class="text-caption q-mb-sm">
        {{ application.exp_level }} - {{ application.type }} - Posted {{ postTime }}
      </div>
      <div class="text-grey">{{ application.city }} - {{ application.org_name}}</div>
      <div class="text-grey">Expires on July 22</div>
    </q-card-section>
    <q-separator inset />
    <q-card-actions class="q-px-md">
      <q-btn
        no-caps
        dense
        outline
        :loading="withdrawing"
        padding="sm"
        label="Withdraw application"
        unelevated
        @click="withdrawApplication"
      >
        <template #loading>
          <q-spinner-bars class="on-left" />
        </template>
      </q-btn>
      <q-space />
      <q-btn
        :ripple="false"
        dense
        unelevated
        no-caps
        text-color="primary"
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
        :label="expanded ? 'Hide details' : 'Show details'"
        :class="{ 'text-warning': expanded }"
      />
    </q-card-actions>
    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />
        <q-card-section class="q-py-sm">
          <div class="text-body1 text-grey q-mb-sm">Job description:</div>
          <div class="text-body1">
            {{ application.description }}
          </div>
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script>
import { mapStores } from 'pinia';
import { useTeacherStore } from 'stores/teacher';

export default{
  name: 'JobItemAppsTeacher',
  props: {
    application: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      expanded: false,
      currentDate: Date.now(),
      interval: null,
      withdrawing: false,
    };
  },
  computed: {
    ...mapStores(useTeacherStore),
    postTime() {
      const current = this.currentDate;
      const previous = new Date(parseInt(this.application.date_posted));
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
    dateApplied() {
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const date = new Date(parseInt(this.application.date_applied));
      const day = date.getDate();
      const month = date.getMonth();
      return `${day} ${monthNames[month]}`;
    }
  },
  methods: {
    async withdrawApplication() {
      const store = this.teacherStore;
      try {
        this.withdrawing = true;
        const index = store.applications.indexOf(this.application)
        await store.withdrawApplication(this.application.app_id);
        store.applications.splice(index, 1);
        this.withdrawing = false;
      } catch (e) {
        this.withdrawing = false;
        console.log('withdraw-error', e.message);
      }
    },
  },
  created() {
    this.interval = setInterval(() => (this.currentDate = Date.now()), 1000);
  },
};
</script>

<style scoped>
.text-custom {
  font-size: 1.1rem;
}
</style>
