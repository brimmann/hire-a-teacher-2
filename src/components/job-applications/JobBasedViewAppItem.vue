<template>
  <q-card class="q-card full-width" square bordered flat>
    <q-card-section>
      <div class="text-subtitle1">Sent by {{ application.teacher_name }}</div>
      <div class="text-subtitle1 text-grey-5">4 hours ago</div>
      <q-separator spaced/>
      <q-btn
        color="primary"
        align="between"
        unelevated
        no-caps
        icon-right="keyboard_double_arrow_right"
        label="Review teacher resume"
        @click="$emit('resume', application)"
      />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'JobBasedViewAppItem',
  emits: ['resume'],
  props: {
    application: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped></style>
