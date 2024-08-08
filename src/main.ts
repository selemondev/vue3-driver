import { createApp } from "vue";
import App from "./App.vue";
import vueDriver from "./plugin";
const app = createApp(App);
app.use(vueDriver, {
    showProgress: true
})
app.mount("#app");
