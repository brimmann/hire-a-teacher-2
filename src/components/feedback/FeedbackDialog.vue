<template>
  <q-dialog v-model="feedback" persistent>
    <q-card square flat class="full-width">
      <q-card-section class="row justify-between">
        <div class="text-subtitle1 text-bold">Rating your teacher</div>
        <q-space />
        <q-btn dense flat icon="close" @click="feedback = false" />
      </q-card-section>

      <q-stepper v-model="step" color="primary" animated>
        <q-step :name="1" title="Enter token" icon="token" :done="step > 1">
          <div class="text-body1 text-grey q-my-md">
            Please make sure you have a valid token given by your institution. Tokens are
            distributed by the employers who employed a teacher, for a specific teacher.
          </div>
          <q-input outlined v-model="token" placeholder="Enter your token here" :error-message="errorMessage" :error="errorMessage !== null" />
          <q-stepper-navigation>
            <q-btn @click="startFeedback" color="primary" label="Continue" />
          </q-stepper-navigation>
        </q-step>

        <q-step :name="2" title="Rate teacher" icon="location_on" :done="step > 2" class="text-center">
          <div class="q-mb-md text-body1 text-grey">Rate your teacher</div>
          <div class="text-h5">{{ info.teacher_name }}</div>
          <div class="text-subtitle2">{{ info.teacher_heading }}</div>
          <div class="text-subtitle2 text-grey q-mb-md">{{ info.org }}</div>
          <q-rating
            v-model="ratingModel"
            size="3.5em"
            color="yellow"
            icon-selected="star"
            icon="star_border"
            no-dimming
          >
            <template #tip-1>
              <q-tooltip>Too bad</q-tooltip>
            </template>
            <template #tip-2>
              <q-tooltip>Bad</q-tooltip>
            </template>
            <template #tip-3>
              <q-tooltip>Not bad</q-tooltip>
            </template>
            <template #tip-4>
              <q-tooltip>Good</q-tooltip>
            </template>
            <template #tip-5>
              <q-tooltip>Very good</q-tooltip>
            </template>
          </q-rating>
          <q-stepper-navigation>
            <q-btn @click="onSubmitRating" color="primary" label="Submit your feedback" />
            <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>

        <q-step :name="3" title="Finish" icon="calendar_month" :done="step > 3" class="text-center">
          <div class="text-h5">You successfully rated your teacher</div>
          <div class="text-h5 text-grey q-mt-md">{{ info.teacher_nam }}</div>
          <q-rating
            v-model="ratingModel"
            size="3.5em"
            color="yellow"
            icon-selected="star"
            icon="star_border"
            no-dimming
            readonly
          />
          <q-stepper-navigation>
            <q-btn color="primary" label="Finish" @click="feedback = false" />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </q-card>
  </q-dialog>
</template>

<script>
import {mapState, mapWritableState} from "pinia";
import {useCommonStore} from "stores/common";
import {mapStores} from "pinia/dist/pinia";

export default {
  name: "FeedbackDialog",
  data() {
    return {
      ratingModel: 1,
      token: null
    };
  },
  computed: {
    ...mapWritableState(useCommonStore, ['step','feedback', 'errorMessage']),
    ...mapState(useCommonStore, ['info']),
    ...mapStores(useCommonStore)
  },
  methods: {
    async onSubmitRating() {
      await this.commonStore.submitRating(this.ratingModel);
      this.step = 3
      this.commonStore.submittingToken = null;
    },
    async startFeedback() {
      await this.commonStore.get_info({token: this.token})
      this.commonStore.submittingToken = this.token;
    },
  }
}
</script>

<style scoped>

</style>
