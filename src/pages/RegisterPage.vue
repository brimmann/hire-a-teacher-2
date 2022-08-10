<template>
  <q-page padding class="row flex-center">
    <q-card style="max-width: 400px">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="teacher" label="Teacher" />
        <q-tab name="org" label="Organization" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab">
        <q-tab-panel name="teacher">
          <q-card-section>
            <div class="text-body1 text-center">
              Please fill the following form to register as a teacher. You will
              be able to build your resume, apply for different jobs and get
              feedback from your students.
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              @submit.prevent.stop="regTeacher"
              class="column q-col-gutter-sm"
            >
              <q-input
                outlined
                v-model="teacherRegData.full_name"
                label="Full Name"
                :rules="requiredRules"
              />
              <q-input
                outlined
                v-model="teacherRegData.email"
                label="Email Address"
                :rules="emailRules"
                lazy-rules
              />
              <q-input
                outlined
                v-model="teacherRegData.phone_number"
                label="Phone Number"
                :rules="requiredRules"
              />

              <q-input
                outlined
                v-model="teacherRegData.password1"
                label="Password"
                type="password"
                :rules="passwordRules"
                lazy-rules
              />

              <q-input
                outlined
                v-model="teacherRegData.password2"
                label="Confirm Password"
                type="password"
                :rules="passwordMatchRulesTeacher"
                lazy-rules
              />
              <div>
                <q-btn
                  unelevated
                  color="primary"
                  label="Register"
                  type="submit"
                  class="q-mt-sm"
                  style="width: 100%"
                  :loading="registering"
                >
                  <template #loading>
                    <q-spinner-bars class="on-left" />
                    Registering...
                  </template>
                </q-btn>
              </div>
            </q-form>
          </q-card-section>
          <!--          <q-card-section>-->
          <!--            -->
          <!--          </q-card-section>-->
        </q-tab-panel>

        <q-tab-panel name="org">
          <q-card-section>
            <div class="text-body1 text-center">
              Please fill the following form to register as an organization. You
              will be post jobs, hire and recruit a teacher.
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              @submit.prevent.stop="regOrg"
              class="column q-col-gutter-md"
            >
              <q-input
                outlined
                v-model="orgRegData.orgName"
                label="Organization Name"
                :rules="requiredRules"
              />
              <q-input
                outlined
                v-model="orgRegData.email"
                label="Email Address"
                :rules="emailRules"
                lazy-rules
              />
              <q-input
                outlined
                v-model="orgRegData.phone_number"
                label="Landline Phone"
                :rules="requiredRules"
              />
              <q-input
                outlined
                v-model="orgRegData.mobile_number"
                label="Mobile Number"
                :rules="requiredRules"
              />
              <q-input
                outlined
                v-model="orgRegData.address"
                label="Address"
                :rules="requiredRules"
              />

              <q-input
                outlined
                v-model="orgRegData.password1"
                label="Password"
                type="password"
                :rules="passwordRules"
                lazy-rules
              />

              <q-input
                outlined
                v-model="orgRegData.password2"
                label="Confirm Password"
                type="password"
                :rules="passwordMatchRulesOrg"
                lazy-rules
              />
              <div>
                <q-btn
                  unelevated
                  color="primary"
                  label="Register"
                  style="width: 100%"
                  type="submit"
                  :loading="registering"
                >
                  <template #loading>
                    <q-spinner-bars class="on-left" />
                    Registering...
                  </template>
                </q-btn>
              </div>
            </q-form>
          </q-card-section>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import {mapActions, mapStores} from "pinia";
// import {useUserStore} from "stores/user";
// import {ref} from "vue";
//
// const tab = ref("teacher");
// const userStore = useUserStore();
// function regTeacher() {
//   userStore.registerTeacher();
// }

import { useUserStore } from "stores/user";
export default {
  name: "RegisterPage",
  data() {
    return {
      tab: "teacher",
      allValid: true,
      teacherRegData: {
        full_name: null,
        email: null,
        phone_number: null,
        password1: null,
        password2: null,
      },
      orgRegData: {
        orgName: null,
        email: null,
        mobile_number: null,
        phone_number: null,
        address: null,
        password1: null,
        password2: null,
      },
      requiredRules: [(val) => !!val || "Field is required"],
      emailRules: [
        (val) => !!val || "Field is required",
        (val) => val.includes("@") || "Invalid email",
      ],
      passwordRules:[
        (val) => !!val || "Field is required",
        (val) => val.length >= 8 || "Password must be at least 8 characters",
      ],
      passwordMatchRulesTeacher: [
        (val) => !!val || "Field is required",
        (val) => val === this.teacherRegData.password1 || "Password doesn't match",
      ],
      passwordMatchRulesOrg: [
        (val) => !!val || "Field is required",
        (val) => val === this.orgRegData.password1 || "Password doesn't match",
      ],
      registering: false
    };
  },
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    async regTeacher() {
      try {
        this.registering = true;
        await this.userStore.registerTeacher(this.teacherRegData);
        this.registering = false;
        await this.$router.push({name: "resume"});
      } catch (e) {
        if(e.response.data.email[0] === "A user is already registered with this e-mail address.") {
          this.userStore.notifyError("User with this email already exist");
        } else {
          this.userStore.notifyError("Internal error")
        }
        this.registering = false;
        console.log(e.response);
      }
    },
    async regOrg() {
      try {
        this.registering = true;
        await this.userStore.registerOrg(this.orgRegData);
        await this.$router.push({name: "dashboard"});
        this.registering = false;
      } catch (e) {
        if(e.response.data.email[0] === "A user is already registered with this e-mail address.") {
          this.userStore.notifyError("User with this email already exist");
        } else {
          this.userStore.notifyError("Internal error")
        }
        this.registering = false;
        console.log(e.response);
      }

    },
  },
};
</script>

<style scoped></style>
