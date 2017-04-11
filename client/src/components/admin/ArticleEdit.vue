<template>
	<div id="articleEdit">
		<el-row>
			<el-col :span="15">
				<div class="title">
					<span>标题</span>
					<el-input placeholder="请输入内容" style="display: inline-block; width: 638px;" v-model="article.title"></el-input>
				</div>
				<div class="path">
					<span>路径</span>
					<el-input placeholder="请输入内容" style="display: inline-block; width: 638px;" v-model="article.pathName"></el-input>
				</div>
				<div class="mode">
					<span>模式</span>
					<el-select v-model="editMode">
						<el-option
							v-for="item in modeOptions"
							key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>	
					</el-select>
				</div>
				<div class="left-right-content" v-if="editMode == '左右分屏' || editMode == ''">
					<el-row>
						<el-col :span="12">
							<textarea v-model="article.content"></textarea>
						</el-col>
						<el-col :span="12">
							<div class="show" v-html="markedToHtml"></div>
						</el-col>
					</el-row>
				</div>
				<div class="all-screen" v-if="editMode == '编辑模式'">
					<el-row>
						<el-col :span="24">
							<textarea v-model="content"></textarea>
						</el-col>
					</el-row>
				</div>
				<div class="top-bottom-content" v-if="editMode == '上下分屏'">
					<textarea v-model="content"></textarea>
					<div class="show" v-html="markedToHtml"></div>
				</div>
			</el-col>
			<el-col :span="9" class="article-info">
				<el-button type="primary" style="margin-top: 55px; margin-left: 20px; margin-bottom: 30px;" @click="submit">提交更改</el-button>
				<el-button type="success" style="margin-top: 55px; margin-left: 20px; margin-bottom: 30px;" @click="clear">清空数据</el-button>
				<el-button type="default" style="margin-top: 55px; margin-left: 20px; margin-bottom: 30px;" @click="save">保存数据</el-button>
				<div class="create-time">
					<span>创建日期</span>
					<el-date-picker type="datetime" v-model="article.createdAt" disabled></el-date-picker>
				</div>
				<div class="change-time">
					<span>修改日期</span>
					<el-date-picker type="datetime" v-model="article.updatedAt" disabled></el-date-picker>
				</div>
				<div class="label">
					<span>标签</span>
					<el-select multiple placeholder="请选择" v-model="article.tags">
						<el-option
							v-for="item in labelOptions"
							key="item.value"
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
	import axios from 'axios';
	import { changeTime } from '../../api/dealTime';
	export default {
		mounted () {
			this.article = this.$store.state.currentSavedArticle;
		},
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
				editMode: '',
				article: {
					_id: '',
					title: '',
					pathName: '',
					content: '',
					tags: [],
					createdAt: '',
					updatedAt: ''
				}
			}
		},
		computed: {
			labelOptions () {
				let label = [];
				for (let i in this.$store.state.tagList) {
					label.push({ value: this.$store.state.tagList[i].name });
				}
				return label;
			},
			markedToHtml () {
				return marked(this.article.content.replace(/<!--more-->/g, ''));
			},
			markedToHead () {
				if (this.article.content.indexOf('<!--more-->') === -1) {
					return '';
				}
				else {
					return marked(this.article.content.slice(0, this.article.content.indexOf('<!--more-->')));
				}
			}
		},
		methods: {
			submit () {
				if (this.article.title && this.article.pathName && this.article.content && !this.article.tags.length == 0) {
					let data = { 
						title: this.article.title,
						pathName: this.article.pathName,
						markdownContent: this.markedToHtml,
						content: this.article.content,
						markdownToc: this.markedToHead,
						tags: this.article.tags
					};
					if (this.article.createTime == '') {
						axios.post('http://localhost:3000/createArticle', data, {})
						.then((response) => {
							if (response.data.httpresult == 200) {
								this.$store.commit('addArticle', response.data.article);
								this.$notify.info({
									title: '消息',
									message: '成功创建文章'
								});
							}
							else {
								this.$notify.error({
									title: '错误',
									message: '创建文章失败'
								});
							}
						})
					}
					else {
						data._id = this.article._id;
						data.createdAt = this.article.createdAt;
						axios.post('http://localhost:3000/modifyArticle', data, {})
						.then((response) => {
							if (response.data.httpresult == 200) {			
								response.data.article.updatedAt = changeTime(response.data.article.updatedAt);
								this.article.updatedAt = response.data.article.updatedAt;
								response.data.article.createdAt = this.article.createdAt;
								this.$store.commit('updateArticle', response.data.article);
								this.$notify.info({
									title: '消息',
									message: '成功修改文章'
								});
							}
							else {
								this.$notify.error({
									title: '错误',
									message: '修改文章失败'
								});
							}
						})
					}
				}
				else {
					this.$notify.error({
						title: '错误',
						message: '请完成所有必填项'
					})
				}
			},
			clear () {
				this.article = {
					_id: '',
					title: '',
					pathName: '',
					content: '',
					tags: [],
					createdAt: '',
					updatedAt: ''
				};
				this.$store.commit('changeCurSavedArticle', this.article);
			},
			save () {
				this.$store.commit('changeCurSavedArticle', this.article);
			}

		}
	}
</script>

<style lang="sass" scoped>
	@import '../../sass/admin/articleEdit.scss';
</style>