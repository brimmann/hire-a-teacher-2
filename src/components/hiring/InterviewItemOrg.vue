<template>
  <q-card square flat bordered class="my-card">
    <q-card-section class="bg-teal text-white">
      <div class="text-h6" :class="{'text-custom': $q.screen.width < 500}">{{ job.title }}</div>
      <div class="row q-gutter-sm items-center">
        <div class="text-body1 text-teal-2">For Mohammad Rashid</div>
        <q-btn label="View resume" dense outline no-caps color="teal-2" icon="contact_page" @click="$emit('view-resume')"/>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-mb-none">
      <div class="text-caption q-mb-sm">{{ job.exp_level }} - {{ job.type }}</div>
      <div class="text-grey">{{ job.city }}</div>
    </q-card-section>
    <q-separator inset/>
    <q-card-section>
      <q-chip square outline icon="location_on" class="q-ma-none q-mb-sm text-caption" :ripple="false" label="Office address"/>
      <div class="text-body2">DIgital Code Office 203 Plaza 57 J&amp;K Arcade Civic Center Phase 4 Bahria Town Islamabad</div>
      <q-chip square outline icon="calendar_month" class="q-ma-none q-mb-sm q-mt-md text-caption" :ripple="false" label="Interview date"/>
      <div class="text-body2">
        <div>Tuesday, June 14, 2022</div>
        <dvi>3:00 pm - 3:45 pm GMT+5</dvi>
      </div>
    </q-card-section>
    <q-separator inset/>
    <q-card-actions class="q-px-md">
      <q-btn no-caps outline padding="sm lg" label="Reject applicant" unelevated @click="applyForJob"/>
      <q-btn no-caps padding="sm lg" color="primary" label="Select applicant" unelevated/>
      <q-space />
      <q-btn
        :ripple="false"
        dense
        unelevated
        no-caps
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
        :label="expanded ? 'Hide job details' : 'Show job details'"
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
export default {
  name: "InterviewItemOrg",
  emits:['view-resume'],
  props: {
    job: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      expanded: false,
    }
  }
}
</script>

<style scoped>

</style>
