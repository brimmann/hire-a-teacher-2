<template>
  <q-card class="my-card full-width" square flat bordered>
    <q-card-section class="bg-teal text-white row" horizontal>
      <q-card-section class="col-7">
        <div class="text-h6">{{ appData.job.title }}</div>
        <div class="text-subtitle1">{{ appData.app.teacher_name }}</div>
        <div class="text-subtitle1 text-grey-5">4 hours ago</div>
      </q-card-section>

      <q-separator vertical color="teal-8" />

      <q-card-actions vertical class="col-5 column justify-around items-center q-px-lg">
        <q-btn
          color="primary"
          align="between"
          unelevated
          no-caps
          icon-right="keyboard_double_arrow_right"
          label="Review resume and proceed"
          @click="reviewResume"
        />
        <q-btn
          outline
          color="white"
          align="between"
          unelevated
          no-caps
          icon-right="keyboard_double_arrow_right"
          label="Goto job based view"
          @click="$emit('job-based', appData.job.id)"
        />
      </q-card-actions>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-mb-none">
      <div class="text-caption q-mb-sm">{{ appData.job.exp_level}} - {{ appData.job.type }} - Posted 4 days ago</div>
      <div class="text-grey">{{ appData.job.city }}</div>
      <div class="text-grey">Expires on July 22</div>
    </q-card-section>
    <q-separator inset />
    <q-card-actions>
      <q-btn
        :ripple="false"
        dense
        unelevated
        no-caps
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
        :label="expanded ? 'Hide job details' : 'Show job details'"
        :class="{ 'text-warning': expanded }"
      />
    </q-card-actions>
    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />
        <q-card-section class="q-py-sm">
          <div class="text-body1 text-grey q-mb-sm">Job description:</div>
          <div class="text-body1">{{ appData.job.description }}</div>
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script>
import {mapStores} from "pinia";
import {useOrgStore} from "stores/org";

export default {
  name: 'OrgApplicationItem',
  emits: ['resume', 'job-based'],
  props: {
    appData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      expanded: false,
    };
  },
  computed: {
    ...mapStores(useOrgStore)
  },
  methods: {
    reviewResume() {
      this.orgStore.viewingJob = this.appData.job;
      this.$emit('resume');
    }
  },
  mounted() {
    console.log(JSON.parse(JSON.stringify(this.appData)));
  }
};
</script>

<style scoped></style>
