<template>
  <q-card
    flat
    bordered
    class="q-pa-lg column"
    style="gap: 16px"
  >
    <q-input outlined v-model="newJob.title" label="Title" />
    <q-select
      style="width: 62%"
      outlined
      v-model="newJob.exp_level"
      :options="expLevelList"
      label="Experience level"
    />
    <q-select
      style="width: 62%"
      outlined
      v-model="newJob.type"
      :options="jobTypeList"
      label="Job type"
    />
    <places-autocomplete-input @selected="placeSelected"/>
    <q-input outlined v-model="date" mask="date" :rules="['date']" label="Expiry Date" class="q-pb-none">
      <template #append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input outlined type="textarea" v-model="newJob.description" label="Description" />
    <tags-manager v-model="newJob.tags"/>
    <div class="flex-center">
      <q-btn
        outline
        color="white"
        text-color="black"
        label="Discard"
        class="q-mr-md"
        @click="onJobDiscard"
        unelevated
      />
      <q-btn color="primary" label="Save" unelevated @click="onJobSave" />
    </div>
  </q-card>
</template>

<script>
import {mapStores} from "pinia";
import {useOrgStore} from "stores/org";
import TagsManager from "components/dashboard/TagsManager";
import PlacesAutocompleteInput from "components/dashboard/PlacesAutocompleteInput";

export default {
  name: "AddingJob",
  components: {PlacesAutocompleteInput, TagsManager},
  data() {
    return {
      newJob: {
        title: '',
        apps_no: 0,
        exp_level: '',
        type: '',
        date_posted: '',
        city: '',
        expire_date: '',
        description: '',
        tags: [],
      },
      expLevelList: [
        'No experience',
        'Entry',
        'Intermediate',
        'Senior'
      ],
      jobTypeList: [
        'Full-time',
        'Part-time',
        'Tuition'
      ],
      date: this.getTodayDate(),
    }
  },
  computed: {
    ...mapStores(useOrgStore),
  },
  methods: {
    getTodayDate() {
      const todayDate = new Date();
      const year = todayDate.getFullYear();
      let month = (todayDate.getMonth() + 1).toString();
      let day = todayDate.getDate().toString();
      month = month.length > 1 ? month : '0' + month;
      day = day.length > 1 ? day : '0' + day;
      return year + '/' + month + '/' + day;
    },
    async onJobSave() {
      this.newJob.expire_date = this.date;
      this.newJob.date_posted = Date.now().toString();
      await this.orgStore.createJob(this.newJob);
      this.orgStore.jobs.push(this.newJob);
      await this.orgStore.loadJobs();
      this.orgStore.determiners.dashboardState = 'jobs-list';
    },
    onJobDiscard() {
      this.orgStore.determiners.dashboardState = 'jobs-list';
    },
    placeSelected(val) {
      this.newJob.city = val;
    }
  },
  mounted() {
    console.log(this.getTodayDate());
  }
}
</script>

<style scoped>

</style>
