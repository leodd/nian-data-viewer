import Vue from 'vue'
import App from './App.vue'
import MasonaryLayout from './components/MasonaryLayout';
import ModalWizard from './components/ModalWizard';
import InfiniteLoading from 'vue-infinite-loading';
import Step from './components/Step.vue';
import Comment from './components/Comment.vue';

Vue.use(MasonaryLayout);
Vue.use(ModalWizard);
Vue.component('infinite-loading', InfiniteLoading);
Vue.component('step', Step);
Vue.component('comment', Comment);

new Vue({
  el: '#app',
  render: h => h(App)
});
