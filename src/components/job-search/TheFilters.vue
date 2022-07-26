<template>
  <div class="q-pa-md" style="width: 100%">
    <q-scroll-area style="height: 40px" :horizontal-thumb-style="{ display: 'none' }">
      <div class="row no-wrap justify-center q-gutter-sm">
        <q-btn-dropdown color="primary" outline no-caps unelevated>
          <template #label>
            <q-btn
              v-if="filters.datePosted !== null"
              @click.stop="filters.datePosted = null"
              icon="close"
              color="red"
              dense
              flat
              size="sm"
              :ripple="false"
            />
            <label>{{ timeFilterList[filters.datePosted] || 'Date posted' }}</label>
          </template>
          <q-list>
            <q-item
              clickable
              v-close-popup
              v-for="(time, index) in timeFilterList"
              :key="index"
              @click="filters.datePosted = index"
            >
              <q-item-section>
                <q-item-label>{{ time }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn-dropdown color="primary" outline no-caps unelevated>
          <q-list>
            <q-item
              clickable
              v-close-popup
              v-for="(expLevel, index) in expLevelList"
              :key="index"
              @click="filters.expLevel = expLevel"
            >
              <q-item-section>
                <q-item-label>{{ expLevel }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <template #label>
            <q-btn
              v-if="filters.expLevel"
              @click.stop="filters.expLevel = null"
              icon="close"
              color="red"
              dense
              flat
              size="sm"
              :ripple="false"
            />
            <label>{{ filters.expLevel || 'Experience level' }}</label>
          </template>
        </q-btn-dropdown>
        <q-btn-dropdown color="primary" outline no-caps unelevated>
          <q-list>
            <q-item
              clickable
              v-close-popup
              v-for="(type, index) in jobTypeList"
              :key="index"
              @click="filters.jobType = type"
            >
              <q-item-section>
                <q-item-label>{{ type }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <template #label>
            <q-btn
              v-if="filters.jobType"
              @click.stop="filters.jobType = null"
              icon="close"
              color="red"
              dense
              flat
              size="sm"
              :ripple="false"
            />
            <label>{{ filters.jobType || 'Job type' }}</label>
          </template>
        </q-btn-dropdown>
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useTeacherStore } from 'stores/teacher';

export default {
  name: 'TheFilters',
  data() {
    return {
      expLevelList: ['No experience', 'Entry', 'Intermediate', 'Senior'],
      jobTypeList: ['Full-time', 'Part-time', 'Tuition'],
      timeFilterList: ['Last 24 hours', 'Last 3 days', 'Last 7 days', 'Last 14 days'],
      filters: {
        datePosted: null,
        expLevel: null,
        jobType: null,
      },
    };
  },
  computed: {
    ...mapStores(useTeacherStore),
  },
  watch: {
    filters: {
      handler: function (val) {
        this.teacherStore.filterJobs(this.filters);
      },
      deep: true
    }
  },
};
</script>

<style scoped></style>
