<template>
  <q-select
    outlined
    :loading="loading"
    :model-value="model"
    v-model="model"
    use-input
    hide-selected
    fill-input
    input-debounce="0"
    clearable
    :options="options"
    @filter="filterFn"
    hide-dropdown-icon
    label="City"
    placeholder="Type cities or places name i.e Islamabad"
    @input-value="setInputValue"
    @focusout.stop="inputValue = null"
  >
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey"> No suggestion yet, keep typing </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import axios from 'axios';
import {nextTick} from "vue";

export default {
  name: 'PlacesAutocompleteInput',
  emits: ['selected'],
  props: {
    modelInitValue: {
      type: String,
      required: false,
      default() {
        return null;
      }
    }
  },
  data() {
    return {
      inputValue: null,
      model: null,
      stringOptions: [],
      options: [],
      loading: false
    };
  },
  watch: {
    model(newValue) {
      this.$emit('selected', newValue);
    }
  },
  methods: {
    async setInputValue(val) {
      this.inputValue = val;
      await this.setStringOptions();
    },
    filterFn(val, update, abort) {
      const that = this;
      if (!!val) {
        this.loading = true;
      }
      setTimeout(() => {
        update(() => {
          const needle = val.toLocaleLowerCase();
          that.options = that.stringOptions.filter((v) => v.toLocaleLowerCase().indexOf(needle) > -1);
          that.loading = false;
        });
      }, 1000);
      abort(() => {
        console.log('aborted');
      });
    },
    async setStringOptions() {
      if (this.inputValue === '') {
        return;
      }
      const searchUrl = 'api.tomtom.com/search/2/search';
      const phrase = this.inputValue;
      const apiKey = 'q1TIKeqJMLhzvbUmQTKP9g6t3Q2jTgzk';
      const entityTypeSet =
        'Municipality,MunicipalitySubdivision,CountrySecondarySubdivision,CountryTertiarySubdivision';

     try {
       const response = await axios.get(
         `https://${searchUrl}/${phrase}.json?key=${apiKey}&typeahead=true&countrySet=PAK&entityTypeSet=${entityTypeSet}`
       );
       this.createPlacesArray(response);
     } catch (e) {
       console.log(e.message);
     }
    },
    createPlacesArray(response) {
      let temp = []
      response.data.results.forEach((item) => {
        // temp.push(item.address['countrySubdivision']);
        temp.push(item.address['countryTertiarySubdivision']);
        temp.push(item.address['countrySecondarySubdivision']);
        temp.push(item.address['municipality']);
        temp.push(item.address['municipalitySubdivision']);
      });
      temp = temp.filter(function( element ) {
        return element !== undefined;
      });
      console.log('theTHTH:', temp);
      this.stringOptions = temp;
    },
  },
  created() {
    this.options = this.stringOptions;
    nextTick(() => this.model = this.modelInitValue)
  },
};
</script>

<style scoped></style>
