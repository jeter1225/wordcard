import Vue from 'vue';
import Router from 'vue-router';
import Homepage from './views/homepage/index.vue';
import Word from './views/word/index.vue';
import AddWord from './views/addWord/index.vue';
import Page from './components/page/index.vue';
import Phrase from './views/phrase/index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Page',
      component: Page,
      children: [
        {
          path: '/homepage',
          name: 'homepage',
          component: Homepage,
        },
        {
          path: '/word',
          name: 'word',
          component: Word,
        },
		{
          path: '/addWord',
          name: 'addWord',
          component: AddWord,
        },
        {
          path: '/phrase',
          name: 'phrase',
          component: Phrase,
        },
      ],
    },
  ],
});
