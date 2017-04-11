<template>
	<div id="articleList">
		<div v-for="(item, index) in articleLists" class="article">
			<span @click="routeToArticle(index)">{{ item.title }}</span>
			<span>{{ item.updatedAt }}</span>
			<div v-html="item.markdownToc"></div>
		</div>
	</div>
</template>

<script>
	export default {
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
			}
		},
		methods: {
			routeToArticle (index) {
				this.$store.commit('changeCurArticleList', this.articleLists);
				this.$store.commit('changeArticleIndex', index);
				this.$router.push('/front/article/' + this.articleLists[index].pathName);
			}
		}
	}
</script>

<style lang="sass">
	@import '../../sass/front/articleList.scss';
</style>