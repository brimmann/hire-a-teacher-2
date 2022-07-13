<template>
  <q-layout view="lHh LpR lFf">
    <q-header
      class="bg-primary text-white"
      v-if="(resumeStore.adding.resume || !resumeStore.noResume) || !($route.name === 'resume')"
    >
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
          v-if="$q.platform.is.mobile || !leftDrawerOpen"
        />

        <q-input
          outlined
          square
          v-model="text"
          dense
          class="bg-white absolute-center"
          style="width: 60%; min-width: 200px"
          placeholder="Search i.e math, Lahore"
          v-if="$route.name === 'search'"
        >
          <template #append>
            <q-btn flat round color="primary" icon="search" />
          </template>
        </q-input>
        <q-space />
        <q-separator dark vertical v-if="$route.name === 'resume' && $q.screen.width > 675" />
        <q-btn
          stretch
          flat
          label="Print"
          icon="print"
          no-caps
          v-if="$route.name === 'resume' && $q.screen.width > 675"
        />
        <q-separator dark vertical v-if="$route.name === 'resume' && $q.screen.width > 675" />
        <q-btn
          stretch
          flat
          label="Download PDF"
          icon="download"
          no-caps
          v-if="$route.name === 'resume' && $q.screen.width > 675"
        />
        <q-btn-dropdown
          flat
          padding="0"
          no-caps
          dropdown-icon="more_vert"
          @click="onMainClick"
          :menu-offset="[11, 13]"
          unelevated
          content-style="border-radius: 0px;"
          auto-close
          v-if="$q.screen.width < 675"
        >
          <q-list separator>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-btn stretch flat label="Download PDF" icon="download" no-caps />
            </q-item>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-btn stretch flat label="Print" icon="print" no-caps />
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="this.$q.screen.xs ? 250 : 300"
      :breakpoint="675"
    >
      <q-scroll-area
        style="height: calc(100% - 200px); margin-top: 200px; border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item clickable v-ripple to="/teacher/search" exact>
            <q-item-section avatar>
              <q-icon name="search" />
            </q-item-section>

            <q-item-section> Job search </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/teacher/resume" exact>
            <q-item-section avatar>
              <q-icon name="contact_page" color="black" />
            </q-item-section>

            <q-item-section> Resume </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/teacher/applications" exact>
            <q-item-section avatar>
              <q-icon name="work" />
            </q-item-section>

            <q-item-section> Job Applications </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/teacher/offers" exact>
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>

            <q-item-section> Job Offers </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section> Logout </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="../assets/background-mat-1.jpg" style="height: 200px">
        <div class="absolute-bottom bg-transparent">
          <div
            class="bg-grey-1 text-black text-h4 text-center row flex-center"
            style="border-radius: 50%; height: 100px; width: 100px"
          >
            <div>{{ avatar }}</div>
          </div>
          <div class="text-weight-bold q-pa-xs">Mohammad Ali</div>
          <q-chip outline square dense color="white" text-color="white" icon="star"> 4.7 </q-chip>
          <q-chip outline square dense color="white" label="Hired" text-color="white" icon="check">
          </q-chip>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapStores } from 'pinia/dist/pinia';
import { useResumeStore } from 'stores/resume';
import {useUserStore} from "stores/user";

export default {
  name: 'TeacherPanel',
  data() {
    return {
      leftDrawerOpen: false,
    };
  },
  computed: {
    ...mapStores(useResumeStore, useUserStore),
    avatar() {
      const fullName = this.userStore.userDetails.full_name;
      const index = fullName.indexOf(' ');
      if (index !== -1) {
        return fullName[0] + fullName[index + 1];
      } else {
        return fullName[0] + fullName[1];
      }
    }
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
};
</script>
