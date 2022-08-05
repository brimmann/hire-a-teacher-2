<template>
  <q-card class="my-card" flat bordered>
    <q-card-section>
      <div class="text-h6">Web trainer</div>
      <div class="text-body1">38 Tokens, activate on September 1, 2022</div>
    </q-card-section>
    <q-separator />
    <q-card-actions>
      <q-space/>
      <q-btn
        :ripple="false"
        dense
        unelevated
        no-caps
        color="primary"
        flat
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
        :label="expanded ? 'Hide tokens' : 'View tokens'"
        :class="{ 'text-warning': expanded }"
      />
    </q-card-actions>
    <q-slide-transition>
      <div v-if="expanded">
        <q-card-section class="q-py-sm">
          <tokens-view/>
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script>
import TokensView from "components/hiring/TokensView";
export default {
  name: 'TokenItem',
  components: {TokensView},
  data() {
    return {
      expanded: false
    }
  }
};
</script>

<style scoped></style>
