import Vue from 'vue';
import Router from 'vue-router';
import Homepage from './views/homepage/index.vue';
import Word from './views/word/index.vue';
import AddWord from './views/addWord/index.vue';
import MyWord from './views/myWord/index.vue';
import Test from './views/test/index.vue';
import Page from './components/page/index.vue';
import Record from './views/record/index.vue';

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
          path: '/myWord',
          name: 'myWord',
          component: MyWord,
        },
		{
          path: '/test',
          name: 'test',
          component: Test,
        },
        {
          path: '/record',
          name: 'record',
          component: Record,
        },
      ],
    },
  ],
});
