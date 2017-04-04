<template>
	<div id="front">
		<SideBar @sm="sm"></SideBar>
		<div class="center">
			<div v-if="showTop" id="sm" >
				<i class="fa fa-outdent" v-if="!openSideBar" @click="smcontorlSideBar(true)"></i>
				<i class="fa fa-times" v-else @click="smcontorlSideBar(false)"></i>
				<span>Mickey的小站</span>
			</div>
			<!-- <Index></Index> -->
			<!-- <SmallLabel></SmallLabel> -->
			<!-- <About></About> -->
			<!-- <Article></Article> -->
			<!-- <LabelContent></LabelContent> -->
			<!-- <Archive></Archive> -->
			<router-view></router-view>
			<footer>
				<p>© 2016 -  Mickey的小站  -  <a href="https://github.com/mickey0524/Blog" target="_blank">博客源码</a></p>
				<p>Powered by  <a href="https://github.com/vuejs/vue" target="_blank">Vue2</a>  &  <a href="https://github.com/koajs/koa" target="_blank">Koa2</a></p>
			</footer>
		</div>
	</div>
</template>

<script>
	import SideBar from './SideBar.vue';
	// import Index from './Index.vue';
	// import SmallLabel from './SmallLabel.vue';
	// import About from './About.vue';
	// import Article from './Article.vue';
	// import LabelContent from './LabelContent.vue';
	// import Archive from './Archive.vue';
	export default {
		components: {
			SideBar
			// Index,
			// SmallLabel,
			// About,
			// Article,
			// LabelContent,
			// Archive
		},
		data () {
			return {
				showTop: false,
				openSideBar: false
			}
		},
		methods: {
			sm (flag) {
				this.showTop = flag;
			},
			smcontorlSideBar (flag) {
				this.$children[0].smcontorlSideBar(flag);
				this.openSideBar = flag;
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../../css/font-awesome.min.css';
	@import '../../sass/front/front.scss';
</style>