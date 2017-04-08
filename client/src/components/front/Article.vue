<template>
	<div id="article">
		<header>
			<span>{{ name }}</span>
			<span>{{ createdTime }}</span>
		</header>
		<div v-html="content" class="entry-content">
			
		</div>
	</div>
</template>

<script>
	export default {
		mounted () {
			let pathName = this.$route.params.articlePathName;
			for (let i in this.$store.state.articleList) {
				if (this.$store.state.articleList[i].pathName === pathName) {
					this.name = this.$store.state.articleList[i].title;
					this.createdTime = this.$store.state.articleList[i].updatedAt;
					this.content = this.$store.state.articleList[i].markdownContent;
				}
			}
		},
		data () {
			return {
				name: '',
				createdTime: '',
				content: ''
			}
		}
	}
</script>

<style lang="sass">
	@import '../../sass/front/article.scss';
</style>