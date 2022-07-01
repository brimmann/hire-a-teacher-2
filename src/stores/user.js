import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: null,
    userId: null,
    userInfo: null,
  }),
  actions: {
    async registerTeacher(payload) {
      console.log(payload);
      const regBasic = {
        email: payload.email,
        password1: payload.password1,
        password2: payload.password2,
        type: "teacher",
      };
      const responseReg = await axios.post(
        "http://127.0.0.1:8000/api/v1/registration/",
        regBasic
      );

      const regDetails = {
        full_name: payload.full_name,
        phone_number: payload.phone_number,
        user: responseReg.data.user,
      };

      await axios.post(
        "http://127.0.0.1:8000/api/v1/teacher/add_details",
        regDetails,
        {
          headers: {
            Authorization: "Token " + responseReg.data.key,
          },
        }
      );
    },

    async registerOrg(payload) {
      console.log(payload);
      const regBasic = {
        email: payload.email,
        password1: payload.password1,
        password2: payload.password2,
        type: "org",
      };
      const responseReg = await axios.post(
        "http://127.0.0.1:8000/api/v1/registration/",
        regBasic
      );

      const regDetails = {
        org_name: payload.orgName,
        mobile_number: payload.mobile_number,
        phone_number: payload.phone_number,
        address: payload.address,
        user: responseReg.data.user,
      };

      await axios.post(
        "http://127.0.0.1:8000/api/v1/org/add_details",
        regDetails,
        {
          headers: {
            Authorization: "Token " + responseReg.data.key,
          },
        }
      );
    },

    async login(payload) {
      console.log("action called", payload);
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/v1/login/",
          payload
        );
        this.token = response.data.key;
        this.userId = response.data.user;
        console.log("response:", response);
        // context.commit("setUser", {
        //   token: response.data.key,
        //   userId: response.data.user,
        // });
      } catch (e) {
        console.log(e.message);
      }
    },
  },
});
