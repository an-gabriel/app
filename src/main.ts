import "./styles/main.css";
import "@fortawesome/fontawesome-free/css/all.css";

import App from "./App.vue";

import { createApp } from "vue";
import { registerPlugins } from "@/plugins";

const app = createApp(App);

registerPlugins(app);

app.mount("#app");
