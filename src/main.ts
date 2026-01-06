import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@/app/routes";

createApp(App).use(router).mount("#app");
