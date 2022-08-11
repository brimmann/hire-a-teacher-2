<template>
  <q-card
    flat
    bordered
    class="q-pa-lg column"
  >
    <q-form class="column" style="gap: 16px;" @submit.prevent.stop="onJobSaveChanges">
      <q-input outlined v-model="bufferedJob.title" label="Title" :rules="[val => !!val || 'Cannot be blank']" lazy-rules/>
      <q-select
        style="width: 62%"
        outlined
        v-model="bufferedJob.exp_level"
        :options="expLevelList"
        label="Experience level"
      />
      <q-select
        style="width: 62%"
        outlined
        v-model="bufferedJob.type"
        :options="jobTypeList"
        label="Job type"
      />
      <places-autocomplete-input @selected="placeSelected" :model-init-value="bufferedJob.city"/>
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
      <q-input outlined type="textarea" v-model="bufferedJob.description" label="Description" :rules="descriptionRules">
        <template #counter>
          {{ bufferedJob.description.length }} characters
        </template>
      </q-input>
      <tags-manager v-model="bufferedJob.tags"/>
      <div class="flex-center">
        <q-btn
          outline
          color="white"
          text-color="black"
          label="Discard Changes"
          class="q-mr-md"
          @click="onJobDiscardChanges"
          unelevated
        />
        <q-btn color="primary" label="Save Changes" unelevated type="submit" />
      </div>
    </q-form>

  </q-card>
</template>

<script>
import {mapStores} from "pinia";
import {useOrgStore} from "stores/org";
import TagsManager from "components/dashboard/TagsManager";
import PlacesAutocompleteInput from "components/dashboard/PlacesAutocompleteInput";
import {add, format} from "date-fns";

export default {
  name: "EditingJob",
  components: {PlacesAutocompleteInput, TagsManager},
  props: {
    jobIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      bufferedJob: {
        title: '',
        apps_no: '',
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
      date: this.getTodayDate(),
    }
  },
  computed: {
    ...mapStores(useOrgStore),
  },
  methods: {
    getTodayDate() {
      return format(add(Date.now(), {
        days: 1
      }), 'yyyy/MM/dd');
    },
    async onJobSaveChanges() {
      this.bufferedJob.expire_date = this.date;
      await this.orgStore.updateJob(this.bufferedJob, this.jobIndex);
      this.orgStore.jobs[this.jobIndex] = this.bufferedJob;
      this.orgStore.determiners.dashboardState = 'jobs-list';
    },
    onJobDiscardChanges() {
      this.orgStore.determiners.dashboardState = 'jobs-list';
    },
    placeSelected(val) {
      this.bufferedJob.city = val;
    },
    optionsFn (date) {
      const today = format(Date.now(), 'yyyy/MM/dd' );
      return date > today;
    },
  },
  mounted() {
    this.bufferedJob = this.orgStore.jobs[this.jobIndex];
  }
}
</script>

<style scoped>

</style>

