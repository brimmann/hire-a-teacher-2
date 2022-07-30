<template>
  <q-card square flat bordered class="my-card">
    <q-card-section>
      <div class="text-h6" :class="{ 'text-custom': $q.screen.width < 500 }">Mohammad Rashid</div>
      <div class="text-subtitle1 non-selectable">Math Teacher</div>
      <q-chip class="q-ma-none q-mt-sm" square outline icon-right="star" label="4.7" color="yellow-9"/>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-py-sm">
      <div class="text-body1 text-grey q-mb-sm">Teacher intro:</div>
      <div class="text-body1">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad aperiam architecto,
        atque aut blanditiis culpa, cupiditate ducimus eaque enim hic iste magni maxime nemo, non
        odio ullam! A consequatur consequuntur dignissimos enim eum ex fuga, hic incidunt itaque
        labore natus nesciunt nobis officia quo rem sed soluta suscipit ut velit voluptatem!
        Consequatur dolor eius esse est harum, hic, impedit incidunt itaque iusto necessitatibus
        nulla obcaecati odio quos soluta unde vel voluptatum? At consequuntur dolores fugiat illum
        iure labore praesentium ut voluptatibus. Quia, quo, sunt? Accusamus deleniti dignissimos
        doloribus, expedita facere ipsa modi obcaecati, odio quo reprehenderit sed sit tempore.
      </div>
    </q-card-section>
    <q-separator inset />
    <q-card-actions class="q-px-md">
      <q-btn no-caps padding="sm lg" outline unelevated label="Send job offer" />
      <q-space />
      <q-btn no-caps padding="sm lg" color="primary" label="View resume" @click="$emit('resume')" unelevated />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'TeacherItemSearch',
  emits: ['resume']
};
</script>

<style scoped></style>
