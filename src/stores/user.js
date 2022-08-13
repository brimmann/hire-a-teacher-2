import { defineStore } from 'pinia';
import axios from 'axios';
import { api } from 'boot/axios';
import { Notify } from 'quasar';
import { useResumeStore } from 'stores/resume';
import { useOrgStore } from 'stores/org';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    userId: null,
    userDetails: null,
    userType: null,
    newUser: false,
  }),
  actions: {
    async registerTeacher(payload) {
      const regBasic = {
        email: payload.email,
        password1: payload.password1,
        password2: payload.password2,
        type: 'teacher',
      };
      const responseReg = await api.post('/api/v1/registration/', regBasic);

      const regDetails = {
        full_name: payload.full_name,
        phone_number: payload.phone_number,
        user: responseReg.data.user,
      };

      this.userType = 'teacher';

      this.userDetails = {
        full_name: payload.full_name,
        phone_number: payload.phone_number,
        user: responseReg.data.user,
      };

      this.token = responseReg.data.key;
      this.userId = responseReg.data.user;

      const detailsRes = await api.post('/api/v1/teacher/add_details', regDetails, {
        headers: {
          Authorization: 'Token ' + responseReg.data.key,
        },
      });

      this.persistUser();
    },

    async registerOrg(payload) {
      const regBasic = {
        email: payload.email,
        password1: payload.password1,
        password2: payload.password2,
        type: 'org',
      };
      const responseReg = await api.post('/api/v1/registration/', regBasic);

      const regDetails = {
        org_name: payload.orgName,
        mobile_number: payload.mobile_number,
        phone_number: payload.phone_number,
        address: payload.address,
        user: responseReg.data.user,
      };

      this.userType = 'org';

      this.userDetails = {
        org_name: payload.orgName,
        mobile_number: payload.mobile_number,
        phone_number: payload.phone_number,
        address: payload.address,
        user: responseReg.data.user,
      };

      this.token = responseReg.data.key;
      this.userId = responseReg.data.user;

      await api.post('/api/v1/org/add_details', regDetails, {
        headers: {
          Authorization: 'Token ' + responseReg.data.key,
        },
      });

      this.persistUser();
    },

    async login(payload) {
      const response = await api.post('/api/v1/login/', payload);
      this.token = response.data.key;
      this.userId = response.data.user;
      this.userType = payload.type;

      console.log('type', payload.type);

      if (payload.type === 'teacher') {
        await this.setTeacherDetails(response);
      } else if (payload.type === 'org') {
        console.log('org');
        await this.setOrgDetails(response);
      }

      this.persistUser(response);
    },
    async setTeacherDetails(response) {
      const detailsRes = await api.get('/api/v1/teacher/get_details', {
        headers: {
          Authorization: 'Token ' + response.data.key,
        },
      });

      this.userDetails = {
        full_name: detailsRes.data.full_name,
        phone_number: detailsRes.data.phone_number,
        user: detailsRes.data.user_id,
      };
      console.log('user', this.userDetails);
    },

    async setOrgDetails(response) {
      const detailsRes = await api.get('/api/v1/org/get_details', {
        headers: {
          Authorization: 'Token ' + response.data.key,
        },
      });

      this.userDetails = {
        org_name: detailsRes.data.org_name,
        mobile_number: detailsRes.data.mobile_number,
        phone_number: detailsRes.data.phone_number,
        address: detailsRes.data.address,
        user: detailsRes.data.user_id,
      };
    },

    async requestResetPassword(payload) {
      const response = await api.post('/api/v1/password_reset/', payload);
      return response;
    },
    async validateToken(payload) {
      const response = await api.post('/api/v1/password_reset/validate_token/', payload);
      return response;
    },
    persistUser() {
      localStorage.setItem('token', this.token.toString());
      localStorage.setItem('userId', this.userId.toString());
      localStorage.setItem('userDetails', JSON.stringify(this.userDetails));
      localStorage.setItem('userType', this.userType.toString());
    },

    loadUser() {
      const userData = {
        token: localStorage.getItem('token'),
        userId: localStorage.getItem('userId'),
        userDetails: localStorage.getItem('userDetails'),
        userType: localStorage.getItem('userType'),
      };

      if (userData.token && userData.userId && userData.userDetails && userData.userType) {
        this.token = userData.token;
        this.userId = parseInt(userData.userId);
        this.userDetails = JSON.parse(userData.userDetails);
        this.userType = userData.userType;
      }
    },
    logout() {
      const resume = useResumeStore();
      resume.$reset();
      const org = useOrgStore();
      org.$reset();
      this.token = null;
      this.userId = null;
      this.userDetails = null;
      this.userType = null;
      this.newUser = false;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userDetails');
      localStorage.removeItem('userType');
    },
    notifyError(message) {
      Notify.create({
        message: message,
        type: 'negative',
        position: 'bottom-left',
        timeout: 5000,
      });
    },
  },
});
