import { createApp } from "vue";
import App from "./App.vue";
import "./styles/styles.scss";
import "sweetalert2/src/sweetalert2.scss";
import router from "./router/index";
import { createPinia } from "pinia";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount("#app");
