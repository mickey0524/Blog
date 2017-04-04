import Vue from 'vue';
import VueRouter from 'vue-router';
import front from './front'
import admin from './admin'

Vue.use(VueRouter);

export default new VueRouter({
	mode: 'history',
	routes: [...admin, ...front],
	scrollBehavior: (to, from, savedPosition) => ({ x: 0, y: 0 })
})