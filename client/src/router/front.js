
import Front from '../components/front/Front.vue';
import Index from '../components/front/Index.vue';
import Archive from '../components/front/Archive.vue';
import SmallLabel from '../components/front/SmallLabel.vue';
import LabelContent from '../components/front/LabelContent.vue';
import About from '../components/front/About.vue';
import Article from '../components/front/Article.vue';

export default [
		{
			path: '/front',
			component: Front,
			children: [
				{
					path: '',
					component: Index
				},
				{
					path: 'archive',
					component: Archive
				},
				{
					path: 'label',
					component: SmallLabel
				},
				{
					path: 'label/:tag',
					component: LabelContent
				},
				{
					path: 'about',
					component: About
				},
				{
					path: 'article/:articleId',
					component: Article
				}
			]
		},
		{ path : '*', redirect : '/front' }
	]