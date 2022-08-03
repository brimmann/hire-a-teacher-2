<template>
 <q-page padding class="column flex-center">
   <div style="width: 80%; max-width: 800px">
     <interview-item class="q-mb-lg" :job="orgStore.offeringJob" v-for="i in 2" :key="i"/>
   </div>
 </q-page>
</template>

<script>


import InterviewItem from "components/hiring/InterviewItem";
import {mapStores} from "pinia";
import {useOrgStore} from "stores/org";
export default {
  name: "TeacherInterview",
  components: {InterviewItem},
  computed: {
    ...mapStores(useOrgStore)
  }
}
</script>
