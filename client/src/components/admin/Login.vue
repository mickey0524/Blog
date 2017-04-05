<template>
	<div id="login">
		<div class="login">
			<div class="login-item">
				<span>账号:</span>
				<input type="text" placeholder="请输入账号" autofocus>
			</div>
			<div class="login-item">
				<span>密码:</span>
				<input type="password" placeholder="请输入密码">
			</div>
			<button>登录</button>
		</div>
	</div>
</template>

<script>
	export default {

	}
</script>

<style lang="sass" scoped>
	@import '../../sass/admin/login.scss';
</style>