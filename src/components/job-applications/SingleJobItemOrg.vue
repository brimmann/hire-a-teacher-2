<template>
  <q-card class="my-card full-width" square flat bordered>
    <q-card-section class="bg-teal text-white">
      <div class="text-h6">{{ job.title }}</div>
      <div class="text-subtitle1 text-grey-5">{{ job.apps_no }} applications</div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-mb-none">
      <div class="text-caption q-mb-sm">{{ job.exp_level }} - {{ job.type }} - Posted 4 days ago</div>
      <div class="text-grey">{{ job.city }}</div>
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
          <div class="text-body1">{{ job.description }}</div>
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script>
export default {
  name: 'SingleJobItemOrg',
  emits: ['resume'],
  props: {
    job: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      expanded: false,
    };
  },
};
</script>

<style scoped></style>
