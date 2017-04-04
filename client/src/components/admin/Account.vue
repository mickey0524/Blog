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
				<el-button type="primary" style="float: right;">确定</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {

	}
</script>

<style lang="sass" scoped>
	@import '../../sass/admin/account.scss';
</style>
