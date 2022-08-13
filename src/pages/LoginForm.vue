<template>
  <q-page padding class="row flex-center">
    <q-dialog v-model="forgetPassword" persistent>
      <q-card square flat class="full-width">
        <q-card-section class="row justify-between">
          <div class="text-subtitle1 text-bold">Reset password</div>
          <q-space />
          <q-btn dense flat icon="close" @click="done" />
        </q-card-section>

        <q-stepper v-model="step" color="primary" animated vertical>
          <q-step :name="1" title="Enter your email address" icon="email" :done="step > 1">
            <q-input
              dense
              outlined
              label="Email address"
              v-model="forgetEmail"
              :readonly="emailInitialSent"
              class="text-body2"
              :class="{ 'text-caption': $q.screen.width < 400 }"
              no-error-icon
              :error="emailError !== null"
              :error-message="emailError"
              hide-bottom-space
              clearable
            >
              <template #append v-if="$q.screen.width < 520">
                <q-btn
                  color="accent"
                  flat
                  dense
                  size="0.5em"
                  no-caps
                  rounded
                  unelevated
                  icon-right="send"
                  :disable="!resentActive"
                  :loading="emailSending"
                  @click="resetRequest"
                />
              </template>
              <template #after v-else>
                <q-btn
                  color="accent"
                  padding="xs sm"
                  dense
                  outline
                  no-caps
                  unelevated
                  icon-right="send"
                  label="Send code"
                  :disable="!resentActive"
                  :loading="emailSending"
                  class="full-height"
                  @click="resetRequest"
                />
              </template>
            </q-input>
            <template v-if="emailInitialSent">
              <div class="row">
                <q-btn
                  flat
                  dense
                  no-caps
                  label="Change email"
                  color="primary"
                  size="0.8em"
                  class="q-mt-sm"
                  @click="changeEmail"
                />
                <q-space />
              </div>
              <div class="q-mt-lg">
                <div class="text-caption text-weight-bold q-mb-xs">
                  Confirmation code sent to your email
                </div>
                <q-input
                  dense
                  outlined
                  label="Enter code"
                  style="width: 150px"
                  :error-message="tokenError"
                  :error="tokenError !== null"
                  hide-bottom-space
                  no-error-icon
                  v-model="token"
                />
                <div class="text-caption text-grey q-mt-sm" v-if="!resentActive">
                  Resend available in {{ resendActiveSec }} sec
                </div>
              </div>
            </template>
            <q-stepper-navigation v-if="this.emailInitialSent">
              <q-btn
                dense
                no-caps
                padding="xs md"
                @click="tokenValidate"
                color="primary"
                label="Continue"
                :loading="validatingToken"
              >
                <template #loading>
                  <q-spinner-bars class="on-left" />
                </template>
              </q-btn>
            </q-stepper-navigation>
          </q-step>

          <q-step :name="2" title="Create new password" icon="key" :done="step > 2">
            <q-form @submit.prevent.stop="changePassword">
              <q-input
                dense
                outlined
                v-model="pass1"
                type="password"
                label="New password"
                class="q-mb-md"
                :rules="pass1Rule"
                lazy-rules
                hide-bottom-space
                no-error-icon
              />
              <q-input
                dense
                outlined
                v-model="pass2"
                type="password"
                label="Re-enter new password"
                :rules="pass2Rule"
                lazy-rules
                hide-bottom-space
                no-error-icon
              />
              <q-stepper-navigation>
                <q-btn
                  dense
                  no-caps
                  padding="xs md"
                  type="submit"
                  color="primary"
                  label="Change password"
                  :loading="changingPassword"
                >
                  <template #loading>
                    <q-spinner-bars class="on-left" />
                  </template>
                </q-btn>
              </q-stepper-navigation>
            </q-form>
          </q-step>
          <q-step :name="3" title="Finishing up" icon="done" :done="step > 3">
            <div class="text-body2">Successfully reset password for {{ this.forgetEmail }}</div>
            <q-stepper-navigation>
              <q-btn
                dense
                no-caps
                padding="xs md"
                @click="done"
                color="primary"
                label="Done"
              />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </q-card>
    </q-dialog>
    <q-card flat bordered class="my-card" :class="{ 'q-pa-lg': $q.screen.sm }">
      <q-card-section>
        <div class="text-body1 text-center">Please enter your login information</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent.stop="login" class="column q-col-gutter-md">
          <q-input
            outlined
            v-model="email"
            label="Email Address"
            maxlength="500"
            style="width: 300px"
            :rules="emailRules"
            lazy-rules
          />
          <q-input
            outlined
            v-model="password"
            label="Password"
            type="password"
            :rules="requiredRules"
          />
          <q-btn
            flat
            dense
            color="secondary"
            label="Forgot password?"
            class="self-end"
            padding="xs"
            @click="forgetPassword = true"
          />
          <div class="text-center">
            <q-btn-toggle
              v-model="loginMode"
              class="my-custom-toggle q-mb-sm"
              no-caps
              rounded
              unelevated
              spread
              toggle-color="primary"
              color="white"
              text-color="primary"
              :options="[
                { label: 'Teacher', value: 'teacher' },
                { label: 'Organization', value: 'org' },
              ]"
            />
          </div>
          <div>
            <q-btn
              unelevated
              color="primary"
              label="Login"
              type="submit"
              style="width: 100%"
              :loading="loggingIn"
            >
              <template #loading>
                <q-spinner-bars class="on-left" />
                Logging in...
              </template>
            </q-btn>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapStores } from 'pinia';
