<template>
  <template v-for="(edu, index) in resumeStore.educations" :key="index">
    <q-card
      flat
      v-if="index % 2 === 0"
      v-show="!edu.editing"
      bordered
      class="q-mt-xs q-mb-sm max-width"
      style="width: 100%"
    >
      <q-card-section class="row q-pt-sm items-center q-pb-xs">
        <div class="text-subtitle1 text-bold">{{ edu.level }} in {{ edu.field_of_study }}</div>
        <q-space />
        <q-btn flat v-if="!readOnly" size="md" color="primary" icon="edit" @click="onEditEdu(index)" />
        <q-btn flat v-if="!readOnly" size="md" color="primary" icon="delete" @click="onDeleteEdu(index)" />
      </q-card-section>
      <q-separator inset />
      <q-card-section class="q-pt-xs">
        <div class="text-subtitle1 text-grey-8">
          {{ edu.school }}
        </div>
        <div class="text-body2 text-grey-7">
          {{ edu.start_date_month }} {{ edu.start_date_year }} – {{ edu.end_date_month }}
          {{ edu.end_date_year }}
        </div>
      </q-card-section>
    </q-card>
    <q-card
      flat
      bordered
      v-else
      class="q-mb-md q-pa-lg max-width column"
      style="width: 100%; gap: 16px"
      v-show="edu.editing"
    >
      <q-form @submit.prevent.stop="onSaveChangesEdu(index)">
        <q-select
          style="width: 35%"
          outlined
          square
          v-model="edu.level"
          :options="levelOfEducationList"
          label="Level of education"
          :rules="[val => !!val || 'Select a level']" lazy-rules
        />
        <q-input outlined v-model="edu.field_of_study" label="Field of study" :rules="[val => !!val || 'Cannot be empty']" lazy-rules/>
        <q-input outlined v-model="edu.school" label="School" :rules="[val => !!val || 'Cannot be empty']" lazy-rules/>
        <div style="width: 50%">
          <div class="text-body1">From</div>
          <div class="row justify-between items-center">
            <q-select
              style="width: 35%"
              outlined
              square
              v-model="edu.start_date_year"
              :options="yearsList"
              label="Year"
              :rules="[val => !!val || 'Select an year']" lazy-rules
            />
            <q-select
              style="width: 62%"
              outlined
              v-model="edu.start_date_month"
              :options="monthsList"
              label="Month"
              :rules="[val => !!val || 'Select an month']" lazy-rules
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
              v-model="edu.end_date_year"
              :options="yearsList"
              label="Year"
            />
            <q-select
              style="width: 62%"
              outlined
              v-model="edu.end_date_month"
              :options="monthsList"
              label="Month"
            />
            <div v-if="durationError" class="text-caption text-red">End date must be after start date</div>
          </div>
        </div>
        <div class="flex-center q-mt-lg">
          <q-btn
            outline
            color="white"
            text-color="black"
            label="Discard Changes"
            class="q-mr-md"
            @click="onDiscardChangesEdu(index)"
            unelevated
          />
          <q-btn color="primary" label="Save Changes" unelevated type="submit" />
        </div>
      </q-form>
    </q-card>
  </template>
</template>

<script>
import { mapStores } from 'pinia/dist/pinia.esm-browser';
import { useResumeStore } from 'stores/resume';
import {compareDesc, parse} from "date-fns";

export default {
  name: 'ResumeEduSection',
  props: {
    readOnly: {
      type: Boolean,
      required: false,
      default: false
    }
  },
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
      levelOfEducationList: [
        'Middle School',
        'High School',
        "Bachelor's",
        "Master's",
        'PhD',
        'Other',
      ],
      durationError: false,
      selectRule: [
        val => !!val || 'Select an year',
        () => {
          this.durationError = false;
          return true;
        }
      ],
      durationRule: [
        val => !!val || 'Select a month',
        this.validateDuration
      ],
    };
  },
  computed: {
    ...mapStores(useResumeStore),
  },
  methods: {
    onEditEdu(index) {
      this.resumeStore.educations[index].editing = true;
      this.resumeStore.educations[index + 1].editing = true;
      console.log('debug2', index);
    },
    async onDeleteEdu(index) {
      const id = this.resumeStore.educations[index].id;
      this.resumeStore.educations.splice(index, 2);
      await this.resumeStore.deleteResumeEdu(id);
    },
    async onSaveChangesEdu(index) {
      if (!this.validateDuration(this.resumeStore.educations[index])) {
        this.durationError = true;
        return;
      }
      this.resumeStore.educations[index - 1] = JSON.parse(
        JSON.stringify(this.resumeStore.educations[index])
      );
      this.resumeStore.educations[index].editing = false;
      this.resumeStore.educations[index - 1].editing = false;

      let payload = JSON.parse(JSON.stringify(this.resumeStore.educations[index]));
      payload.id = this.resumeStore.educations[index].id;
      await this.resumeStore.updateResumeEdu(payload);
    },
    onDiscardChangesEdu(index) {
      this.resumeStore.educations[index] = JSON.parse(
        JSON.stringify(this.resumeStore.educations[index - 1])
      );
      this.resumeStore.educations[index].editing = false;
      this.resumeStore.educations[index - 1].editing = false;
    },
    validateDuration(exp) {
      const sYear = exp.start_date_year;
      const sMonth = exp.start_date_month;
      const eYear = exp.end_date_year;
      const eMonth = exp.end_date_month;

      if (sYear !== '' && sMonth !== '' && eYear !== '' && eMonth !== '') {
        const startDate = parse(`${sYear} ${sMonth}`, 'yyyy MMMM', new Date());
        const endDate = parse(`${eYear} ${eMonth}`, 'yyyy MMMM', new Date());

        const compResult = compareDesc(startDate, endDate);
        console.log(startDate, endDate);
        console.log(compResult)
        if (compResult <= 0) {
          // this.durationError = true;
          return false;
        } else {
          // this.durationError = false;
          return true;
        }
      } else {
        // this.durationError = false;
        return false;
      }
    }
  },
};
</script>

<style scoped></style>
