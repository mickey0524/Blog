<template>
	<div id="article">
		<header>
			<span>{{ name }}</span>
			<span>{{ createdTime }}</span>
		</header>
		<div>
			<div class="appendix">
				<header>文章目录</header>
				<div id="appendix-content" class="content"></div>
			</div>	
			<div class="entry-content" v-html="content"></div>		
		</div>

	</div>
</template>

<script>
	import { generateArr, buildTree } from '../../api/generateTree';
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
			document.getElementById('appendix-content').appendChild(buildTree(generateArr(this.content)));
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