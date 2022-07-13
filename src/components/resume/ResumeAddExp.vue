<template>
  <q-card
    flat
    bordered
    class="q-mb-md q-pa-lg max-width column"
    style="width: 100%; gap: 16px"
  >
    <q-input outlined v-model="exp.title" label="Title" />
    <q-input outlined v-model="exp.org" label="Organization" />
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
        label="Discard"
        class="q-mr-md"
        @click="onDiscard"
        unelevated
      />
      <q-btn
        color="primary"
        label="Save"
        unelevated
        @click="onSave"
      />
    </div>
  </q-card>
</template>

<script>
import {mapStores} from "pinia/dist/pinia.esm-browser";
import {useResumeStore} from "stores/resume";

export default {
  name: "ResumeAddExp",
  data() {
    return {
      exp: {
        editing: false,
        title: '',
        org: '',
        start_date_month: '',
        start_date_year: '',
        end_date_month: '',
        end_date_year: '',
        description: '',
      },
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
    }
  },
  computed: {
    ...mapStores(useResumeStore),
  },
  methods: {
    async onSave() {
      this.resumeStore.experiences.push(this.exp);
      this.resumeStore.experiences.push(this.exp);
      await this.resumeStore.createResumeExp(this.exp);
      this.exp = {
        editing: false,
        title: '',
        org: '',
        start_date_month: '',
        start_date_year: '',
        end_date_month: '',
        end_date_year: '',
        description: '',
      };
      this.resumeStore.adding.newExp = false;
    },
    onDiscard() {
      this.resumeStore.adding.newExp = false;
      this.exp = {
        editing: false,
        title: '',
        org: '',
        start_date_month: '',
        start_date_year: '',
        end_date_month: '',
        end_date_year: '',
        description: '',
      }
    }
  }
}
</script>

<style scoped>

</style>
