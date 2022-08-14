<template>
  <q-layout view="lhh LpR lFf">
    <q-header
      class="bg-primary text-white"

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

        <template v-if="$q.screen.width > 1024 && headerTitle">
          <q-icon :name="headerTitle.icon" size="1.5rem" />
          <q-toolbar-title>{{ headerTitle.text }}</q-toolbar-title>
        </template>

        <div
          v-if="$route.name === 'search'"
          class="absolute-center row flex-center"
          style="width: 60%; min-width: 200px"
        >
          <q-input
            outlined
            square
            v-model="searchString"
            dense
            class="bg-white"
            placeholder="Search i.e math, english"
            style="flex-grow: 1"
            :loading="loading"
          >
            <template #append>
              <q-btn
                flat
                color="primary"
                icon="search"
                v-if="$q.screen.width < 575"
                v-show="!loading"
                @click="searchJob"
              />
              <q-icon color="primary" name="search" v-show="!loading" v-else/>
            </template>
          </q-input>
          <q-btn
            color="brown-7"
            no-caps
            text-color="white"
            unelevated
            class="q-ml-sm"
            label="Search"
            style="height: 40px"
            v-if="$q.screen.width > 575"
            @click="searchJob"
          />
        </div>
        <q-space />
        <template v-if="resumeStore.adding.resume || !resumeStore.noResume || !($route.name === 'resume')">
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
        </template>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="this.$q.screen.xs ? 250 : 300"
      :breakpoint="1024"
    >
      <q-scroll-area
        style="height: calc(100% - 220px); margin-top: 220px; border-right: 1px solid #ddd"
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
              <q-icon name="contact_page" />
            </q-item-section>

            <q-item-section> Resume </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/teacher/applications" exact>
            <q-item-section avatar>
              <q-icon name="work" />
            </q-item-section>

            <q-item-section> Job Applications </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/teacher/interviews" exact>
            <q-item-section avatar>
              <q-icon name="live_help" />
            </q-item-section>

            <q-item-section> Interviews </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="logout">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section> Logout </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="../assets/background-mat-1.jpg" style="height: 220px">

        <div class="absolute-bottom bg-transparent">
          <div
            class="bg-grey-1 text-black text-h4 text-center row flex-center"
            style="border-radius: 50%; height: 100px; width: 100px"
          >
            <div>{{ avatar }}</div>
          </div>
          <div class="text-weight-bold q-pa-xs">{{ userStore.userDetails.full_name }}</div>
          <div class="text-subtitle2 q-pl-xs">{{ resumeStore.intro.headline}}</div>
          <q-chip outline square dense color="yellow" icon="star"> {{ rating || 0 }} </q-chip>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container id="page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapStores } from 'pinia/dist/pinia';
import { useResumeStore } from 'stores/resume';
import { useUserStore } from 'stores/user';
import { useTeacherStore } from 'stores/teacher';

export default {
  name: 'TeacherPanel',
  data() {
    return {
      leftDrawerOpen: false,
      searchString: '',
      loading: false,
    };
  },
  computed: {
    ...mapStores(useResumeStore, useUserStore, useTeacherStore),
    avatar() {
      const fullName = this.userStore.userDetails.full_name;
      const index = fullName.indexOf(' ');
      if (index !== -1) {
        return fullName[0] + fullName[index + 1];
      } else {
        return fullName[0] + fullName[1];
      }
    },
    rating() {
      return this.resumeStore.intro.ranking;
    },
    headerTitle() {
      switch (this.$route.name) {
        case 't-search':
          return null;
        case 'resume':
          return { text: 'Resume', icon: 'contact_page' };
        case 'app':
          return { text: 'Job applications', icon: 'work' };
        case 'interviews':
          return { text: 'Interviews', icon: 'drafts' };
        default:
          return null;
      }
    },
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    async searchJob() {
      if (this.searchString === '') {
        return;
      }
      this.teacherStore.applyingJob.searchString = this.searchString;
      try {
        this.loading = true;
        await this.teacherStore.searchJobs(this.searchString.replace('teacher', '').trim());
        this.loading = false;
        this.teacherStore.jobSearchStatus = 'search';
        this.teacherStore.filterJobs(this.teacherStore.applyingJob.filters);
      } catch (e) {
        this.loading = false;
      }
    },
    logout() {
      this.userStore.logout();
      this.$router.push('/');
    }
  },
  mounted() {
    this.resumeStore.getResume();
  }
};
</script>

<style>
.max-width {
  max-width: 800px;
}
</style>
