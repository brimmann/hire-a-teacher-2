<template>
  <q-card square flat bordered class="my-card">
    <q-card-section>
      <div class="text-h6" :class="{ 'text-custom': $q.screen.width < 500 }">{{ teacher.full_name }}</div>
      <div class="text-subtitle1 non-selectable">{{ teacher.headline }}</div>
      <q-chip class="q-ma-none q-mt-sm" square outline icon-right="star" label="4.7" color="yellow-9"/>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-py-sm">
      <div class="text-body1 text-grey q-mb-sm">Teacher intro:</div>
      <div class="text-body1">{{ teacher.brief }}</div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'OfferReviewTeacherItem',
  emits: ['resume'],
  props: {
    teacher: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped></style>

