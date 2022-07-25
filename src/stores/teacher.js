import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserStore } from 'stores/user';

export const useTeacherStore = defineStore('teacher', {
  state: () => ({
    relevantJobs: [],
    // relevantJobs: [
    //   {
    //     id: 29,
    //     title: 'English Teacher (Primary / Secondary)',
    //     apps_no: 0,
    //     org_id: 35,
    //     status: 'active',
    //     exp_level: 'Entry',
    //     type: 'Full-time',
    //     city: 'Lahore',
    //     date_posted: '1658650818217',
    //     expire_date: '2022/07/26',
    //     description:
    //       'Unique Group of Institutions is hiring for English Teachers the Candidates must have Qualification in the related subject (English) such as BS English or MA English.\n\nMust know about the Syllabus of PTB classes, Grammar Rules, and Use of Board.\n\nMultiple vacancies are available from class 1-5, 6-8, and Matric Level.',
    //     tags: ['ENGLISH', 'CLASSROOM', 'MANAGMENT', 'TEACHING'],
    //   },
    // ],
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
  },
});
