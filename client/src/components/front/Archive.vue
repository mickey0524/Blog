<template>
	<div id="archive">
		<h2>归档</h2>
		<div class="archive-list" v-for="item in archiveList">
			<h3>{{ item.time }} ({{ item.num }})</h3>
			<ul>
				<li v-for="article in item.articleList">
					<a @click="$router.push('/front/article/' + article.pathName)">{{ article.title }}</a>
					<span>{{ article.updatedAt }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { getMonth } from '../../api/dealTime';
	export default {
		computed: {
			archiveList () {
				let list = [];
				if (this.$store.state.articleList.length !== 0) {
					let initDate = getMonth(this.$store.state.articleList[0].updatedAt);
					let obj = {
						time : `${initDate[0]}年${initDate[1]}月`,
						num : 1,
						articleList : [ this.$store.state.articleList[0] ]						
					};
					for (let i = 1; i < this.$store.state.articleList.length; i++) {
						let nowDate = getMonth(this.$store.state.articleList[i].updatedAt);
						if (nowDate[1] !== initDate[1]) {
							list.push(obj);
							initDate = nowDate;
							obj = {
								time : `${initDate[0]}年${initDate[1]}月`,
								num : 1,
								articleList : [ this.$store.state.articleList[i] ]						
							};
						}
						else {
							obj.num += 1;
							obj.articleList.push(this.$store.state.articleList[i]);
						}	
					}
					list.push(obj);
					return list;
				}
				else {
					return [];
				}
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../../sass/front/archive.scss';
</style>