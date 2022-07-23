<template>
<q-page class="column flex-center">
  <q-spinner-hourglass
    color="primary"
    size="8em"
  />
  <div class="text-body1 text-grey"><slot></slot></div>
</q-page>
</template>

<script>
export default {
  name: "WaitingPage"
}
</script>

<style scoped>

</style>
