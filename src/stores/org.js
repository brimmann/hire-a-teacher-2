import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserStore } from 'stores/user';

export const useOrgStore = defineStore('org', {
  state: () => ({
    determiners: {
      dashboardState: 'jobs-list',
      jobsLoading: false,
    },
    jobs: [],
  }),
  actions: {
    async createJob(payload) {
      const dataBlock = {
        ...payload,
      };
      dataBlock.tags = dataBlock.tags.toString();
      const user = useUserStore();
      try {
        await axios.post('http://127.0.0.1:8000/api/v1/jobs/create', dataBlock, {
          headers: {
            Authorization: 'Token ' + user.token,
          },
        });
      } catch (e) {
        console.log('create-job-error', e.message);
      }
    },
    async updateJob(payload, jobIndex) {
      const dataBlock = {
        ...payload,
      };
      dataBlock.tags = dataBlock.tags.toString();
      const user = useUserStore();
      try {
        await axios.put(
          'http://127.0.0.1:8000/api/v1/jobs/update/' + this.jobs[jobIndex].id,
          dataBlock,
          {
            headers: {
              Authorization: 'Token ' + user.token,
            },
          }
        );
      } catch (e) {
        console.log('update-job-error', e.message);
      }
    },
    async loadJobs(background = true) {
      const user = useUserStore();
      this.determiners.jobsLoading = !background;
      const response = await axios.get('http://127.0.0.1:8000/api/v1/jobs/', {
        headers: {
          Authorization: 'Token ' + user.token,
        },
      });
      this.determiners.jobsLoading = false;
      console.log('loaded jobs', response.data);
      this.jobs = [];
      response.data.forEach((item) => {
        item.tags = item.tags.split(',');
        this.jobs.push(item);
      });
    },
    async deleteJob(jobIndex) {
      const user = useUserStore();
      await axios.delete('http://127.0.0.1:8000/api/v1/s/delete/' + this.jobs[jobIndex].id, {
        headers: {
          Authorization: 'Token ' + user.token,
        },
      });
    },
  },
});
