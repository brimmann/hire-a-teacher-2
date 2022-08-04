<template>
  <q-page padding class="column items-center">
    <div
      class="text-subtitle1 text-grey-8 text-center"
      v-if="teacherStore.interviews.length < 1"
    >
      <span class="text-bold">No interviews</span>
    </div>
    <div style="width: 80%; max-width: 800px" v-else>
      <interview-item
        class="q-mb-lg"
        v-for="(interview, index) in teacherStore.interviews"
        :job="interview.job"
        :interview="interview.interview"
        :index="index"
        :key="index"
      />
    </div>
  </q-page>
</template>

<script>
import InterviewItem from 'components/hiring/InterviewItem';
import { mapStores } from 'pinia';
import { useTeacherStore } from 'stores/teacher';
export default {
  name: 'TeacherInterview',
  components: { InterviewItem },
  computed: {
    ...mapStores(useTeacherStore),
  },
  created() {
    this.teacherStore.getInterviews();
  },
};
</script>
