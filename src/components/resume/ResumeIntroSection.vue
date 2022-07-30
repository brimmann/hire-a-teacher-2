<template>
  <q-card
    flat
    class="max-width q-mb-md q-col-gutter-md"
    style="width: 100%"
    v-if="resumeStore.intro.editing"
  >
    <q-input outlined hint="Full Name must be modified in settings" readonly v-model="introBuffer.fullName" label="Full Name" />
    <q-input outlined v-model="introBuffer.headline" label="Title" />
    <q-input outlined hint="Phone Number must be modified in settings" readonly v-model="introBuffer.phoneNumber" label="Phone Number" />
    <q-input outlined v-model="introBuffer.emailAddress" label="Email Address" />
    <q-input outlined v-model="introBuffer.address" label="Address" />
    <q-input outlined type="textarea" v-model="introBuffer.brief" label="Description" />
    <div class="flex-center">
      <q-btn
        outline
        color="white"
        text-color="black"
        label="Discard Changes"
        class="q-mr-md"
        @click="onDiscardChangesIntro"
        unelevated
      />
      <q-btn color="primary" label="Save Changes" unelevated @click="onSaveChangesIntro" />
    </div>
    <q-space />
  </q-card>
  <q-card flat class="max-width" style="width: 100%" v-else>
    <q-card-section class="row">
      <div class="text-h5" ref="test-ref">{{ resumeStore.intro.fullName }}</div>
      <q-space />
      <q-btn flat v-if="!readOnly" round color="accent" icon="edit" @click="resumeStore.intro.editing = true" />
    </q-card-section>
    <q-card-section>
      <div class="text-subtitle1 q-mb-sm">{{ resumeStore.intro.headline }}</div>
      <div class="text-body2">{{ resumeStore.intro.phoneNumber }}</div>
      <div class="text-body2">{{ resumeStore.intro.emailAddress }}</div>
      <div class="text-body2 q-mb-lg">{{ resumeStore.intro.address }}</div>
      <div>{{ resumeStore.intro.brief }}</div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapStores } from 'pinia/dist/pinia.esm-browser';
import { useResumeStore } from 'stores/resume';

export default {
  name: 'ResumeIntroSection',
  props: {
    readOnly: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      introBuffer: {
        editing: false,
        fullName: '',
        headline: '',
        phoneNumber: '',
        emailAddress: '',
        address: '',
        brief:''
      },
    };
  },
  computed: {
    ...mapStores(useResumeStore),
  },
  methods: {
    onSaveChangesIntro() {
      this.resumeStore.intro = this.introBuffer;
      this.resumeStore.intro.editing = false;
      this.resumeStore.updateResume(this.introBuffer);
    },
    onDiscardChangesIntro() {
      this.introBuffer = this.resumeStore.intro;
      this.resumeStore.intro.editing = false;
    },
  },
  mounted() {
    this.introBuffer = JSON.parse(JSON.stringify(this.resumeStore.intro));
  },
};
</script>

<style scoped></style>
