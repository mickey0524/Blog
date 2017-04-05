<template>
	<div id="back">
		<el-row class="top-banner" type="flex" align="middle">
			<el-col :span="20" :push="2">
				<span class="demonstration">Mickey Blog</span>
				<img src="../../assets/avatar.jpg" width="40px" height="40px">
			</el-col>
			<el-col :span="4" :push="1">
				<el-dropdown trigger="click" menu-align="start" @command="handleCommand">
					<span class="el-dropdown-link">更多操作<i class="el-icon-caret-bottom el-icon--right"></i></span>
					<el-dropdown-menu>
						<el-dropdown-item command="/front">博客首页</el-dropdown-item>
						<el-dropdown-item command="/manageLogin">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-row>
		<el-row class="center">
			<el-col :span="4">
				<el-menu default-active="1" style="height: 620px;">
					<el-menu-item index="1" @click="$router.push('/back')"><i class="el-icon-date"></i>概述</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>文章管理</template>
						<el-menu-item index="2-1" @click="$router.push('/back/articleList')">文章列表</el-menu-item>
						<el-menu-item index="2-2" @click="$router.push('/back/articleEdit')">添加文章</el-menu-item>
					</el-submenu>
					<el-menu-item index="3" @click="$router.push('/back/labelManage')"><i class="el-icon-star-off"></i>标签管理</el-menu-item>
					<el-menu-item index="4" @click="$router.push('/back/account')"><i class="el-icon-setting"></i>账号管理</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="20">
				<!-- <ArticleEdit></ArticleEdit> -->
				<!-- <ArticleList></ArticleList> -->
				<!-- <Overview></Overview> -->
				<!-- <LabelManage></LabelManage> -->
				<!-- <Account></Account> -->
				<router-view></router-view>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	// import ArticleList from './ArticleList.vue';
	// import Overview from './Overview.vue';
	// import ArticleEdit from './ArticleEdit.vue';
	// import LabelManage from './LabelManage.vue';
	// import Account from './Account.vue';
	export default {
		// components: {
		// 	ArticleList,
		// 	Overview,
		// 	ArticleEdit,
		// 	LabelManage,
		// 	Account
		// }
		methods: {
			handleCommand (command) {
				this.$router.push(command);
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../../sass/admin/back.scss';
</style>