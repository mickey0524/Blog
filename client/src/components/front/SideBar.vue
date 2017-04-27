<template>
	<div id="sideBar">
		<div v-if="screenWidth > 1024 || openSideBar" id="lg">
		<!-- <div :class="{ 'show-slideBar': screenWidth > 1024 || openSideBar }" id="lg"> -->
			<p class="title">Mickey的小站</p>
			<nav>
				<div @click="$router.push('/front')"><i class="fa fa-home"></i><span>首页</span></div>
				<div @click="$router.push('/front/archive')"><i class="fa fa-file-text"></i><span>归档</span></div>
				<div @click="$router.push('/front/label')"><i class="fa fa-tag"></i><span>标签</span></div>
				<div @click="$router.push('/front/about')"><i class="fa fa-user"></i><span>关于</span></div>
			</nav>
			<div class="more-mes">
				<a href="https://github.com/mickey0524" target="_blank"><i class="fa fa-github"></i></a>
				<a href="http://weibo.com/u/3756255342" target="_blank"><i class="fa fa-weibo"></i></a>
				<a href="http://music.163.com/#/user/home?id=271138002" target="_blank"><i class="fa fa-cloud"></i></a>
			</div>
		</div>
		<div v-if="screenChange" id="md">
			<i class="fa fa-home" @click="$router.push('/front')"></i>
			<i class="fa fa-file-text" @click="$router.push('/front/archive')"></i>
			<i class="fa fa-tag" @click="$router.push('/front/label')"></i>
			<i class="fa fa-user" @click="$router.push('/front/about')"></i>
			<a href="https://github.com/mickey0524" target="_blank"><i class="fa fa-github"></i></a>
			<a href="http://weibo.com/u/3756255342" target="_blank"><i class="fa fa-weibo"></i></a>
			<a href="http://music.163.com/#/user/home?id=271138002" target="_blank"><i class="fa fa-cloud"></i></a>
		</div>
	</div>
</template>

<script>
	export default {
		mounted () {
			const _this = this;
			window.onresize = () => {
				return (() => {
					_this.screenWidth = document.body.clientWidth;
				})();
			}
			if (document.body.clientWidth <= 768) {
				this.$emit('sm', true);
			}
			else {
				this.$emit('sm', false);
			}			
		},
		data () {
			return {
				screenWidth: document.body.clientWidth,
				timer: false,
				openSideBar: false
			}
		},
		computed: {
			screenChange () {
				return this.screenWidth > 768 && this.screenWidth <= 1024;
			}
		},
		methods: {
			smcontrolSideBar (flag) {
				this.openSideBar = flag;
			}
		},
		watch: {
			screenWidth (val) {
				if (!this.timer) {
					this.screenWidth = val;
					if (val <= 768) {
						this.$emit('sm', true);
					}
					else {
						this.openSideBar = false;
						this.$emit('sm', false);
					}
					this.timer = true;
					let _this = this;
					setTimeout(function() {
						_this.timer = false;
					}, 100);
				}
				
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../../sass/front/sideBar.scss';
</style>