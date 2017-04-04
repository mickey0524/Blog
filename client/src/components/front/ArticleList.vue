<template>
	<div id="articleList">
		<div v-for="item in articleLists" class="article">
			<span @click="$router.push('/front/article/as')">{{ item.title }}</span>
			<span>{{ item.createdTime }}</span>
			<p>{{ item.header }}</p>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				articleLists: [
					{
						title: '博客优化点 : 轮子之心',
						createdTime: '2017-03-04 21:47:04',
						header: '本博客虽然使用了SSR，但仍然采用了各种优化手段来提高首屏访问速度。本文介绍其中一种比较少见的优化手段：造轮子'
					},
					{
						title: '博客优化点 : 轮子之心',
						createdTime: '2017-03-04 21:47:04',
						header: '本博客虽然使用了SSR，但仍然采用了各种优化手段来提高首屏访问速度。本文介绍其中一种比较少见的优化手段：造轮子'
					},
					{
						title: '博客优化点 : 轮子之心',
						createdTime: '2017-03-04 21:47:04',
						header: '本博客虽然使用了SSR，但仍然采用了各种优化手段来提高首屏访问速度。本文介绍其中一种比较少见的优化手段：造轮子'
					},
					{
						title: '博客优化点 : 轮子之心',
						createdTime: '2017-03-04 21:47:04',
						header: '本博客虽然使用了SSR，但仍然采用了各种优化手段来提高首屏访问速度。本文介绍其中一种比较少见的优化手段：造轮子'
					},
					{
						title: '博客优化点 : 轮子之心',
						createdTime: '2017-03-04 21:47:04',
						header: '本博客虽然使用了SSR，但仍然采用了各种优化手段来提高首屏访问速度。本文介绍其中一种比较少见的优化手段：造轮子'
					},
					{
						title: '博客优化点 : 轮子之心',
						createdTime: '2017-03-04 21:47:04',
						header: '本博客虽然使用了SSR，但仍然采用了各种优化手段来提高首屏访问速度。本文介绍其中一种比较少见的优化手段：造轮子'
					}
				]
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../../sass/front/articleList.scss';
</style>