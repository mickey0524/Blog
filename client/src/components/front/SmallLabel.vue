<template>
	<div id="smallLabel">
		<h2>标签</h2>
		<div class="labelList">
			<div class="labelItem" v-for="item in labelList">
				<p>{{ item.name }}({{ item.num }})</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				labelList: [
					{
						name: 'Node.js',
						num: 22
					},
					{
						name: 'vue',
						num: 14
					},
					{
						name: '服务端渲染',
						num: 11
					},
					{
						name: 'AE',
						num: 6
					},
					{
						name: 'Node.js',
						num: 22
					},
					{
						name: 'vue',
						num: 14
					},
					{
						name: '服务端渲染',
						num: 11
					},
					{
						name: 'AE',
						num: 6
					},
					{
						name: 'Node.js',
						num: 22
					},
					{
						name: 'vue',
						num: 14
					},
					{
						name: '服务端渲染',
						num: 11
					},
					{
						name: 'AE',
						num: 6
					},
					{
						name: 'Node.js',
						num: 22
					},
					{
						name: 'vue',
						num: 14
					},
					{
						name: '服务端渲染',
						num: 11
					},
					{
						name: 'AE',
						num: 6
					}
				]
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../../sass/front/smallLabel.scss';
</style>