import { useUserStore } from 'stores/user';
import { api } from 'boot/axios';

export default {
  name: 'LoginForm',
  data() {
    return {
      loginMode: 'teacher',
      email: '',
      password: '',
      requiredRules: [(val) => !!val || 'Field is required'],
      emailRules: [
        (val) => !!val || 'Field is required',
        (val) => val.includes('@') || 'Invalid email',
      ],
      loggingIn: false,
      forgetPassword: false,
      emailInitialSent: false,
      emailResent: false,
      emailSending: false,
      emailError: null,
      resentActive: true,
      resendActiveSec: 40,

      tokenError: null,
      validatingToken: false,

      pass1Rule: [
        (val) => !!val || 'Cannot be blank',
        (val) => val.length >= 8 || 'Password must be at least 8 characters',
      ],
      pass2Rule: [
        (val) => !!val || 'Cannot be blank',
        (val) => val.length >= 8 || 'Password must be at least 8 characters',
        (val) => val === this.pass1 || 'Password does not match',
      ],
      changingPassword: false,

      pass1: '',
      pass2: '',
      forgetEmail: null,
      token: null,
      step: 1,
    };
  },
  computed: {
    ...mapStores(useUserStore),
  },
  watch: {
    emailError(newVal) {
      if (newVal !== null) {
        const timeout = setTimeout(() => {
          this.emailError = null;
          clearTimeout(timeout);
        }, 3000);
      }
    },
    tokenError(newVal) {
      console.log('watcher called', newVal);
      if (newVal !== null) {
        const timeout = setTimeout(() => {
          this.tokenError = null;
          clearTimeout(timeout);
        }, 3000);
      }
    },
  },
  methods: {
    async login() {
      if (!navigator.onLine) {
        this.userStore.notifyError('No internet connection');
        return;
      }
      try {
        this.loggingIn = true;
        await this.userStore.login({
          email: this.email,
          password: this.password,
          type: this.loginMode,
        });
        this.loggingIn = false;
        if (this.loginMode === 'org') {
          await this.$router.push('/org');
        } else {
          await this.$router.push('/teacher');
        }
      } catch (e) {
        this.loggingIn = false;
        if (e.response !== undefined) {
          if (
            e.response.data.detail === 'Authentication credentials were not provided.' ||
            e.response.status === 400
          ) {
            this.userStore.notifyError('Invalid email, password or user type');
          } else {
            this.userStore.notifyError('Internal error');
          }
        }
        console.log(e.response);
      }
    },
    async resetRequest() {
      if (this.forgetEmail === null) {
        this.emailError = 'Cannot be blank';
        return;
      } else if (!this.forgetEmail.includes('@')) {
        this.emailError = 'Invalid email';
        return;
      }
      try {
        this.emailSending = true;
        const res = await this.userStore.requestResetPassword({ email: this.forgetEmail });
        console.log('the res is ', res);
        this.emailSending = false;
        if (res.status === 200) {
          this.emailInitialSent = true;
          this.resentActive = false;
          const interval = setInterval(() => {
            this.resendActiveSec--;
            if (this.resendActiveSec <= 0) {
              this.resentActive = true;
              this.resendActiveSec = 40;
              clearInterval(interval);
            }
          }, 1000);
        }
      } catch (e) {
        this.emailSending = false;
        if (e.response === undefined) {
          console.log('forget-error');
          return;
        }
        if (e.response.status === 400) {
          this.emailError = 'No account registered with this email';
        } else {
          this.emailError = 'Internal error try again';
        }
      }
    },
    async tokenValidate() {
      if (this.token === null) {
        this.tokenError = 'Cannot be blank';
        return;
      }
      try {
        this.validatingToken = true;
        const res = await this.userStore.validateToken({ token: parseInt(this.token) });
        if (res.status === 200) {
          this.step = 2;
          this.validatingToken = false;
        }
      } catch (e) {
        this.validatingToken = false;
        if (e.response === undefined) {
          console.log('forget-error');
          return;
        }

        if (e.response.status === 404) {
          this.tokenError = 'Invalid code';
        } else {
          this.tokenError = 'Internal error try again';
        }
      }
    },
    async changePassword() {
      try {
        const response = await api.post('/api/v1/password_reset/confirm/', {
          password: this.pass1,
          token: this.token,
        });
        if (response.status === 200) {
          this.step = 3;
        }
      } catch (e) {
        console.log('change-error', e.message);
        this.userStore.notifyError('Internal error try again');
      }
    },
    changeEmail() {
      const temp = this.forgetEmail;
      this.resetDialog();
      this.forgetEmail = temp;
    },
    done() {
      this.forgetPassword = false;
      this.resetDialog();
    },
    resetDialog() {
      this.loggingIn = false;
      this.emailInitialSent = false;
      this.emailSending = false;
      this.emailError = null;
      this.resentActive = true;
      this.resendActiveSec = 40;

      this.tokenError = null;
      this.validatingToken = false;
      this.changingPassword = false;

      this.pass1 = '';
      this.pass2 = '';
      this.forgetEmail = null;
      this.token = null;
      this.step = 1;
    },
  },
};
</script>

<style scoped>
.my-custom-toggle {
  border: 1px solid #027be3;
}
</style>
