import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Home from "@/pages/Home.vue";
import Tools from "@/pages/Tools.vue";
import NotFound from "@/pages/NotFound.vue";

import CalculatorTool from "@/tools/calculator/index.vue";
import QrTool from "@/tools/qr/index.vue";

import { TOOLS } from "./tool-registry";

const toolComponents: Record<string, any> = {
  calculator: CalculatorTool,
  qr: QrTool,
  // invoice/queue later
};

const toolRoutes: RouteRecordRaw[] = TOOLS.filter((t) => t.enabled).map((t) => {
  const key = t.key;
  const component = toolComponents[key];
  if (!component) {
    // if enabled but component missing, still avoid crash
    return { path: t.route, component: NotFound };
  }
  return { path: t.route, component };
});

const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  { path: "/tools", component: Tools },
  ...toolRoutes,
  { path: "/:pathMatch(.*)*", component: NotFound },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
