<template>
  <q-card square flat bordered class="my-card">
    <q-card-section>
      <div class="text-h6">Math Teacher</div>
      <div class="text-subtitle1 text-light-blue cursor-pointer non-selectable">8 applications</div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn dense unelevated outline icon="delete" label="Delete job" />
      <q-btn dense unelevated outline icon="edit" label="Edit job" />
      <q-toggle v-model="jobActive" label="Activate job" />
      <q-space />
      <q-btn
        :ripple="false"
        dense
        unelevated
        outline
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
        label="See details"
      />
    </q-card-actions>
    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />
        <q-card-section class="q-mb-none">
          <div class="text-caption q-mb-sm">Entry level - Full-time - Posted 2 days ago</div>
          <div class="text-grey">Islamabad</div>
          <div class="text-grey">Expires on July 22</div>
        </q-card-section>
        <q-separator inset/>
        <q-card-section class="text-body1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium autem cum
          cupiditate deserunt est eum, fugit inventore iure minima minus mollitia nam non nulla
          omnis perspiciatis provident quae quidem quis reprehenderit sunt ut veniam voluptates?
          Porro, sunt, voluptates? Ad atque aut autem consequuntur, corporis deserunt distinctio
          doloremque dolores ducimus ea eos et ex fugit in itaque labore libero magni minima minus
          modi molestiae mollitia neque non nulla officiis pariatur quae quam, quia quibusdam quidem
          quo recusandae repellendus repudiandae sint sit vel vero! Ab adipisci at cupiditate
          delectus doloribus hic in minima, minus modi quasi qui sunt totam voluptate voluptatem.
        </q-card-section>
        <q-separator inset/>
        <q-card-section>
          <div class="text-caption text-grey q-mb-sm">These tags will not appear to people that view jobs, it will only be used by search engines</div>
          <q-chip class="text-uppercase" outline square dense label="#math"/>
          <q-chip class="text-uppercase" outline square dense label="#school"/>
          <q-chip class="text-uppercase" outline square dense label="#teacher"/>
          <q-chip class="text-uppercase" outline square dense label="#partt"/>
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script>
export default {
  name: 'JobItem',
  data() {
    return {
      jobActive: false,
      expanded: false,
    };
  },
};
</script>

<style scoped></style>
