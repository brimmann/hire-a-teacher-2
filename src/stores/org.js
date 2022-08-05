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
    applications: [],
    jobBasedApplication: {},
    searchedTeachers: [],
    interviews: [],
    tokens: [
      'Z679-WSQU',
      '28VN-K2J5',
      'VC56-X9AS',
      'NKMZ-LBMC',
      'AUSS-8CFV',
      'RCGV-9KT3',
      '7NZD-9HGC',
      'TPUY-ELX7',
      'FGDN-FNUG',
      'PBWS-MLVM',
      'FLDR-DZNV',
      'FFC3-PUDG',
      '4QQU-RJTR',
      'C3EH-KMMN',
      'JQXH-8LEG',
      '4G7Q-ZB52',
      'NSFS-5CTJ',
      'RJCV-LCGJ',
      'RFAT-TF5D',
      'L9AQ-53SB',
      'YXLY-464K',
      'XP3B-HNB6',
      '42AJ-6R7Q',
      'TXZS-SXBR',
      '59LH-FCYR',
      'YQY9-BNLE',
      'KGSA-WRTQ',
      'HMDE-THKR',
      '7EFM-MVSU',
      'X988-M32U',
      '3THM-6GUW',
      'UPMS-6G8J',
      'K8W6-23SP',
      'KX5C-6LLG',
      'P94C-QLYF',
      'UBJS-ZXLM',
      'EART-R7Z9',
      'N6XF-2L4T',
      'XSRU-VB3T',
      'CMWD-ATZV',
      'E3PY-4KQ7',
      'B6CY-99J6',
      'W32L-TUAE',
      'QTRT-5ANW',
      '9VUA-N5Q4',
      '7XUS-HH9W',
      'UTMH-3UA2',
      'J85N-EKND',
      'W7UG-ZA38',
      'VMC2-A6TQ',
      'Y2Y8-JTYQ',
      '2NVW-83KS',
      '4WV3-48SP',
      '4ABA-3UQQ',
      '49J4-F97R',
      '43VU-29KC',
      '7V4J-B4PJ',
      'A3VE-SU6K',
      'RZDR-DSXS',
      '6HWB-C6TR',
      '2UVK-ZBMN',
      'XH6K-8Q6R',
      'FMYL-PD33',
      'P8V6-YK56',
      'RVFV-ASR8',
      'GWBW-BN88',
      'TDV9-KW62',
      '5CC6-FV46',
      'LFCZ-9RBX',
      'MQUC-ZMAH',
      '5HWU-TUBJ',
      'R2SE-CQNC',
      'NBQN-UFLG',
      '6468-BNW3',
      'UQ2T-WE7V',
      'E3MP-MSFR',
      '8DXW-PSMZ',
      '65Z9-BD4Z',
      '5EG8-MWU2',
      'PRWE-FZAP',
      '25PQ-JR5J',
      'ZJ52-6QMD',
      'TLSG-E2K5',
      '62HZ-PBH9',
      'MXYR-3UTY',
      '36P6-XW5R',
      'T7VW-V3EF',
      'NJZX-ED7B',
      'LPGV-YFKK',
      'YAUN-N34Q',
      'Q4MB-S6QR',
      'CFED-2BXU',
      'MBMT-JSFE',
      'QEE2-ACQ4',
      'RMMJ-VA9K',
      'PRJV-V63Y',
      'S5JN-M23X',
      'D6RT-7YKR',
      'FW5Y-ALJK',
      'YX8R-WN3Q',
    ],
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
      await axios.delete('http://127.0.0.1:8000/api/v1/jobs/delete/' + this.jobs[jobIndex].id, {
        headers: {
          Authorization: 'Token ' + user.token,
        },
      });
    },
    async getOrgApplications() {
      const user = useUserStore();
      const response = await axios.get('http://127.0.0.1:8000/api/v1/jobs/apps', {
        headers: {
          Authorization: 'Token ' + user.token,
        },
      });
      this.applications = response.data.applications;
    },
    async getOrgApplicationsJobBased(job_id) {
      const user = useUserStore();
      const response = await axios.get('http://127.0.0.1:8000/api/v1/jobs/apps?job_id=' + job_id, {
        headers: {
          Authorization: 'Token ' + user.token,
        },
      });
      this.jobBasedApplication = response.data;
    },
    async searchTeachers(payload) {
      const user = useUserStore();
      const searchString = payload.replace(' ', '+');
      const response = await axios.get(
        'http://127.0.0.1:8000/api/v1/jobs/search/teachers?search_string=' + searchString,
        {
          headers: {
            Authorization: 'Token ' + user.token,
          },
        }
      );
      this.searchedTeachers = response.data.matched_teachers;
    },
    async accept(payload) {
      const dataBlock = {
        ...payload,
      };
      console.log('dataBlock', dataBlock);
      const user = useUserStore();
      try {
        await axios.post('http://127.0.0.1:8000/api/v1/jobs/accept', dataBlock, {
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
      const response = await axios.get('http://127.0.0.1:8000/api/v1/jobs/interviews', {
        headers: {
          Authorization: 'Token ' + user.token,
        },
      });

      this.interviews = response.data.interviews;
    },
  },
});
