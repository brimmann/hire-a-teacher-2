<template>
  <q-layout view="hhh LpR fff">
    <q-header class="bg-transparent q-mt-xl relative-position">
      <q-toolbar class="text-black row items-center" style="padding: 8px 100px">
        <q-img src="../assets/logo-3.png" width="170px" @click="$router.push('/')" class="cursor-pointer"/>
        <q-space />
        <div class="row justify-between q-gutter-lg text-subtitle1 text-orange-10">
          <div class="cursor-pointer non-selectable" @click="startFeedback">Rate teacher</div>
          <div class="cursor-pointer non-selectable" @click="$router.push('/about')">About us</div>
<!--          <div>Help center</div>-->
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <feedback-dialog/>
      <router-view />
    </q-page-container>
    <q-footer class="row justify-center q-py-xl" style="gap: 80px">
      <div>
        <q-img src="../assets/logo-2.png" width="250px" height="30px" position="-50px" />
        <div class="text-h6 q-mb-lg">Boost educations, write the future</div>
        <div class="row q-gutter-sm">
          <q-btn
            flat
            size="1.2em"
            :ripple="false"
            padding="none"
            icon="fab fa-facebook-square"
            href="https://www.facebook.com"
          />
          <q-btn
            flat
            size="1.2em"
            :ripple="false"
            padding="none"
            icon="fab fa-twitter-square"
            href="https://twitter.com"
          />
          <q-btn
            flat
            size="1.2em"
            :ripple="false"
            padding="none"
            icon="fab fa-linkedin"
            href="https://www.linkedin.com/feed/"
          />
        </div>
      </div>
      <div>
        <div class="text-subtitle1 text-bold" style="text-decoration: underline">Links</div>
        <div class="text-body1 q-mb-xs">About us</div>
        <div class="text-body1 q-mb-xs">Terms</div>
        <div class="text-body1">Policy</div>
      </div>
      <div>
        <div class="text-subtitle1 text-bold" style="text-decoration: underline">Contact</div>
        <div class="text-body1 q-mb-lg">
          Islamic University<br />
          H10 sector<br />
          Islamabad City<br />
          Islamabad<br />
          Pakistan
        </div>
        <div class="text-body1">
          contact@hireateacher.site<br />
          +92-325-3021332
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import FeedbackDialog from "components/feedback/FeedbackDialog";
import {mapWritableState} from "pinia";
import {useCommonStore} from "stores/common";
export default {
  name: 'MainLayout',
  components: {FeedbackDialog},
  computed: {
    ...mapWritableState(useCommonStore, ['feedback', 'step'])
  },
  methods: {
    startFeedback() {
      this.feedback = true;
      this.step = 1;
    }
  }
};
</script>

<style scoped></style>
