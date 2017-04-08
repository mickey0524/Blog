<template>
	<div id="smallLabel">
		<h2>标签</h2>
		<div class="labelList">
			<div class="labelItem" v-for="item in labelList" @click="$router.push('/front/label/' + item.name)">
				<p>{{ item.name }}({{ item.num }})</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			labelList () {
				let list = [];
				let tagNum = {};
				for (let i in this.$store.state.tagList) {
					for (let j in this.$store.state.articleList) {
						if (this.$store.state.articleList[j].tags.indexOf(this.$store.state.tagList[i].name) !== -1) {
							if (tagNum[this.$store.state.tagList[i].name]) {
								tagNum[this.$store.state.tagList[i].name] += 1;
							}
							else {
								tagNum[this.$store.state.tagList[i].name] = 1;
							}
						}
					}
				}
				for (let i in tagNum) {
					list.push({
						name: i,
						num: tagNum[i]
					});
				}
				return list;
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../../sass/front/smallLabel.scss';
</style>