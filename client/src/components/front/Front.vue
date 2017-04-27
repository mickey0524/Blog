<template>
	<div id="front">
		<SideBar @sm="sm"></SideBar>
		<div class="center">
			<div v-if="showTop" id="sm" >
				<i class="fa fa-outdent" v-if="!openSideBar" @click="smcontorlSideBar(true)"></i>
				<i class="fa fa-times" v-else @click="smcontorlSideBar(false)"></i>
				<span>Mickey的小站</span>
			</div>
			<router-view></router-view>
			<div :class="{ 'hide': !isScroll }" id="arrow-up" @click="arrowUp">
				<i class="fa fa-arrow-up"></i>
			</div>
			<footer>
				<p>© 2017 -  Mickey的小站  -  <a href="https://github.com/mickey0524/Blog" target="_blank">博客源码</a></p>
				<p>Powered by  <a href="https://github.com/vuejs/vue" target="_blank">Vue2</a>  &  <a href="https://github.com/koajs/koa" target="_blank">Koa2</a></p>
			</footer>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import SideBar from './SideBar.vue';
	import { changeTime } from '../../api/dealTime.js';
	export default {
		mounted () {
			document.getElementsByClassName('center')[0].addEventListener('scroll', this.scroll, false);
			if (this.$store.state.articleList.length === 0) {
				axios.get('http://localhost:3000/getArticleList', {})
				.then((response) => {
					for (let i in response.data.articleList) {
						response.data.articleList[i].createdAt = changeTime(response.data.articleList[i].createdAt);
						response.data.articleList[i].updatedAt = changeTime(response.data.articleList[i].updatedAt);
					}
					this.$store.commit('getArticleList', response.data.articleList);
					this.$store.commit('changeCurArticleList', response.data.articleList);
				})				
			}
			if (this.$store.state.tagList.length == 0) {
				axios.get('http://localhost:3000/getAllTag', {})
				.then((response) => {
					if (response.data.httpresult == 200) {
						for (let i in response.data.tagList) {
							response.data.tagList[i].createdAt = changeTime(response.data.tagList[i].createdAt);
						}
						this.$store.commit('createTagList', response.data.tagList); 
					}
				})
			}			
		},
		components: {
			SideBar
		},
		data () {
			return {
				showTop: false,
				openSideBar: false,
				isScroll: false
			}
		},
		methods: {
			sm (flag) {
				if (!flag) {
					this.openSideBar = false;
				}
				this.showTop = flag;
			},
			smcontorlSideBar (flag) {
				this.$children[0].smcontorlSideBar(flag);
				this.openSideBar = flag;
			},
			scroll () {
				if (document.getElementsByClassName('center')[0].scrollTop > 0) {
					this.isScroll = true;
				}
				else {
					this.isScroll = false;
				}
			},
			arrowUp () {
				document.getElementsByClassName('center')[0].scrollTop = 0;
				this.isScroll = false;
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../../css/font-awesome.min.css';
	@import '../../sass/front/front.scss';
</style>