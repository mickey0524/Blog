<template>
	<div id="articleList">
		<div v-for="(item, index) in currentPage" class="article">
			<span @click="routeToArticle(index)">{{ item.title }}</span>
			<span>{{ item.updatedAt }}</span>
			<div v-html="item.markdownToc"></div>
		</div>		
		<Pagination :last-page="hasLastPage" :next-page="hasNextPage" :page-num="pageNum"></Pagination>
	</div>
</template>

<script>
	import Pagination from './Pagination.vue';
	export default {
		// mounted () {
		// 	this.start();
		// },
		data () {
			return {
				hasNextPage: false,
				hasLastPage: false,
				pageNum: 1
			}
		},
		computed: {
			articleLists () {
				if (this.$route.params.tag) {
					let list = [];
					for (let i in this.$store.state.articleList) {
						if (this.$store.state.articleList[i].tags.indexOf(this.$route.params.tag) !== -1) {
							list.push(this.$store.state.articleList[i]);
						}
					}
					return list;
				}
				else {
					return this.$store.state.articleList;
				}
			},
			currentPage () {
				if (!this.$route.query.page) {
					this.hasLastPage = false;
					this.pageNum = 1;
					if (this.articleLists.length > 10) {
						this.hasNextPage = true;
						return this.articleLists.slice(0, 10);
					}
					else {
						this.hasNextPage = false;
						return this.articleLists;
					}
				}
				else {
					this.pageNum = parseInt(this.$route.query.page);
					this.hasLastPage = true;
					if (this.pageNum === Math.ceil(this.articleLists.length / 10)) {
						this.hasNextPage = false;
						return this.articleLists.slice((this.$route.query.page - 1) * 10, this.articleLists.length);
					}
					else {
						this.hasNextPage = true;
						return this.articleLists.slice((this.$route.query.page - 1) * 10, this.$route.query.page * 10);
					}
				}
			}
		},
		components: {
			Pagination
		},
		methods: {
			// start () {
			// 	if (!this.$route.query.page) {
			// 		this.hasLastPage = false;
			// 		this.pageNum = 1;
			// 		if (this.articleLists.length > 10) {
			// 			this.hasNextPage = true;
			// 		}
			// 		else {
			// 			this.hasNextPage = false;
			// 		}
			// 	}
			// 	else {
			// 		this.pageNum = this.$route.query.page;
			// 		this.hasLastPage = true;
			// 		console.log(Math.ceil(this.articleLists.length / 10));
			// 		if (this.$route.query.page < Math.ceil(this.articleLists.length / 10)) {
			// 			this.hasNextPage = true;
			// 		}
			// 		else {
			// 			this.hasNextPage = false;
			// 		}
			// 	}
			// },
			routeToArticle (index) {
				this.$store.commit('changeCurArticleList', this.articleLists);
				this.$store.commit('changeArticleIndex', index);
				this.$router.push('/front/article/' + this.articleLists[index].pathName);
			}
		}
		// watch: {
		// 	'$route': 'start'
		// }
	}
</script>

<style lang="sass">
	@import '../../sass/front/articleList.scss';
</style>