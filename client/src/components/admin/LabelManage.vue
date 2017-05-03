<template>
	<div id="labelManage" style="padding: 20px;">
		<el-button type="primary" style="margin-bottom: 20px; margin-left: 20px;" @click="addLabel">添加分类</el-button>
		<el-row type="flex" justify="center">
			<el-col :span="15">
				<el-table :data="labelList" border height="400" >
					<el-table-column type="index" width="60px"></el-table-column>
					<el-table-column prop="name" label="标签名称" width="200px"></el-table-column>
					<el-table-column prop="createdAt" label="最近更新时间" width="250px"></el-table-column>
					<el-table-column label="操作" width="200px" fixed="right">
						<template scope="scope">
							<el-button type="info" size="small" @click="editTag(scope.$index)">编辑</el-button>
							<el-button type="danger" size="small" @click="deleteTag(scope.$index)">删除</el-button>
						</template>
					</el-table-column>			
				</el-table>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import axios from 'axios'
	import { changeTime } from '../../api/dealTime.js'
	export default {
		computed: {
			labelList () {
				return this.$store.state.tagList;
			}
		},
		methods: {
			addLabel () {
				this.$prompt('请输入标签名', '添加标签', {
					confirmButtonText: '确定',
					cancelButtonText: '取消'
				}).then(({ value }) => {
					if(value) {
						let message = '';
						axios.post('http://localhost:3000/createTag', { tagName: value } , {})
						.then((response) => {
							if (response.data.httpresult == 200) {
								response.data.tag.createdAt = changeTime(response.data.tag.createdAt);
								// this.labelList.push(response.data.tag);
								this.$store.commit('addTag', response.data.tag);
								message = `创建了新标签${value}`;
							}
							else if (response.data.httpresult == 300) {
								message = '标签已经存在';
							}
							else {
								message = '创建标签发生错误';
							}
							this.$notify.info({
								title: '消息',
								message: message
							});							
						});
					}
				})
				.catch((err) => {console.log(err)})
			},
			deleteTag (index) {
				let _id = this.labelList[index]._id;
				let name = this.labelList[index].name;
				this.$store.commit('deleteTag', index);
				axios.post('http://localhost:3000/deleteTag', { _id, name }, {})
				.then((response) => {
					if (response.data.httpresult == 200) {
						axios.get('http://localhost:3000/getArticleList', {})
						.then((response) => {
							for (let i in response.data.articleList) {
								response.data.articleList[i].createdAt = changeTime(response.data.articleList[i].createdAt);
								response.data.articleList[i].updatedAt = changeTime(response.data.articleList[i].updatedAt);
							}
							this.$store.commit('getArticleList', response.data.articleList);
						})
						this.$notify.info({
							title: '消息',
							message: '成功删除标签'
						});							
					}
				})
				
			},
			editTag (index) {
				this.$prompt('请编辑标签', '修改标签', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputValue: this.labelList[index].name
				}).then(({ value }) => {
					if(value) {
						let message = '';
						axios.post('http://localhost:3000/updateTag', { oldName: this.labelList[index].name, newName: value } , {})
						.then((response) => {
							if (response.data.httpresult == 200) {
								response.data.tag.createdAt = changeTime(response.data.tag.createdAt);
								// this.labelList.splice(index, 1);
								// this.labelList.push(response.data.tag);
								this.$store.commit('changeTag', { index: index, tag: response.data.tag });
								message = `标签更新为${value}`;
								axios.get('http://localhost:3000/getArticleList', {})
								.then((response) => {
									for (let i in response.data.articleList) {
										response.data.articleList[i].createdAt = changeTime(response.data.articleList[i].createdAt);
										response.data.articleList[i].updatedAt = changeTime(response.data.articleList[i].updatedAt);
									}
									this.$store.commit('getArticleList', response.data.articleList);
								});
							}
							else if (response.data.httpresult == 300) {
								message = '标签已经存在';
							}
							else {
								message = '更新标签发生错误';
							}
							this.$notify.info({
								title: '消息',
								message: message
							});							
						});
					}
				})
				.catch((err) => {console.log(err)})
			}
		}
	}
</script>
