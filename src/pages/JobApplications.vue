<template>
  <q-page padding class="column items-center" >
    <h1>applications</h1>
  </q-page>
</template>

<script>
import {mapStores} from "pinia";
import {useTeacherStore} from "stores/teacher";
export default {
  name: "JobApplications",
  computed: {
    ...mapStores(useTeacherStore)
  },
}
</script>

<style scoped>

</style>
