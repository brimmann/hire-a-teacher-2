import { boot } from 'quasar/wrappers';
import axios from 'axios';
import { Notify } from 'quasar';

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'http://10.140.104.11:8000' });
// api.interceptors.request.use(
//   (config) => {
//     // if (!navigator.onLine) {
//     //   console.log('offline');
//     //   Notify.create({
//     //     message: 'No internet connection',
//     //     type: 'negative',
//     //     position: 'bottom-left',
//     //     timeout: 5000,
//     //   });
//     //   return false;
//     // }
//
//     return config;
//   },
//   (error) => {
//     console.log('on-rejected', error);
//   }
// );
//
// api.interceptors.response.use((response) => {
//   console.log(response);
// });

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
