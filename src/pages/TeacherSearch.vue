<template>
  <q-page padding class="column items-center" v-if="status === 'main'">
    <div style="width: 80%;max-width: 800px">
      <div class="self-start text-subtitle1 text-grey-8 q-mb-md">
        <span class="text-bold">Search result</span> - Jobs best match your query
      </div>
      <div class="column q-gutter-lg">
        <teacher-item-search v-for="i in 5" :key="i" @resume="status = 'resume'"/>
      </div>
    </div>
  </q-page>
  <q-page v-else padding class="column items-center">
    <div class="row q-mb-md justify-between items-center full-width">
      <q-btn flat no-caps color="primary" icon="arrow_back" label="Return back" @click="status = 'main'"/>
      <q-space />
      <q-btn
        unelevated
        no-caps
        color="primary"
        class="q-mr-md"
        label="Send job offer"
      />
    </div>
    <q-separator spaced class="full-width" style="max-width: 800px"/>
    <resume-public-view :resume-id="2" />
    <q-page-sticky @click="scrollToTop" position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        padding="md"
        align="center"
        no-caps
        dense
        icon="keyboard_arrow_up"
        color="accent"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import TeacherItemSearch from "components/teacher-search/TeacherItemSearch";
import ResumePublicView from "components/resume/ResumePublicView";
export default {
  name: 'TeacherSearch',
  components: {ResumePublicView, TeacherItemSearch},
  data() {
    return {
      status: 'main'
    }
  },
  methods: {
    scrollToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }
};
</script>

<style scoped></style>
