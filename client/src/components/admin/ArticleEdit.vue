<template>
	<div id="articleEdit">
		<el-row>
			<el-col :span="15">
				<div class="title">
					<span>标题</span>
					<el-input placeholder="请输入内容" style="display: inline-block; width: 638px;"></el-input>
				</div>
				<div class="path">
					<span>路径</span>
					<el-input placeholder="请输入内容" style="display: inline-block; width: 638px;"></el-input>
				</div>
				<div class="mode">
					<span>模式</span>
					<el-select v-model="editMode">
						<el-option
							v-for="item in modeOptions"
							:label="item.label"
							:value="item.value">
						</el-option>	
					</el-select>
				</div>
				<div class="left-right-content" v-if="editMode == '左右分屏' || editMode == ''">
					<el-row>
						<el-col :span="12">
							<textarea v-model="markContent"></textarea>
						</el-col>
						<el-col :span="12">
							<div class="show" v-html="markedToHtml"></div>
						</el-col>
					</el-row>
				</div>
				<div class="all-screen" v-if="editMode == '编辑模式'">
					<el-row>
						<el-col :span="24">
							<textarea v-model="markContent"></textarea>
						</el-col>
					</el-row>
				</div>
				<div class="top-bottom-content" v-if="editMode == '上下分屏'">
					<textarea v-model="markContent"></textarea>
					<div class="show" v-html="markedToHtml"></div>
				</div>
			</el-col>
			<el-col :span="9" class="article-info">
				<el-button type="primary" style="margin-top: 55px; margin-left: 20px; margin-bottom: 30px;" @click="submit">提交更改</el-button>
				<el-button type="success" style="margin-top: 55px; margin-left: 20px; margin-bottom: 30px;">返回列表</el-button>
				<div class="create-time">
					<span>创建日期</span>
					<el-date-picker type="datetime"></el-date-picker>
				</div>
				<div class="change-time">
					<span>修改日期</span>
					<el-date-picker type="datetime"></el-date-picker>
				</div>
				<div class="label">
					<span>标签</span>
					<el-select multiple placeholder="请选择" v-model="label">
						<el-option
							v-for="item in labelOptions"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import marked from 'marked';
	export default {
		data () {
			return {
				modeOptions: [
					{
						value: '编辑模式',
						label: '编辑模式'
					},
					{
						value: '左右分屏',
						label: '左右分屏'
					},
					{
						value: '上下分屏',
						label: '上下分屏'
					}
				],
				labelOptions: [
					{
						value: 'Nodejs',
						label: 'Nodejs'
					},
					{
						value: 'ES6',
						label: 'ES6'
					},
					{
						value: 'Html5',
						label: 'Html5'
					}
				],
				markContent: '',
				editMode: '',
				label: ''
			}
		},
		computed: {
			markedToHtml () {
				return marked(this.markContent.replace(/<!--more-->/g, ''));
			}
		},
		methods: {
			submit () {
				console.log(this.markContent);
				console.log(this.markedToHtml);
				this.$notify.info({
					title: '消息',
					message: '成功修改文章'
				});
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../../sass/admin/articleEdit.scss';
</style>