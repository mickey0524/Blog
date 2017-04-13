<template>
	<div id="login">
		<div class="login">
			<div class="login-item">
				<span>账号:</span>
				<input type="text" placeholder="请输入账号" autofocus v-model="userName">
			</div>
			<div class="login-item">
				<span>密码:</span>
				<input type="password" placeholder="请输入密码" v-model="passWord" @keyup.enter="login">
			</div>
			<button @click="login">登录</button>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		data () {
			return {
				userName: '',
				passWord: ''
			}
		},
		methods: {
			login () {
				if (this.userName && this.passWord) {
					axios.post('http://localhost:3000/loginIn', { userName: this.userName, passWord: this.passWord }, { })
					.then((response) => {
						if (response.data.login) {
							this.$notify.info({
								title: '消息',
								message: '成功登录~'
							});
							this.$router.push('/back');
						}
						else {
							this.$notify.error({
								title: '错误',
								message: '账号或者密码错误!'
							});
						}
					})
				}
				else {
					this.$notify.error({
						title: '错误',
						message: '请完善所有必填项!'
					})
				}
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../../sass/admin/login.scss';
</style>