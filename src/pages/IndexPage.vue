<template>
  <q-page class="q-pt-xl column items-center" style="padding-right: 100px; padding-left: 100px">
    <div class="row justify-between full-width">
      <div class="q-py-xl column justify-center">
        <div class="text-h3 q-pa-none q-ma-none">Specialized</div>
        <div class="text-h3 q-pa-none q-ma-none q-mb-md">platform for teachers</div>
        <div class="text-subtitle1 text-grey-8">
          Best online platform for both teachers and educational institutions
        </div>
        <div class="text-caption q-mt-sm text-grey">
          40000+ teachers and institutions are using our platform
        </div>
        <div class="q-mt-xl">
          <q-btn size="1.2em" v-if="userType === 'teacher'" to="/teacher" unelevated color="primary" label="Go to your panel"/>
          <q-btn size="1.2em" v-else-if="userType === 'org'" to="/org" unelevated color="primary" label="Go to your panel"/>
          <temp v-else>
            <q-btn color="primary" to="/auth/register" size="1.2em" label="Sign up" unelevated />
            <q-btn
              label="Login"
              size="1.2em"
              class="q-ml-lg bg-white text-black"
              unelevated
              outline
              to="/auth/login"
            />
          </temp>
        </div>

      </div>
      <q-img
        src="../assets/landing_backround.jpg"
        fit="scale-down"
        :width="$q.screen.width > 1200 ? '45%' : '40%'"
      />
    </div>

    <div v-if="userType === null" class="column items-center q-my-xl q-pa-xl">
      <div class="text-h4 q-mb-lg">Are you given a token to rate your teacher?</div>
      <div style="width: 400px">
        <q-input
          outlined
          placeholder="Enter your token here"
          v-model="token"
          :error-message="commonStore.errorMessage"
          :error="commonStore.errorMessage !== null"
        >
          <template #after>
            <q-btn
              unelevated
              color="accent"
              label="start now"
              class="full-height"
              @click="startFeedback"
            />
          </template>
        </q-input>
        <div class="text-subtitle1 text-grey self-start q-mt-md">
          Please make sure you have a valid token given by your institution.
          <q-btn flat no-caps color="primary" label="Learn more" />
        </div>
      </div>
    </div>
    <div class="q-mb-xl q-py-xl self-start full-width" v-if="userType === null || userType === 'teacher'">
      <div class="text-h4 q-mb-lg">4 steps process to get hired</div>
      <div class="row justify-between q-pa-none">
        <q-card bordered flat square>
          <q-card-section class="row justify-center" style="width: 250px; height: 250px">
            <q-img src="../assets/step-1.png" width="150px" />
            <div class="text-body1">Create an account by simply filling the registering form.</div>
          </q-card-section>
        </q-card>
        <q-card bordered flat square>
          <q-card-section class="row justify-center" style="width: 250px; height: 250px">
            <q-img src="../assets/step-2.png" />
            <div class="text-body1">Build your resume using our resume builder</div>
          </q-card-section>
        </q-card>
        <q-card bordered flat square>
          <q-card-section class="row justify-center" style="width: 250px; height: 250px">
            <q-img src="../assets/step-3.png" />
            <div class="text-body1">Search and apply for jobs</div>
          </q-card-section>
        </q-card>
        <q-card bordered flat square>
          <q-card-section class="row justify-center" style="width: 250px; height: 250px">
            <q-img src="../assets/step-4.png" />
            <div class="text-body1">Get hired and get ranked</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="column full-width q-mb-xl" v-if="userType === null || userType === 'org'">
      <div class="row justify-between items-center full-width">
        <div>
          <div class="text-h4 q-mb-lg">Select a teacher based on ranking</div>
          <div class="text-body1" style="max-width: 500px">
            Unlike other job search platform, our platform let you choose a teacher based on the
            real time feedback and ranking. Our platform allow the students to rate their teacher
            using given token by their institution. This feature help employers make quick and best
            decisions.
          </div>
        </div>
        <q-img
          src="../assets/rank-back.png"
          fit="scale-down"
          :width="$q.screen.width > 1200 ? '45%' : '40%'"
        />
      </div>
      <div class="q-mt-xl">
        <div class="text-subtitle2 text-center q-mb-md">Top three teachers of the month</div>
        <div class="row justify-center q-gutter-md items-stretch">
          <q-card flat bordered>
            <q-card-section class="q-pr-xl">
              <div class="row items-center">
                <q-avatar>
                  <img src="../assets/ali.jpg" />
                </q-avatar>
                <div class="q-ml-md">
                  <div class="text-h6">Mohammad Ali</div>
                  <div class="text-body1">Math specialist</div>
                </div>
              </div>
              <q-chip
                class="q-ma-none q-mt-md"
                size="1.1em"
                square
                outline
                icon-right="star"
                label="4.6"
                color="yellow-9"
              />
            </q-card-section>
          </q-card>
          <q-card flat bordered>
            <q-card-section class="q-pr-xl">
              <div class="row items-center">
                <q-avatar>
                  <img src="../assets/ilyas.jpg" />
                </q-avatar>
                <div class="q-ml-md">
                  <div class="text-h6">Muhammad Ilyas</div>
                  <div class="text-body1">Backend instructor</div>
                </div>
              </div>
              <q-chip
                class="q-ma-none q-mt-md"
                size="1.1em"
                square
                outline
                icon-right="star"
                label="4.8"
                color="yellow-9"
              />
            </q-card-section>
          </q-card>
          <q-card flat bordered>
            <q-card-section class="q-pr-xl">
              <div class="row items-center">
                <q-avatar>
                  <img src="../assets/munib.jpg" />
                </q-avatar>
                <div class="q-ml-md">
                  <div class="text-h6">Munibullah</div>
                  <div class="text-body1">Vue JS trainer</div>
                </div>
              </div>
              <q-chip
                class="q-ma-none q-mt-md"
                size="1.1em"
                square
                outline
                icon-right="star"
                label="4.9"
                color="yellow-9"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <template v-if="userType === null || userType === 'teacher'">
      <q-separator class="full-width" />
      <div class="row q-mt-xl q-mb-xl q-gutter-xl">
        <div class="q-ma-none column q-mr-md q-gutter-md">
          <q-card flat square bordered class="q-mt-none">
            <q-card-section class="row items-center q-pa-xs" style="width: 250px">
              <q-img src="../assets/search-job.png" width="50px" />
              <div class="text-body2 q-ml-md">Easily search jobs</div>
            </q-card-section>
          </q-card>
          <q-card flat square bordered>
            <q-card-section class="row items-center q-pa-xs" style="width: 300px">
              <q-img src="../assets/instant-apply.png" width="50px" />
              <div class="text-body2 q-ml-md">Apply instantly for a job</div>
            </q-card-section>
          </q-card>
          <q-card flat square bordered>
            <q-card-section class="row items-center q-pa-xs" style="width: 300px">
              <q-img src="../assets/interviews.png" width="50px" />
              <div class="text-body2 q-ml-md">View your interviews</div>
            </q-card-section>
          </q-card>
          <q-card flat square bordered>
            <q-card-section class="row items-center q-pa-xs" style="width: 300px">
              <q-img src="../assets/manage.png" width="50px" />
              <div class="text-body2 q-ml-md">Manage applications and resume</div>
            </q-card-section>
          </q-card>
        </div>
        <q-img src="../assets/mobile-back.png" fit="scale-down" width="200px" class="q-ma-none" />
        <div class="q-ma-none q-ml-xl">
          <div class="text-h4">Teacher mobile App</div>
          <div class="text-body1" style="width: 300px">
            Teacher app helps you instantly access your teacher panel using your mobile to find and
            apply for jobs.
          </div>
          <div class="text-h5 q-mb-md q-mt-xl">Download our app</div>
          <div class="row q-ma-none">
            <q-img src="../assets/scan-me.png" fit="scale-down" class="q-ma-none" width="150px" />
            <div class="column justify-center items-stretch q-pt-xs" style="gap: 20px">
              <q-img src="../assets/play.png" fit="scale-down" width="150px" />
              <q-img
                src="../assets/app-store.png"
                fit="scale-down "
                class="q-ma-none"
                width="150px"
              />
            </div>
          </div>
        </div>
      </div>
    </template>

  </q-page>
</template>

<script>
import { useCommonStore } from 'stores/common';
import {mapState, mapWritableState} from 'pinia';
import { mapStores } from 'pinia/dist/pinia';
import {useUserStore} from "stores/user";

export default {
  name: 'MainLayout',
  data() {
    return {
      token: null
    }
  },
  computed: {
    ...mapWritableState(useCommonStore, ['step', 'feedback']),
    ...mapStores(useCommonStore),
    ...mapState(useUserStore, ['userType'])
  },
  methods: {
    async startFeedback() {
      await this.commonStore.get_info({token: this.token})
      this.commonStore.submittingToken = this.token;
      this.step = 2;
    },
  },
};
</script>

<style scoped>
.bg-image {
  height: 739px;
  background-image: url(../assets/mobile-back.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: -200px;
  background-position-y: -50px;
}
</style>
