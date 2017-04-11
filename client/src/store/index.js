import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		articleIndex: 0,
		userName: '',
		tagList: [],
		currentSavedArticle: {
			_id: '',
			title: '',
			pathName: '',
			content: '',
			tags: [],
			createdAt: '',
			updatedAt: ''
		},
		articleList: [],
		curArticleList: []
	},
	mutations: {
		changeCurSavedArticle (state, article) {
			state.currentSavedArticle = article;
		},
		createTagList (state, tagList) {
			state.tagList = tagList;
		},
		addTag (state, tag) {
			state.tagList.unshift(tag);
		},
		deleteTag (state, index) {
			state.tagList.splice(index, 1);
		},
		changeTag (state, obj) {
			state.tagList.splice(obj.index, 1);
			state.tagList.unshift(obj.tag);
		},
		getArticleList (state, articleList) {
			state.articleList = articleList;
		},
		addArticle (state, article) {
			state.articleList.unshift(article);
		},
		deleteArticle (state, index) {
			state.articleList.splice(index, 1);
		},
		updateArticle (state, article) {
			for (let i in state.articleList) {
				if (state.articleList[i]._id == article._id) {
					state.articleList.splice(i, 1);
					break;
				}
			}
			state.articleList.unshift(article);
		},
		login (state, userName) {
			state.userName = userName;
		},
		unlogin (state) {
			state.userName = '';
		},
		changeArticleIndex (state, index) {
			state.articleIndex = index;
		},
		changeCurArticleList (state, articleList) {
			state.curArticleList = articleList;
		}
	}
});
