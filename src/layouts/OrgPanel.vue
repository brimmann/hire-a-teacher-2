<template>
  <q-layout view="lHh LpR lFf">
    <q-header class="bg-primary text-white">
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
        <template v-if="$q.screen.width > 675 && headerTitle">
          <q-icon :name="headerTitle.icon" size="1.5rem" />
          <q-toolbar-title>
            {{ headerTitle.text }}
            <span v-if="subtitle" class="text-grey-5"> | {{ subtitle }}</span>
          </q-toolbar-title>
        </template>
        <div
          v-if="$route.name === 't-search'"
          class="absolute-center row flex-center"
          style="width: 60%; min-width: 200px"
        >
          <q-input
            outlined
            square
            dense
            class="bg-white"
            placeholder="Search i.e math, english"
            style="flex-grow: 1"
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
        <template
          v-if="$route.name === 'dashboard' && orgStore.determiners.dashboardState === 'jobs-list'"
        >
          <q-separator dark vertical />
          <q-btn
            stretch
            flat
            label="Post a new job"
            icon="add"
            no-caps
            @click="orgStore.determiners.dashboardState = 'adding'"
          />
        </template>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="this.$q.screen.xs ? 250 : 300"
      :breakpoint="1045"
    >
      <q-scroll-area
        style="height: calc(100% - 200px); margin-top: 200px; border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item clickable v-ripple to="/org/dashboard" exact>
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>

            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/org/search" exact>
            <q-item-section avatar>
              <q-icon name="search" />
            </q-item-section>

            <q-item-section> Teacher search </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/org/applications" exact>
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>

            <q-item-section> Applications </q-item-section>
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
            <div>OR</div>
          </div>
          <div class="text-weight-bold q-pa-xs q-mt-sm">Internation Islamic University</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapStores } from 'pinia';
import { useOrgStore } from 'stores/org';

export default {
  name: 'OrgPanel',
  data() {
    return {
      leftDrawerOpen: false,
    };
  },
  computed: {
    ...mapStores(useOrgStore),
    subtitle() {
      if (this.orgStore.determiners.dashboardState === 'adding') {
        return 'Adding a new job';
      } else if(this.orgStore.determiners.dashboardState === 'editing') {
        return 'Editing job';
      } else {
        return null;
      }
    },
    headerTitle() {
      switch (this.$route.name) {
        case 'dashboard':
          return {
            text: 'Dashboard',
            icon: 'dashboard',
          };
        case 't-search':
          return null;
        case 'o-app':
          return { text: 'Applications', icon: 'drafts' };
        default:
          return null;
      }
    },
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
};
</script>

<style>
.max-width {
  max-width: 800px;
}
</style>
