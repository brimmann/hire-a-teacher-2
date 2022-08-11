<template>
  <q-card flat class="max-width q-mb-md" style="width: 100%" v-if="resumeStore.intro.editing">
    <q-form @submit.prevent.stop="confirmChanges" class="full-width q-col-gutter-md">
      <q-input
        outlined
        hint="Full Name must be modified in settings"
        readonly
        v-model="introBuffer.fullName"
        label="Full Name"
      />
      <q-input
        outlined
        v-model="introBuffer.headline"
        label="Title"
        :rules="validationRules.title"
        lazy-rules
      />
      <q-input
        outlined
        hint="Phone Number must be modified in settings"
        readonly
        v-model="introBuffer.phoneNumber"
        label="Phone Number"
      />
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
        label="Description"
        :rules="validationRules.description"
        lazy-rules
        input-style="resize: none"
      >
        <template #hint>
          <div class="row justify-end">
            <div>{{ introBuffer.brief.length }} Character</div>
          </div>
        </template>
      </q-input>
      <div class="flex-center">
        <q-btn
          outline
          color="white"
          text-color="black"
          label="Discard Changes"
          class="q-mr-md"
          @click="confirmDiscardChanges"
          unelevated
        />
        <q-btn type="submit" color="primary" label="Save Changes" unelevated />
      </div>
    </q-form>
    <q-space />
  </q-card>
  <q-card flat class="max-width" style="width: 100%" v-else>
    <q-card-section class="row q-py-sm">
      <div class="text-h5" ref="test-ref">{{ resumeStore.intro.fullName }}</div>
      <q-space />
      <q-btn
        flat
        v-if="!readOnly"
        round
        color="accent"
        icon="edit"
        @click="resumeStore.intro.editing = true"
      />
    </q-card-section>
    <q-card-section class="q-my-none q-py-none q-mb-sm">
      <div class="text-subtitle1 q-mb-sm">{{ resumeStore.intro.headline }}</div>
      <div class="column">
        <div class="inline-block q-mb-xs">
          <q-chip
            class="q-ma-none"
            square
            outline
            icon-right="star"
            :label="resumeStore.intro.ranking"
            color="yellow-9"
          />
        </div>
        <di class="text-caption text-grey"> {{ resumeStore.intro.students }} Students</di>
      </div>
    </q-card-section>
    <q-card-section>
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
      default: false,
    },
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
    onSaveChangesIntro() {
      this.resumeStore.intro = this.introBuffer;
      this.resumeStore.intro.editing = false;
      this.resumeStore.updateResume(this.introBuffer);
    },
    confirmChanges() {
      this.$q.dialog({
        title: 'Saving changes',
        message: 'Do you want to save changes?',
        ok: "Yes",
        cancel: "No",
        persistent: true
      }).onOk(data => {
        this.onSaveChangesIntro();
      })
    },
    confirmDiscardChanges() {
      this.$q.dialog({
        title: 'Discarding changes',
        message: 'Do you want to discard changes?',
        ok: "Yes",
        cancel: "No",
        persistent: true
      }).onOk(data => {
        this.onDiscardChangesIntro();
      })
    },
    onDiscardChangesIntro() {
      this.introBuffer = this.resumeStore.intro;
      this.resumeStore.intro.editing = false;
    },
  },
  mounted() {
    this.introBuffer = JSON.parse(JSON.stringify(this.resumeStore.intro));
    this.resumeStore.getResume();
  },
};
</script>

<style scoped></style>
