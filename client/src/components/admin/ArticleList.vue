<template>
	<div id="articleList">
		<el-table :data="articleList" height="620" border>
			<el-table-column type="index" width="60px"></el-table-column>
			<el-table-column prop="date" label="标题" width="300px"></el-table-column>
			<el-table-column prop="name" label="创建日期" width="200px"></el-table-column>
			<el-table-column prop="name" label="最后修改日期" width="200px"></el-table-column>
			<el-table-column prop="tag" label="标签" width="180px" :filters="filterData" :filter-method="filterTag">
				<template scope="scope">
					<el-tag v-for="tag in scope.row.tag"
						:type="'success'" close-transition>{{ tag }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="200px">
				<template scope="scope">
					<el-button type="default" size="small">查看</el-button>
					<el-button type="info" size="small">编辑</el-button>
					<el-button type="danger" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				filterData: [
					{
						text: 'Nodejs',
						value: 'Nodejs'
					},
					{
						text: 'javascript',
						value: 'javascript'
					}
				],
				articleList: [{
		          date: '2016-05-03',
		          name: '王小虎',
		          tag: ['Nodejs', 'js']
		        }, {
		          index: 2,
		          date: '2016-05-02',
		          name: '王小虎',
		          tag: 'Nodejs'
		        }, {
		          index: 3,
		          date: '2016-05-04',
		          name: '王小虎',
		          tag: 'Nodejs'
		        }, {
		          index: 4,
		          date: '2016-05-01',
		          name: '王小虎',
		          tag: 'Nodejs'
		        }, {
		          index: 5,
		          date: '2016-05-08',
		          name: '王小虎',
		          tag: 'Nodejs'
		        }, {
		          index: 6,
		          date: '2016-05-06',
		          name: '王小虎',
		          tag: 'Nodejs'
		        }, {
		          index: 7,
		          date: '2016-05-07',
		          name: '王小虎',
		          tag: 'Nodejs'
		        },
		        {
		          index: 2,
		          date: '2016-05-02',
		          name: '王小虎',
		          tag: 'Nodejs'
		        }, {
		          index: 3,
		          date: '2016-05-04',
		          name: '王小虎',
		          tag: 'Nodejs'
		        }, {
		          index: 4,
		          date: '2016-05-01',
		          name: '王小虎',
		          tag: 'Nodejs'
		        }, {
		          index: 5,
		          date: '2016-05-08',
		          name: '王小虎',
		          tag: 'Nodejs'
		        }, {
		          index: 6,
		          date: '2016-05-06',
		          name: '王小虎',
		          tag: 'Nodejs'
		        }, {
		          index: 7,
		          date: '2016-05-07',
		          name: '王小虎',
		          tag: 'Nodejs'
		        },
		        {
		          index: 2,
		          date: '2016-05-02',
		          name: '王小虎',
		          tag: 'Nodejs'
		        }, {
		          index: 3,
		          date: '2016-05-04',
		          name: '王小虎',
		          tag: 'Nodejs'
		        }, {
		          index: 4,
		          date: '2016-05-01',
		          name: '王小虎',
		          tag: 'Nodejs'
		        }, {
		          index: 5,
		          date: '2016-05-08',
		          name: '王小虎',
		          tag: 'Nodejs'
		        }, {
		          index: 6,
		          date: '2016-05-06',
		          name: '王小虎',
		          tag: 'Nodejs'
		        }, {
		          index: 7,
		          date: '2016-05-07',
		          name: '王小虎',
		          tag: 'Nodejs'
		        }
		        ]
			}
		},
		methods: {
	        filterTag(value, row) {
	        	return row.tag === value;
	     	}
		}
	}
</script>