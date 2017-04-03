<template>
	<div id="index">
		<ArticleList></ArticleList>
	</div>
</template>

<script>
	import ArticleList from './ArticleList.vue'
	export default {
		components: {
			ArticleList
		}
	}
</script>

<style lang="sass" scoped>
	@import '../../sass/front/index.scss';
</style>