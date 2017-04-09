<template>
	<div id="account">
		<el-row type="flex" justify="center" style="margin-top: 200px;">
			<el-col :span="12">
				<div>
					<span>用户名 : </span>
					<input type="text" v-model="userName">
				</div>
				<div>
					<span>新密码 : </span>
					<input type="password" v-model="newPassWord">
				</div>
				<div>
					<span>再输入新密码 : </span>
					<input type="password" v-model="newPassWordAgain">
				</div>
				<el-button type="primary" style="float: right;" @click="submit">确定</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		data () {
			return {
				newPassWord: '',
				newPassWordAgain: ''
			}
		},
		computed: {
			userName () {
				return this.$store.state.userName;
			}
		},
		methods: {
			submit () {
				if (this.newPassWord && this.newPassWordAgain) {
					if (this.newPassWord === this.newPassWordAgain) {
						axios.post('http://localhost:3000/changePassWord', { userName: this.userName, passWord: this.newPassWord }, {})
						.then((response) => {
							if (response.data.httpresult === 200) {
								this.$notify.info({
									title: '消息',
									message: '成功修改密码'
								});	
							}
							else {
								this.$notify.error({
									title: '消息',
									message: '修改密码失败，请稍后再试'
								});									
							}
						})
						.catch((err) => {
							this.$notify.error({
								title: '消息',
								message: '修改密码失败，请稍后再试'
							});								
						})
					}
					else {
						this.$notify.error({
							title: '消息',
							message: '两次输入密码不相同!'
						})
					}
				}
				else {
					this.$notify.error({
						title: '错误',
						message: '请完善所有必填项！'
					});
				}
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../../sass/admin/account.scss';
</style>
