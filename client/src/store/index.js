import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		tagList: []
	},
	mutations: {
		createTagList (state, tagList) {
			state.tagList = tagList;
		},
		addTag (state, tag) {
			state.tagList.push(tag);
		},
		deleteTag (state, index) {
			state.tagList.splice(index, 1);
		},
		changeTag (state, obj) {
			state.tagList.splice(obj.index, 1);
			state.tagList.push(obj.tag);
		}
	}
});
