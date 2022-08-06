<template>
  <q-page padding class="column items-center">
    <div style="width: 80%; max-width: 800px" class="column q-gutter-lg">
      <token-item v-for="(token, index) in orgStore.tokens" :key="index" :token="token"/>
    </div>
  </q-page>
</template>

<script>
import TokenItem from "components/hiring/TokenItem";
import {mapStores} from "pinia/dist/pinia";
import {useOrgStore} from "stores/org";
export default {
  name: "FeedbackTokens",
  components: {TokenItem},
  computed: {
    ...mapStores(useOrgStore),
  },
  beforeMount() {
    this.orgStore.getTokens();
  }
}
</script>

<style scoped>

</style>
