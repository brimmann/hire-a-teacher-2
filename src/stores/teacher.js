import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserStore } from 'stores/user';

export const useTeacherStore = defineStore('teacher', {
  state: () => ({
    jobSearchStatus: 'rel',
    relevantJobs: [],
    searchJobResult: [],
    searchResultOrig: [],
  }),
  actions: {
    async getRelevantJobs() {
      const user = useUserStore();
      const response = await axios.get('http://127.0.0.1:8000/api/v1/jobs/get_rel', {
        headers: {
          Authorization: 'Token ' + user.token,
        },
      });

      this.relevantJobs = response.data.relevant_jobs;
    },

    async searchJobs(payload) {
      const user = useUserStore();
      const searchString = payload.replace(' ', '+');
      const response = await axios.get(
        'http://127.0.0.1:8000/api/v1/jobs/search?search_string=' + searchString,
        {
          headers: {
            Authorization: 'Token ' + user.token,
          },
        }
      );

      this.searchJobResult = response.data.matched_jobs;
      this.searchResultOrig = JSON.parse(JSON.stringify(this.searchJobResult));
    },

    filterJobs(payload) {
      const currentFilters = JSON.parse(JSON.stringify(payload));
      Object.keys(currentFilters).forEach(
        (k) => currentFilters[k] == null && delete currentFilters[k]
      );
      const noFilter = Object.keys(currentFilters).length === 0;
      this.searchJobResult = JSON.parse(JSON.stringify(this.searchResultOrig));
      if (noFilter) {
        return;
      }

      this.filterByDatePosted(currentFilters.datePosted);
      this.filterByExpLevel(currentFilters.expLevel);
      this.filterByJobType(currentFilters.jobType);
    },

    filterByDatePosted(timeIndex) {
      if (this.searchJobResult.length < 1 || timeIndex === undefined) {
        return;
      }

      const currentFilterDateInt = new Date();
      const daysToSubtract = [1, 3, 7, 14];
      currentFilterDateInt.setDate(currentFilterDateInt.getDate() - daysToSubtract[timeIndex]);

      const result = this.searchJobResult.filter((item) => {
        const postDateInt = parseInt(item.date_posted);
        return postDateInt >= currentFilterDateInt;
      });

      this.searchJobResult = result;
    },

    filterByJobType(jobType) {
      if (this.searchJobResult.length < 1 || jobType === undefined) {
        return;
      }

      const result = this.searchJobResult.filter((item) => {
        return item.type === jobType;
      });
      this.searchJobResult = result;
    },

    filterByExpLevel(expLevel) {
      if (this.searchJobResult.length < 1 || expLevel === undefined) {
        return;
      }

      const result = this.searchJobResult.filter((item) => {
        return item.exp_level === expLevel;
      });
      this.searchJobResult = result;
    },
  },
});
