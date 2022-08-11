<template>
  <q-card
    flat
    bordered
    class="q-pa-lg column"
  >
    <q-form class="column" style="gap: 16px;" @submit.prevent.stop="onJobSave">
      <q-input outlined v-model="newJob.title" label="Title" :rules="[val => !!val || 'Cannot be blank']" lazy-rules/>
      <q-select
        style="width: 62%"
        outlined
        v-model="newJob.exp_level"
        :options="expLevelList"
        label="Experience level"
        :rules="[val => !!val || 'Select a level']" lazy-rules
      />
      <q-select
        style="width: 62%"
        outlined
        v-model="newJob.type"
        :options="jobTypeList"
        label="Job type"
        :rules="[val => !!val || 'Select a type']" lazy-rules
      />
      <places-autocomplete-input @selected="placeSelected"/>
      <q-input outlined v-model="date" mask="date" label="Expiry Date" class="q-pb-none" :rules="[val => !!val || '']" lazy-rules>
        <template #append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="date" :options="optionsFn">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input outlined type="textarea" v-model="newJob.description" label="Description" :rules="descriptionRules" lazy-rules>
        <template #counter>
          {{ newJob.description.length }} characters
        </template>
      </q-input>
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
        <q-btn color="primary" label="Save" unelevated type="submit" />
      </div>
    </q-form>
  </q-card>
</template>

<script>
import {mapStores} from "pinia";
import {useOrgStore} from "stores/org";
import TagsManager from "components/dashboard/TagsManager";
import PlacesAutocompleteInput from "components/dashboard/PlacesAutocompleteInput";
import {format, add} from "date-fns";

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
      descriptionRules: [
        (val) => !!val || 'Cannot be empty',
        (val) => val.length >= 250 || 'Description must be at least 250 characters',
      ],
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
      date: this.getTomorrow(),
    }
  },
  computed: {
    ...mapStores(useOrgStore),
  },
  methods: {
    getTomorrow() {
      // const todayDate = new Date();
      // const year = todayDate.getFullYear();
      // let month = (todayDate.getMonth() + 1).toString();
      // let day = todayDate.getDate().toString();
      // month = month.length > 1 ? month : '0' + month;
      // day = day.length > 1 ? day : '0' + day;
      // return year + '/' + month + '/' + day;
      return format(add(Date.now(), {
        days: 1
      }), 'yyyy/MM/dd');
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
      this.$q.dialog({
        title: 'Discarding',
        message: 'Do you want to discard new job?',
        ok: "Yes",
        cancel: "No",
        persistent: true
      }).onOk(() => {
        this.orgStore.determiners.dashboardState = 'jobs-list';
      })
    },
    placeSelected(val) {
      this.newJob.city = val;
    },
    optionsFn (date) {
      const today = format(Date.now(), 'yyyy/MM/dd' );
      return date > today;
    },
  },
}
</script>

<style scoped>

</style>
