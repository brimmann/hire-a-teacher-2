import { defineStore } from 'pinia';
import axios from 'axios';

export const useCommonStore = defineStore('common', {
  state: () => ({
    feedback: false,
    step: 1,
    errorMessage: null,
    info: null,
    submittingToken: null,
  }),
  actions: {
    async get_info(payload) {
      console.log(payload);
      if (payload.token === null) {
        this.errorMessage = 'Enter your token here';
        return;
      }
      const response = await axios.post('http://127.0.0.1:8000/api/v1/feeback/get_info', payload);
      if (response.data === 'token_not_found') {
        this.errorMessage = 'Token not found';
      } else if (response.data === 'token_used') {
        this.errorMessage = 'Token has been already used';
      } else if (response.data === 'token_inactive') {
        this.errorMessage = 'Token is not active';
      } else {
        this.errorMessage = null;
        this.info = response.data;
        this.feedback = true;
        this.step = 2;
      }
    },
    async submitRating(payload) {
      console.log(payload);
      const dataBlock = {
        token: this.submittingToken,
        rating: payload,
      };
      await axios.post('http://127.0.0.1:8000/api/v1/feeback/submit', dataBlock);
    },
  },
});
