<template>
	<div id="pagination">
		<span v-if="lastPage" id="last-page" @click="ToLastPage">« 上一页</span>
		<span @click="$router.push('/front/archive')">博客归档</span>
		<span v-if="nextPage" id="next-page" @click="ToNextPage">下一页 »</span>
	</div>
</template>

<script>
	export default {
		props: ['nextPage', 'lastPage', 'pageNum'],
		methods: {
			ToLastPage () {
				let num = this.pageNum - 1;
				if (num === 1) {
					if (!this.$route.params.tag) {
						this.$router.push('/front');
					}
					else {
						this.$router.push(this.$route.path);
					}				
				}
				else {
					if (!this.$route.params.tag) {
						this.$router.push('/front?page=`{$num}`');
					}
					else {
						this.$router.push(this.$route.path + '?page=' + num);
					}
				}
			},
			ToNextPage () {
				let num = this.pageNum + 1;
				if (!this.$route.params.tag) {
					this.$router.push('/front?page=' + num);
				}
				else {
					this.$router.push(this.$route.path + '?page=' + num);
				}
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../../sass/front/pagination.scss';
</style>