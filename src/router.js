const Home = require('./screens/home/index.vue');
const Settings = require('./screens/settings/index.vue');
const Vue = require('vue');
const VueRouter = require('vue-router');

Vue.use(VueRouter);

module.exports = new VueRouter({
	routes: [
		{ path: '/', component: Home },
		{ path: '/settings/', component: Settings },
	],
});
