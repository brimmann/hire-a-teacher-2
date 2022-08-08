<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import { useUserStore } from 'stores/user';

export default defineComponent({
  name: 'App',
  computed: {
    ...mapStores(useUserStore),
  },
  beforeMount() {
    this.userStore.loadUser();
  },
});
</script>

