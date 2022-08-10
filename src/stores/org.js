import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserStore } from 'stores/user';
import { api } from 'boot/axios';

export const useOrgStore = defineStore('org', {
  state: () => ({
    determiners: {
      dashboardState: 'jobs-list',
      jobsLoading: false,
    },
    jobs: [],
    applications: [],
    jobBasedApplication: {},
    searchedTeachers: [],
    interviews: [],
    tokens: [],
    viewingJob: null,
    offeringJob: {
      id: 30,
      title: 'Web Trainer',
      org: 35,
      status: 'active',
      exp_level: 'Senior',
      type: 'Part-time',
      city: 'Islamabad',
      date_posted: '1658694127426',
      expire_date: '2022/07/28',
      description:
        'A test job. As you can see, there is some improvement when using tf–idf instead of just word\r\ncounts. We can also inspect which words tf–idf found most important. Keep in mind\r\nthat the tf–idf scaling is meant to find words that distinguish documents, but it is a\r\npurely unsupervised technique. So, “important” here does not necessarily relate to the\r\n“positive review” and “negative review” labels we are interested in. First, we extract\r\nthe TfidfVectorizer from the pipeline. As you can see, there is some improvement when using tf–idf instead of just word\r\ncounts. We can also inspect which words tf–idf found most important. Keep in mind\r\nthat the tf–idf scaling is meant to find words that distinguish documents, but it is a\r\npurely unsupervised technique. So, “important” here does not necessarily relate to the\r\n“positive review” and “negative review” labels we are interested in. First, we extract\r\nthe TfidfVectorizer from the pipeline:',
      tags: 'TEST',
      apps_no: 4,
    },
    offeringTeacher: {
      teacher_id: 2,
      full_name: 'Mohammad Rashid',
      headline: 'Web Development',
      brief:
        'My core skills are Django, Vue JS, OOP, Data Structure and Algorithm. Through my learning journey I have developed and designed different practice web applications and websites, mobile applications and desktop applications. I have used different technologies and programming languages including Django, Vue, Java Swing, Android SDK, Python, JavaScript, Java, Kotlin and C++.\n\nSome of the projects I worked and link to my Github account are mentioned bellow.',
    },
  }),
  actions: {
    async createJob(payload) {
      const dataBlock = {
        ...payload,
      };
      dataBlock.tags = dataBlock.tags.toString();
      const user = useUserStore();
      try {
        await api.post('/api/v1/jobs/create', dataBlock, {
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
        await api.put('/api/v1/jobs/update/' + this.jobs[jobIndex].id, dataBlock, {
          headers: {
            Authorization: 'Token ' + user.token,
          },
        });
      } catch (e) {
        console.log('update-job-error', e.message);
      }
    },
    async loadJobs(background = true) {
      const user = useUserStore();
      this.determiners.jobsLoading = !background;
      const response = await api.get('/api/v1/jobs/', {
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
      await api.delete('/api/v1/jobs/delete/' + this.jobs[jobIndex].id, {
        headers: {
          Authorization: 'Token ' + user.token,
        },
      });
    },
    async getOrgApplications() {
      const user = useUserStore();
      const response = await api.get('/api/v1/jobs/apps', {
        headers: {
          Authorization: 'Token ' + user.token,
        },
      });
      this.applications = response.data.applications;
    },
    async getOrgApplicationsJobBased(job_id) {
      const user = useUserStore();
      const response = await api.get('/api/v1/jobs/apps?job_id=' + job_id, {
        headers: {
          Authorization: 'Token ' + user.token,
        },
      });
      this.jobBasedApplication = response.data;
    },
    async searchTeachers(payload) {
      const user = useUserStore();
      const searchString = payload.replace(' ', '+');
      const response = await api.get('/api/v1/jobs/search/teachers?search_string=' + searchString, {
        headers: {
          Authorization: 'Token ' + user.token,
        },
      });
      this.searchedTeachers = response.data.matched_teachers;
    },
    async accept(payload) {
      const dataBlock = {
        ...payload,
      };
      console.log('dataBlock', dataBlock);
      const user = useUserStore();
      try {
        await api.post('/api/v1/jobs/accept', dataBlock, {
          headers: {
            Authorization: 'Token ' + user.token,
          },
        });
        // await this.getOrgApplications();
      } catch (e) {
        console.log('accept-error', e.message);
      }
    },
    async getInterviews() {
      const user = useUserStore();
      const response = await api.get('/api/v1/jobs/interviews', {
        headers: {
          Authorization: 'Token ' + user.token,
        },
      });

      this.interviews = response.data.interviews;
    },
    async selectTheApplicant(payload) {
      const user = useUserStore();
      await api.post('/api/v1/feeback/select', payload, {
        headers: {
          Authorization: 'Token ' + user.token,
        },
      });
    },
    async getTokens() {
      const user = useUserStore();
      const response = await api.get('/api/v1/feeback/get_tokens', {
        headers: {
          Authorization: 'Token ' + user.token,
        },
      });
      this.tokens = response.data.tokens;
    },
  },
});
