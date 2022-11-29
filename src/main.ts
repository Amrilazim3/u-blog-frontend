import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { IonicVue } from "@ionic/vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate  from "pinia-plugin-persistedstate";
import axios from "axios";
import VueAxios from "vue-axios";
import { plugin, defaultConfig } from "@formkit/vue";
/* formkit themes */
import "@formkit/themes/genesis";
/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";
/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";
/* tailwindcss styles */
import '@/styles/app.css';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const axiosInstance = axios.create({
	baseURL: process.env.VUE_APP_API_KEY,
});

const app = createApp(App);
app.use(IonicVue);
app.use(router);
app.use(VueAxios, axiosInstance);
app.use(pinia);
app.use(plugin, defaultConfig);

router.isReady().then(() => {
	app.mount("#app");
});