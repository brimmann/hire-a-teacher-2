<template>
  <div style="border: 1px solid #d8d8d8" class="q-pa-lg">
    <q-input
      outlined
      bottom-slots
      v-model="tagInputModel"
      label="Tag"
      class="q-mb-md"
      maxlength="24"
      mask="XXXXXXXXXXXXXXXXXXXXXXXX"
    >
      <template #hint>
        <span id="hint-span">Maximum 5 tags allowed without space and symbols</span>
      </template>

      <template #append>
        <q-icon name="info" class="cursor-pointer" color="primary">
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">
            Tags are simple pieces of data that describe information on a document, web<br />
            page, or another digital file that make it easy to locate related items that have the
            same<br />
            tag.
          </q-tooltip>
        </q-icon>
      </template>

      <template #after>
        <q-btn outline icon-right="add" @click="addTag" label="Add tag" style="height: 56px" />
      </template>
    </q-input>
    <q-separator />
    <div style="min-height: 50px" class="q-pa-sm row wrap">
      <div class="text-center self-center" style="margin-top: 30px" v-if="modelValue.length === 0">
        Not tags added yet, start adding some tags
      </div>
      <q-chip
        v-for="(item, index) in modelValue"
        square
        outline
        removable
        @remove="removeTag(index)"
        :key="index"
        >{{ item }}</q-chip
      >
    </div>
  </div>
</template>

<script>
import {nextTick} from "vue";

export default {
  name: 'TagsManager',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      tags: [],
      tagInputModel: '',
    };
  },
  methods: {
    addTag() {
      if (this.tags.length < 5) {
        this.tags.push(this.tagInputModel);
        this.tagInputModel = '';
        this.value = this.tags;
        this.$emit('update:modelValue', JSON.parse(JSON.stringify(this.tags)));
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1)
      this.$emit('update:modelValue', JSON.parse(JSON.stringify(this.tags)))
    }
  },
  mounted() {
    console.log('in', this.modelValue);
    nextTick(() => this.tags = JSON.parse(JSON.stringify(this.modelValue)));
  }
};
</script>

<style scoped></style>
