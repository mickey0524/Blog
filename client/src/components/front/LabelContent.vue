<template>
	<div id="labelContent">
		<div class="title">
			<p>标签<span>{{ title }}</span>下的文章</p>
		</div>
		<ArticleList></ArticleList>
	</div>
</template>

<script>
	import ArticleList from './ArticleList.vue'
	export default {
		data () {
			return {
				title: 'vue'
			}
		},
		components: {
			ArticleList
		}
	}
</script>

<style lang="sass" scoped>
	@import '../../sass/front/labelContent.scss';
</style>