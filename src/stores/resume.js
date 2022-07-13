import { defineStore } from 'pinia';
import { useUserStore } from 'stores/user';
import axios from 'axios';

export const useResumeStore = defineStore('resume', {
  state: () => ({
    noResume: true,
    resumeLoading: false,
    adding: {
      resume: false,
      newExp: false,
      newEdu: false,
      newSkill: false,
      newLang: false,
    },
    intro: {},
    experiences: [],
    educations: [],
    skills: [],
    languages: [],
  }),
  actions: {
    async getResume(background = true) {
      const user = useUserStore();
      const that = this;
      try {
        this.resumeLoading = !background;
        const response = await axios.get('http://127.0.0.1:8000/api/v1/resume/', {
          headers: {
            Authorization: 'Token ' + user.token,
          },
        });
        that.noResume = false;
        that.intro = response.data.intro;
        that.intro.editing = false;
        that.experiences = response.data.experiences;
        that.educations = response.data.educations;
        that.skills = response.data.skills;
        that.languages = response.data.languages;
        that.initBufferExp();
        that.initBufferEdu();
        that.initBufferLang();
        that.resumeLoading = false;
      } catch (e) {
        this.resumeLoading = false;
        that.noResume = true;
      }
    },
    async createResume(payload) {
      const user = useUserStore();

      const dataBlock = {
        user: user.userId,
        heading: payload.heading,
        address: payload.address,
        intro: payload.brief,
        email: payload.email,
      };

      console.log('this goes into: ', dataBlock);

      await axios.post('http://127.0.0.1:8000/api/v1/resume/create', dataBlock, {
        headers: {
          Authorization: 'Token ' + user.token,
        },
      });
    },
    async updateResume(payload) {
      const user = useUserStore();
      console.log('wow');

      const dataBlock = {
        user: user.userId,
        heading: payload.headline,
        address: payload.address,
        intro: payload.brief,
        email: payload.emailAddress,
      };

      console.log('this goes into: ', dataBlock);

      await axios.put('http://127.0.0.1:8000/api/v1/resume/update/' + user.userId, dataBlock, {
        headers: {
          Authorization: 'Token ' + user.token,
        },
      });
    },
    async createResumeExp(payload) {
      const user = useUserStore();

      const dataBlock = {
        title: payload.title,
        org: payload.org,
        start_date_month: payload.start_date_month,
        start_date_year: payload.start_date_year,
        end_date_month: payload.end_date_month,
        end_date_year: payload.endDataYear,
        description: payload.description,
        resume: user.userId,
      };

      try {
        await axios.post('http://127.0.0.1:8000/api/v1/resume/create/exp', dataBlock, {
          headers: {
            Authorization: 'Token ' + user.token,
          },
        });

        await this.getResume();
      } catch (e) {
        console.log(e.message);
      }
    },
    async updateResumeExp(payload) {
      const user = useUserStore();

      const dataBlock = {
        title: payload.title,
        org: payload.org,
        start_date_month: payload.start_date_month,
        start_date_year: payload.start_date_year,
        end_date_month: payload.end_date_month,
        end_date_year: payload.endDataYear,
        description: payload.description,
        resume: user.userId,
      };

      try {
        await axios.put('http://127.0.0.1:8000/api/v1/resume/update/exp/' + payload.id, dataBlock, {
          headers: {
            Authorization: 'Token ' + user.token,
          },
        });
      } catch (e) {
        console.log(e.message);
      }
    },
    async deleteResumeExp(payload) {
      const user = useUserStore();

      try {
        await axios.delete('http://127.0.0.1:8000/api/v1/resume/delete/exp/' + payload, {
          headers: {
            Authorization: 'Token ' + user.token,
          },
        });
      } catch (e) {
        console.log(e.message);
      }
    },
    async createResumeEdu(payload) {
      const user = useUserStore();

      const dataBlock = {
        level: payload.level,
        field_of_study: payload.field_of_study,
        school: payload.school,
        schoolLocation: 'not done yet',
        start_date_month: payload.start_date_month,
        start_date_year: payload.start_date_year,
        end_date_month: payload.end_date_month,
        end_date_year: payload.end_date_year,
        resume: user.userId,
      };

      try {
        await axios.post('http://127.0.0.1:8000/api/v1/resume/create/edu', dataBlock, {
          headers: {
            Authorization: 'Token ' + user.token,
          },
        });
      } catch (e) {
        console.log(e.message);
      }
    },
    async updateResumeEdu(payload) {
      const user = useUserStore();

      const dataBlock = {
        level: payload.level,
        field_of_study: payload.field_of_study,
        school: payload.school,
        schoolLocation: 'not done yet',
        start_date_month: payload.start_date_month,
        start_date_year: payload.start_date_year,
        end_date_month: payload.end_date_month,
        end_date_year: payload.end_date_year,
        resume: user.userId,
      };

      try {
        await axios.put('http://127.0.0.1:8000/api/v1/resume/update/edu/' + payload.id, dataBlock, {
          headers: {
            Authorization: 'Token ' + user.token,
          },
        });
      } catch (e) {
        console.log(e.message);
      }
    },
    async deleteResumeEdu(payload) {
      const user = useUserStore();

      try {
        await axios.delete('http://127.0.0.1:8000/api/v1/resume/delete/edu/' + payload, {
          headers: {
            Authorization: 'Token ' + user.token,
          },
        });
      } catch (e) {
        console.log(e.message);
      }
    },
    async createResumeSkill(payload) {
      const user = useUserStore();

      const dataBlock = {
        skill: payload.skill,
        resume: user.userId,
      };

      try {
        await axios.post('http://127.0.0.1:8000/api/v1/resume/create/skill', dataBlock, {
          headers: {
            Authorization: 'Token ' + user.token,
          },
        });
        await this.getResume();
      } catch (e) {
        console.log(e.message);
      }
    },
    async updateResumeSkill(payload) {
      const user = useUserStore();

      const dataBlock = {
        skill: payload.skill,
        resume: user.userId,
      };

      try {
        await axios.put(
          'http://127.0.0.1:8000/api/v1/resume/update/skill/' + payload.id,
          dataBlock,
          {
            headers: {
              Authorization: 'Token ' + user.token,
            },
          }
        );
      } catch (e) {
        console.log(e.message);
      }
    },
    async deleteResumeSkill(payload) {
      const user = useUserStore();

      try {
        await axios.delete('http://127.0.0.1:8000/api/v1/resume/delete/skill/' + payload, {
          headers: {
            Authorization: 'Token ' + user.token,
          },
        });
      } catch (e) {
        console.log(e.message);
      }
    },
    async createResumeLang(payload) {
      const user = useUserStore();

      const dataBlock = {
        language: payload.language,
        level_of_fluency: payload.level_of_fluency,
        resume: user.userId,
      };

      try {
        await axios.post('http://127.0.0.1:8000/api/v1/resume/create/lang', dataBlock, {
          headers: {
            Authorization: 'Token ' + user.token,
          },
        });
        await this.getResume();
      } catch (e) {
        console.log(e.message);
      }
    },
    async updateResumeLang(payload) {
      const user = useUserStore();

      const dataBlock = {
        language: payload.language,
        level_of_fluency: payload.level_of_fluency,
        resume: user.userId,
      };

      try {
        await axios.put(
          'http://127.0.0.1:8000/api/v1/resume/update/lang/' + payload.id,
          dataBlock,
          {
            headers: {
              Authorization: 'Token ' + user.token,
            },
          }
        );
      } catch (e) {
        console.log(e.message);
      }
    },
    async deleteResumeLang(payload) {
      const user = useUserStore();

      try {
        await axios.delete('http://127.0.0.1:8000/api/v1/resume/delete/lang/' + payload, {
          headers: {
            Authorization: 'Token ' + user.token,
          },
        });
      } catch (e) {
        console.log(e.message);
      }
    },
    initBufferExp() {
      let tempArr = [];

      this.experiences.forEach((item) => {
        item.editing = false;
        tempArr.push(item);
        tempArr.push(item);
      });

      this.experiences = tempArr;
    },
    initBufferEdu() {
      let tempArr = [];
      this.educations.forEach((item) => {
        item.editing = false;
        tempArr.push(item);
        tempArr.push(item);
      });
      this.educations = tempArr;
    },
    initBufferLang() {
      let tempArr = [];
      this.languages.forEach((item) => {
        item.editing = false;
        tempArr.push(item);
        tempArr.push(item);
      });
      this.languages = tempArr;
    },
  },
});
