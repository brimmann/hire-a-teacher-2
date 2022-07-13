<template>
  <q-card
    flat
    class="max-width q-mb-md q-col-gutter-md"
    style="width: 100%"
  >
    <q-input outlined v-model="introBuffer.fullName" label="Full Name" />
    <q-input outlined v-model="introBuffer.headline" label="Title" />
    <q-input outlined v-model="introBuffer.phoneNumber" label="Phone Number" />
    <q-input outlined v-model="introBuffer.emailAddress" label="Email Address" />
    <q-input outlined v-model="introBuffer.address" label="Address" />
    <q-input outlined type="textarea" v-model="introBuffer.brief" label="Brief" />
    <div class="flex-center">
      <q-btn
        outline
        color="white"
        text-color="black"
        label="Cancel"
        class="q-mr-md"
        @click="onCancel"
        unelevated
      />
      <q-btn color="primary" label="Save" unelevated @click="onSave" />
    </div>
    <q-space />
  </q-card>
</template>

<script>
import {mapStores} from "pinia/dist/pinia.esm-browser";
import {useResumeStore} from "stores/resume";

export default {
  name: "ResumeAdding",
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
    async onSave() {
      this.resumeStore.adding.resume = false;
      this.resumeStore.intro = JSON.parse(JSON.stringify(this.introBuffer));
      this.resumeStore.intro.editing = false;

      try {
        await this.resumeStore.createResume({
          heading: this.introBuffer.headline,
          address: this.introBuffer.address,
          brief: this.introBuffer.brief,
          email: this.introBuffer.emailAddress
        });
        this.resumeStore.noResume = false;
      } catch (e) {
        console.log("error here:", e);
      }
    },
    onCancel() {
      this.resumeStore.adding.resume = false;
      // this.introBuffer = this.resumeStore.intro;
      // this.resumeStore.intro.editing = false;
    },
  },
  mounted() {
    this.introBuffer = JSON.parse(JSON.stringify(this.resumeStore.intro));
  },
}
</script>

<style scoped>

</style>
