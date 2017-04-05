<template>
	<div id="account">
		<el-row type="flex" justify="center" style="margin-top: 200px;">
			<el-col :span="12">
				<div class="origin-password">
					<span>原密码 : </span>
					<input type="password">
				</div>
				<div class="new-password">
					<span>新密码 : </span>
					<input type="password">
				</div>
				<div class="again-password">
					<span>再输入新密码 : </span>
					<input type="password">
				</div>
				<el-button type="primary" style="float: right;" @click="submit">确定</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		methods: {
			submit () {
				this.$notify.info({
					title: '消息',
					message: '成功修改密码'
				});				
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../../sass/admin/account.scss';
</style>
