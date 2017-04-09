
import Login from '../components/admin/Login.vue';
import Back from '../components/admin/Back.vue';
import Overview from '../components/admin/Overview.vue';
import ArticleList from '../components/admin/ArticleList.vue';
import ArticleEdit from '../components/admin/ArticleEdit.vue';
import LabelManage from '../components/admin/LabelManage.vue';
import Account from '../components/admin/Account.vue';

export default [
	{
		path: '/back',
		component: Back,
		children: [
			{
				path: '',
				component: Overview
			},
			{
				path: 'articleList',
				component: ArticleList
			},
			{
				path: 'articleEdit',
				component: ArticleEdit
			},
			{
				path: 'labelManage',
				component: LabelManage
			},
			{
				path: 'account',
				component: Account				
			}
		]
	},
	{
		path: '/login',
		component: Login		
	}
]