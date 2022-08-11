<template>
  <q-card flat class="max-width q-mb-md" style="width: 100%">
    <q-form class="full-width q-col-gutter-md" @submit.prevent.stop="onSave">
      <q-input outlined v-model="introBuffer.fullName" label="Full Name" />
      <q-input
        outlined
        v-model="introBuffer.headline"
        label="Title"
        :rules="validationRules.title"
        lazy-rules
      />
      <q-input outlined v-model="introBuffer.phoneNumber" label="Phone Number" />
      <q-input
        outlined
        v-model="introBuffer.emailAddress"
        label="Email Address"
        :rules="validationRules.email"
        lazy-rules
      />
      <q-input
        outlined
        v-model="introBuffer.address"
        label="Address"
        :rules="validationRules.address"
        lazy-rules
      />
      <q-input
        outlined
        type="textarea"
        v-model="introBuffer.brief"
        :rules="validationRules.description"
        lazy-rules
        input-style="resize: none"
        class="full-width"
        bottom-slots
        label="Brief"
      >
        <template #counter>
          <div class="row justify-end">
            <div>{{ introBuffer.brief !== undefined ? introBuffer.brief.length : 0 }} Character</div>
          </div>
        </template>
      </q-input>
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
        <q-btn color="primary" label="Save" unelevated type="submit" />
      </div>
    </q-form>
    <q-space />
  </q-card>
</template>

<script>
import { mapStores } from 'pinia/dist/pinia.esm-browser';
import { useResumeStore } from 'stores/resume';

export default {
  name: 'ResumeAdding',
  data() {
    return {
      introBuffer: {
        editing: false,
        fullName: '',
        headline: '',
        phoneNumber: '',
        emailAddress: '',
        address: '',
        brief: '',
      },
      validationRules: {
        title: [(val) => !!val || 'Cannot be empty'],
        email: [(val) => !!val || 'Cannot be empty', (val) => val.includes('@') || 'Invalid email'],
        address: [
          (val) => !!val || 'Cannot be empty',
          (val) => val.length >= 16 || 'Address must be at least 24 characters',
        ],
        description: [
          (val) => !!val || 'Cannot be empty',
          (val) => val.length >= 150 || 'Description must be at least 150 characters',
        ],
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
          email: this.introBuffer.emailAddress,
        });
        this.resumeStore.noResume = false;
      } catch (e) {
        console.log('error here:', e);
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
};
</script>

<style scoped></style>
