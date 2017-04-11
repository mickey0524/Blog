<template>
	<div id="article">
		<header>
			<span>{{ name }}</span>
			<span>{{ createdTime }}</span>
		</header>
		<div>
			<div class="appendix" v-show="hasAppendix">
				<header>文章目录</header>
				<div id="appendix-content" class="content"></div>
			</div>	
			<div class="entry-content" v-html="content"></div>		
		</div>
		<footer>
			<span v-if="lastArticle.hasLast" @click="routeToLast" class="lastArticle">« {{ lastArticle.title }}</span>
			<span v-if="nextArticle.hasNext" @click="routeToNext" class="nextArticle">{{ nextArticle.title }} »</span>
		</footer>
	</div>
</template>

<script>
	import { generateArr, buildTree } from '../../api/generateTree';
	export default {
		mounted () {
			let _this = this;
			let timer = setInterval(function () {
				if (_this.$store.state.curArticleList.length !== 0) {
					clearInterval(timer);
					_this.startComponent();
				}
			}, 1000 / 60);	
		},
		data () {
			return {
				name: '',
				createdTime: '',
				content: '',
				lastArticle: { hasLast: true, title: '', pathName: '' },
				nextArticle: { hasNext: true, title: '', pathName: '' },
				hasAppendix: true
			}
		},
		methods: {
			startComponent () {
				let pathName = this.$route.params.articlePathName;
				//console.log(this.$store.state.curArticleList);
				for (let i in this.$store.state.curArticleList) {
					if (this.$store.state.curArticleList[i].pathName === pathName) {
						this.name = this.$store.state.curArticleList[i].title;
						this.createdTime = this.$store.state.curArticleList[i].updatedAt;
						this.content = this.$store.state.curArticleList[i].markdownContent;
					}
				}
				let treeContent = buildTree(generateArr(this.content));
				document.getElementById('appendix-content').innerHTML = '';
				if (!treeContent.innerHTML) {
					this.hasAppendix = false;
				}
				else {
					this.hasAppendix = true;
					document.getElementById('appendix-content').appendChild(treeContent);
				}	
				if (this.$store.state.articleIndex === 0) {
					this.lastArticle.hasLast = false;
				}
				else {
					this.lastArticle.hasLast = true;
					this.lastArticle.title = this.$store.state.curArticleList[this.$store.state.articleIndex - 1].title;
					this.lastArticle.pathName = this.$store.state.curArticleList[this.$store.state.articleIndex - 1].pathName;
				}
				if (this.$store.state.articleIndex === this.$store.state.curArticleList.length - 1) {
					this.nextArticle.hasNext = false;
				}
				else {
					this.nextArticle.hasNext = true;
					this.nextArticle.title = this.$store.state.curArticleList[this.$store.state.articleIndex + 1].title;
					this.nextArticle.pathName = this.$store.state.curArticleList[this.$store.state.articleIndex + 1].pathName;				
				}
			},
			routeToLast () {
				this.$store.commit('changeArticleIndex', this.$store.state.articleIndex - 1);
				this.$router.push('/front/article/' + this.lastArticle.pathName);
			},
			routeToNext () {
				this.$store.commit('changeArticleIndex', this.$store.state.articleIndex + 1);
				this.$router.push('/front/article/' + this.nextArticle.pathName);
			}
		},
		watch: {
			'$route': 'startComponent'
		}
	}
</script>

<style lang="sass">
	@import '../../sass/front/article.scss';
</style>