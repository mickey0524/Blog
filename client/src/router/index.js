import Vue from 'vue';
import VueRouter from 'vue-router';
import front from './front'
import admin from './admin'

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [...admin, ...front],
	scrollBehavior: (to, from, savedPosition) => ({ x: 0, y: 0 })
})

// router.beforeEach((to, from, next) => {
// 	next();
// })

export default router;