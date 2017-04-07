<template>
	<div id="articleList">
		<el-table :data="articleList" height="620" border>
			<el-table-column type="index" width="60px"></el-table-column>
			<el-table-column prop="title" label="标题" width="250px"></el-table-column>
			<el-table-column prop="pathName" label="路径" width="250px"></el-table-column>
			<el-table-column prop="updatedAt" label="最后修改日期" width="200px"></el-table-column>
			<el-table-column prop="tags" label="标签" width="180px" :filters="filterData" :filter-method="filterTag">
				<template scope="scope">
					<el-tag v-for="tag in scope.row.tags"
						:type="'success'" close-transition>{{ tag }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="200px">
				<template scope="scope">
					<el-button type="default" size="small">查看</el-button>
					<el-button type="info" size="small" @click="editArticle(scope.$index)">编辑</el-button>
					<el-button type="danger" size="small" @click="deleteArticle(scope.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		computed: {
			articleList () {
				return this.$store.state.articleList;
			},
			filterData () {
				let arr = [];
				for (let i in this.$store.state.tagList) {
					arr.push({
						text: this.$store.state.tagList[i].name,
						value: this.$store.state.tagList[i].name
					});
				}
				return arr;
			}
		},
		methods: {
	        filterTag (value, row) {
	        	return row.tag === value;
	     	},
	     	deleteArticle (index) {
	     		axios.post('http://localhost:3000/deleteArticle', { _id: this.articleList[index]._id }, {})
	     		.then((response) => {
	     			if (response.data.httpresult == 200) {
	     				this.$store.commit('deleteArticle', index);
	     				this.$notify.info({
	     					title: '消息',
	     					message: '成功删除文章'
	     				})
	     			}
	     			else {
	     				this.$notify.error({
	     					title: '错误',
	     					message: '删除文章失败'
	     				})
	     			}
	     		})
	     	},
	     	editArticle (index) {
	     		this.$store.commit('changeCurSavedArticle', this.articleList[index]);
	     		this.$router.push('/back/articleEdit');
	     	}
		}
	}
</script>