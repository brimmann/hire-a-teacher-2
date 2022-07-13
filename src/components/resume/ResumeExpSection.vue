<template>
  <template v-for="(exp, index) in resumeStore.experiences" :key="index">
    <div v-if="index % 2 === 0" class="column items-center" style="width: 100%">
      <q-card flat bordered class="q-mb-md max-width" v-show="!exp.editing" style="width: 100%">
        <q-card-section class="row q-pt-sm items-center q-pb-xs">
          <div class="text-subtitle1 text-bold">{{ exp.title }}</div>
          <q-space />
          <q-btn flat size="md" color="primary" icon="edit" @click="onExpEdit(index)" />
          <q-btn flat size="md" color="primary" icon="delete" @click="onDeleteExp(index)" />
        </q-card-section>
        <q-separator inset />
        <q-card-section class="q-pt-xs">
          <div class="text-subtitle1 text-grey-8">{{ exp.org }}</div>
          <div class="text-body2 text-grey-7">
            {{ exp.start_date_month + ' ' + exp.start_date_year }} –
            {{ exp.end_date_month + ' ' + exp.end_date_year }}
          </div>
          <div class="text-body2 q-mt-sm" v-html="exp.description"></div>
        </q-card-section>
      </q-card>
    </div>
    <div v-else :ref="'editing-exp-' + index" class="column items-center" style="width: 100%">
      <q-card
        flat
        bordered
        class="q-mb-md q-pa-lg max-width column"
        style="width: 100%; gap: 16px"
        v-show="exp.editing"
      >
        <q-input outlined v-model="exp.title" label="Title" />
        <q-input outlined v-model="exp.org" label="Companay" />
        <div style="width: 50%">
          <div class="text-body1">From</div>
          <div class="row justify-between items-center">
            <q-select
              style="width: 35%"
              outlined
              square
              v-model="exp.start_date_year"
              :options="yearsList"
              label="Year"
            />
            <q-select
              style="width: 62%"
              outlined
              v-model="exp.start_date_month"
              :options="monthsList"
              label="Month"
            />
          </div>
        </div>
        <div style="width: 50%">
          <div class="text-body1">To</div>
          <div class="row justify-between items-center">
            <q-select
              style="width: 35%"
              outlined
              square
              v-model="exp.end_date_year"
              :options="yearsList"
              label="Year"
            />
            <q-select
              style="width: 62%"
              outlined
              v-model="exp.end_date_month"
              :options="monthsList"
              label="Month"
            />
          </div>
        </div>
        <div>
          <q-editor
            square
            v-model="exp.description"
            :definitions="{
              bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' },
            }"
            :toolbar="[
              ['unordered', 'ordered'],
              ['undo', 'redo'],
            ]"
          />
        </div>
        <div class="flex-center">
          <q-btn
            outline
            color="white"
            text-color="black"
            label="Discard Changes"
            class="q-mr-md"
            @click="onExpDiscardChanges(index)"
            unelevated
          />
          <q-btn color="primary" label="Save Changes" unelevated @click="onExpSaveChanges(index)" />
        </div>
      </q-card>
    </div>
  </template>
</template>

<script>
import { mapStores } from 'pinia/dist/pinia.esm-browser';
import { useResumeStore } from 'stores/resume';

export default {
  name: 'ResumeExpSection',
  data() {
    return {
      yearsList: [
        '2022',
        '2021',
        '2020',
        '2019',
        '2018',
        '2017',
        '2016',
        '2015',
        '2014',
        '2013',
        '2012',
        '2011',
        '2010',
        '2009',
        '2008',
        '2007',
        '2006',
        '2005',
        '2004',
        '2003',
        '2002',
        '2001',
        '2000',
        '1999',
        '1998',
        '1997',
        '1996',
        '1995',
        '1994',
        '1993',
        '1992',
        '1991',
        '1990',
        '1989',
        '1988',
        '1987',
        '1986',
        '1985',
        '1984',
        '1983',
        '1982',
        '1981',
        '1980',
        '1979',
        '1978',
        '1977',
        '1976',
        '1975',
        '1974',
        '1973',
        '1972',
        '1971',
        '1970',
        '1969',
        '1968',
        '1967',
        '1966',
        '1965',
        '1964',
        '1963',
        '1962',
        '1961',
        '1960',
        '1959',
        '1958',
        '1957',
        '1956',
        '1955',
        '1954',
        '1953',
        '1952',
        '1951',
        '1950',
        '1949',
        '1948',
        '1947',
        '1946',
        '1945',
        '1944',
        '1943',
        '1942',
        '1941',
        '1940',
        '1939',
        '1938',
        '1937',
        '1936',
        '1935',
        '1934',
        '1933',
        '1932',
        '1931',
        '1930',
        '1929',
        '1928',
        '1927',
        '1926',
        '1925',
        '1924',
        '1923',
        '1922',
        '1921',
        '1920',
        '1919',
        '1918',
        '1917',
        '1916',
        '1915',
        '1914',
        '1913',
        '1912',
        '1911',
        '1910',
        '1909',
        '1908',
        '1907',
        '1906',
        '1905',
        '1904',
        '1903',
        '1902',
        '1901',
        '1900',
      ],
      monthsList: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    };
  },
  computed: {
    ...mapStores(useResumeStore),
  },
  methods: {
    onExpEdit(index) {
      this.resumeStore.experiences[index].editing = true;
      this.resumeStore.experiences[index + 1].editing = true;
      console.log('edit key: ', index, this.experiencesBuffer);
    },
    async onExpSaveChanges(index) {
      console.log('Debug-1', index);
      this.resumeStore.experiences[index - 1] = JSON.parse(
        JSON.stringify(this.resumeStore.experiences[index])
      );
      this.resumeStore.experiences[index].editing = false;
      this.resumeStore.experiences[index - 1].editing = false;
      const scrollAmount = this.$refs['editing-exp-' + index][0].clientHeight / 2;
      // console.log(scrollAmount);
      window.scrollBy(0, -scrollAmount);
      let payload = JSON.parse(JSON.stringify(this.resumeStore.experiences[index]));
      payload.id = this.resumeStore.experiences[index].id;
      await this.resumeStore.updateResumeExp(payload);
    },
    onExpDiscardChanges(index) {
      this.resumeStore.experiences[index] = JSON.parse(
        JSON.stringify(this.resumeStore.experiences[index - 1])
      );
      this.resumeStore.experiences[index].editing = false;
      this.resumeStore.experiences[index - 1].editing = false;
      const scrollAmount = this.$refs['editing-exp-' + index][0].clientHeight / 2;
      window.scrollBy(0, -scrollAmount);
    },
    async onDeleteExp(index) {
      const id = this.resumeStore.experiences[index].id;
      this.resumeStore.experiences.splice(index, 2);
      await this.resumeStore.deleteResumeExp(id);
    },
  },
};
</script>

<style scoped></style>
