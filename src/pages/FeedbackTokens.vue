<template>
  <q-page padding class="column items-center">
    <div style="width: 80%; max-width: 800px" class="column q-gutter-lg">
      <token-item v-for="i in 6" :key="i"/>
    </div>
  </q-page>
</template>

<script>
import TokenItem from "components/hiring/TokenItem";
export default {
  name: "FeedbackTokens",
  components: {TokenItem}
}
</script>

<style scoped>

</style>
