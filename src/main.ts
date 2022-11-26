import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { IonicVue } from "@ionic/vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";
import { plugin, defaultConfig } from "@formkit/vue";
import { generateClasses } from "@formkit/themes";

const pinia = createPinia();

const axiosInstance = axios.create({
	baseURL: "https://u-blog-backend.com/",
});

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

/* Theme variables */
// import "./theme/variables.css";

/* formkit themes */
// import '@formkit/themes/genesis'

/* formkit tailwindcss themes */
const textClassification = {
	label: "block mb-1 font-bold text-sm formkit-invalid:text-red-500",
	inner: `
      max-w-md
      border
      border-gray-400
      formkit-invalid:border-red-500
      rounded-lg mb-1
      overflow-hidden
      focus-within:border-blue-500
    `,
	input: "w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400",
};
const boxClassification = {
	fieldset: "max-w-md border border-gray-400 rounded-md px-2 pb-1",
	legend: "font-bold text-sm",
	wrapper: "flex items-center mb-1 cursor-pointer",
	help: "mb-2",
	input: "form-check-input appearance-none h-5 w-5 mr-2 border border-gray-500 rounded-sm bg-white checked:bg-blue-500 focus:outline-none focus:ring-0 transition duration-200",
	label: "text-sm text-gray-700 mt-1",
};
const buttonClassification = {
	wrapper: "mb-1",
	input: "bg-blue-500 hover:bg-blue-700 text-white text-sm font-normal py-3 px-5 rounded",
};

const app = createApp(App)
	.use(IonicVue)
	.use(router)
	.use(VueAxios, axiosInstance)
	.use(pinia)
	.use(
		plugin,
		defaultConfig({
			config: {
				classes: generateClasses({
					global: {
						outer: "mb-5 formkit-disabled:opacity-50",
						help: "text-xs text-gray-500",
						messages: "list-none p-0 mt-1 mb-0",
						message: "text-red-500 mb-1 text-xs",
					},
					button: buttonClassification,
					color: {
						label: "block mb-1 font-bold text-sm",
						input: "w-16 h-8 appearance-none cursor-pointer border border-gray-300 rounded-md mb-2 p-1",
					},
					date: textClassification,
					"datetime-local": textClassification,
					checkbox: boxClassification,
					email: textClassification,
					file: {
						label: "block mb-1 font-bold text-sm",
						inner: "max-w-md cursor-pointer",
						input: "text-gray-600 text-sm mb-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-500 file:text-white hover:file:bg-blue-600",
						noFiles: "block text-gray-800 text-sm mb-1",
						fileItem: "block flex text-gray-800 text-sm mb-1",
						fileRemove: "ml-auto text-blue-500 text-sm",
					},
					month: textClassification,
					number: textClassification,
					password: textClassification,
					radio: {
						...boxClassification,
						input: boxClassification.input.replace(
							"rounded-sm",
							"rounded-full"
						),
					},
					range: {
						inner: "max-w-md",
						input: "form-range appearance-none w-full h-2 p-0 bg-gray-200 rounded-full focus:outline-none focus:ring-0 focus:shadow-none",
					},
					search: textClassification,
					select: textClassification,
					submit: buttonClassification,
					tel: textClassification,
					text: textClassification,
					textarea: {
						...textClassification,
						input: "block w-full h-32 px-3 border-none text-base text-gray-700 placeholder-gray-400 focus:shadow-outline",
					},
					time: textClassification,
					url: textClassification,
					week: textClassification,
				}),
			},
		})
	);

router.isReady().then(() => {
	app.mount("#app");
});
