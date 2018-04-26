// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router'
import '../static/css/reset.css'
import storage from '@/utils/storage.js'
import examTimes from '@/utils/examTimes.js'
import { Toast } from 'mint-ui';

Vue.config.productionTip = false
Vue.prototype.$storage = storage;
Vue.prototype.$examtimes = examTimes;
Vue.use(MintUI)

router.beforeEach((to, from, next) => {

	//to即将进入的目标路由对象，from当前导航正要离开的路由， next  :  下一步执行的函数钩子
	if(to.path === '/') {
		next()
	} // 如果即将进入登录路由，则直接放行
	else { //进入的不是登录路由
		setTimeout(function() {

			if(to.meta.requiresAuth && !sessionStorage.getItem('userid')) {
				Toast('-请登录-');
				next({
					path: '/'
				})
			} else { //下一跳路由需要登录验证，并且还未登录，则路由定向到  登录路由
				next()
			}

		}, 0.2)

	} //如果不需要登录验证，或者已经登录成功，则直接放行

})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})




/*vue 登录验证 https://blog.csdn.net/woxiaole_521/article/details/78455621*/