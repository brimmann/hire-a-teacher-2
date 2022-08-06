<template>
  <q-list bordered separator style="height: 300px;">
    <q-item v-for="(item, index) in visibleData" :key="index">
      <q-item-section>
        <div class="row justify-between items-center q-mr-sm">
          <div class="text-body1" :class="{'text-strike': item.status === 'used'}">{{ item.token }}</div>
          <div class="text-caption text-grey">{{ item.status }}</div>
        </div>
      </q-item-section>
      <q-separator vertical/>
      <q-item-section side style="width: 40px" class="row flex-center">
        <q-icon name="check" v-if="item.status === 'used'"/>
        <q-btn dense unelevated icon="content_copy" @click="copyToken(index)" v-else/>
      </q-item-section>
    </q-item>
  </q-list>
  <div class="q-pa-lg flex flex-center">
    <q-pagination outline v-model="current" :max="max" direction-links />
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useOrgStore } from 'stores/org';
import {copyToClipboard} from "quasar";

export default {
  name: 'TokensView',
  props: {
    tokens: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      current: 1,
    };
  },
  computed: {
    visibleData() {
      const data = this.tokens;
      const start = (this.current - 1) * 7;
      if(this.current === this.max) {
        return data.slice(start)
      }
      const end = (start + 7) - 1;
      return data.slice(start, end);
    },
    max() {
      const dataLength = this.tokens.length;
      return Math.ceil(dataLength / 7);
    },
  },
  methods: {
    copyToken(index) {
      copyToClipboard(this.tokens[index])
        .then(() => {
          this.$q.notify({
            message: 'copied to clipboard',
            type: 'info',
            position: 'bottom-right',
            timeout: 500
          })
        })
        .catch(() => {
          // fail
        })
    }
  }
};
</script>

<style scoped></style>
