<template>
  <q-layout view="lHh lpR lFf">
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
        >
          <template v-slot:append>
            <q-btn flat round color="primary" icon="search" />
          </template>
        </q-input>
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
          <q-item clickable v-ripple to="/teacher/offers" exact>
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section> Logout </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="../assets/background-mat-1.jpg" style="height: 200px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="100px" class="q-mb-sm">
            <img src="../assets/ali.jpg" />
          </q-avatar>
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
export default {
  name: 'TeacherPanel',
  data() {
    return {
      leftDrawerOpen: false,
    };
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
};
</script>
