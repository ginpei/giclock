const App = require('./App.vue')
const Vue = require('vue')
const router = require('./router.js');
const store = require('./store.js');

new Vue({  // eslint-disable-line no-new
	el: '#app',
	store,
	router,
	render: f=>f(App),
})
