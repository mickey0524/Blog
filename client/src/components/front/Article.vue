<template>
	<div id="article">
		<header>
			<span>{{ name }}</span>
			<span>{{ createdTime }}</span>
		</header>
		<div>
			
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				name: '博客优化点：轮子之心',
				createdTime: '2017-03-04 21:47:04'
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../../sass/front/article.scss';
</style>