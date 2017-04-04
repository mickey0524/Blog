<template>
	<div id="archive">
		<h2>归档</h2>
		<div class="archive-list" v-for="item in archiveList">
			<h3>{{ item.time }} ({{ item.num }})</h3>
			<ul>
				<li v-for="article in item.articleList">
					<a @click="$router.push('/article/ss')">{{ article.articleName }}</a>
					<span>{{ article.articleTime }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				archiveList: [
					{
						time: '2017年03月',
						num: 3,
						articleList: [
							{
								address: 'https://github.com/mickey0524',
								articleName: 'webpack自定义分块名称',
								articleTime: '2017-03-28'
							},
							{
								address: 'https://github.com/mickey0524',
								articleName: '博客优化点：轮子之心',
								articleTime: '2017-03-04'								
							},
							{
								address: 'https://github.com/mickey0524',
								articleName: 'vue2服务端渲染：直连数据库的首屏优化策略',
								articleTime: '2017-03-01'									
							}
						]
					},
					{
						time: '2017年02月',
						num: 3,
						articleList: [
							{
								address: 'https://github.com/mickey0524',
								articleName: 'webpack自定义分块名称',
								articleTime: '2017-03-28'
							},
							{
								address: 'https://github.com/mickey0524',
								articleName: '博客优化点：轮子之心',
								articleTime: '2017-03-04'								
							},
							{
								address: 'https://github.com/mickey0524',
								articleName: 'vue2服务端渲染：直连数据库的首屏优化策略',
								articleTime: '2017-03-01'									
							}
						]
					}
				]
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../../sass/front/archive.scss';
</style>