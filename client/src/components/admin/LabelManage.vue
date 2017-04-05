<template>
	<div id="labelManage" style="padding: 20px;">
		<el-button type="primary" style="margin-bottom: 20px; margin-left: 20px;" @click="addLabel">添加分类</el-button>
		<el-row type="flex" justify="center">
			<el-col :span="15">
				<el-table :data="labelList" border height="400">
					<el-table-column type="index" width="60px"></el-table-column>
					<el-table-column prop="name" label="标签名称" width="200px"></el-table-column>
					<el-table-column prop="time" label="创建时间" width="250px"></el-table-column>
					<el-table-column label="操作" width="200px">
						<template scope="scope">
							<el-button type="info" size="small">编辑</el-button>
							<el-button type="danger" size="small">删除</el-button>
						</template>
					</el-table-column>			
				</el-table>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				labelList: [
					{
						name: 'ES6',
						time: '2016-05-03'
					}
				]
			}
		},
		methods: {
			addLabel () {
				this.$prompt('请输入标签名', '添加标签', {
					confirmButtonText: '确定',
					cancelButtonText: '取消'
				}).then(({ value }) => {
					this.$notify.info({
						title: '消息',
						message: `创建了新标签${value}`
					});
				})
			}
		}
	}
</script>
