import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import ProgramPage from '../pages/ProgramPage.vue';
import VanFinderPage from '../pages/VanFinderPage.vue';
import VendorDetailPage from '../pages/VendorDetailPage.vue';
import SolutionsPage from '../pages/SolutionsPage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/program', name: 'program', component: ProgramPage },
  { path: '/member-finder', redirect: '/van-finder' },
  { path: '/van-finder', name: 'van-finder', component: VanFinderPage },
  { path: '/vendors/:slug', name: 'vendor-detail', component: VendorDetailPage, props: true },
  { path: '/solutions', name: 'solutions', component: SolutionsPage },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
