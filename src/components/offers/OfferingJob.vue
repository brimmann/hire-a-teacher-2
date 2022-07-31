<template>
  <div class="column q-mb-md">
    <div class="text-h6 text-grey">Select the job you are willing to offer</div>
    <q-btn-dropdown align="between" no-caps outline padding="sm xl" color="primary" :label="orgStore.jobs[selectedIndex].title">
      <q-list>
        <q-item v-for="(job, index) in orgStore.jobs" clickable v-close-popup :key="index" @click="selectedIndex = index">
          <q-item-section>
            <q-item-label>{{ job.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
  <single-job-item-org :job="orgStore.jobs[selectedIndex]" class="q-mb-md"/>

</template>

<script>
import SingleJobItemOrg from "components/job-applications/SingleJobItemOrg";
import {mapStores} from "pinia";
import {useOrgStore} from "stores/org";
export default {
  name: "OfferingJob",
  components: {SingleJobItemOrg},
  data() {
    return {
      selectedIndex: 0
    }
  },
  computed: {
    ...mapStores(useOrgStore),
  },
}
</script>

<style scoped>

</style>
