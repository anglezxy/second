import { FlowRouter } from 'meteor/kadira:flow-router';

import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/layout.js';
import { Posts } from '../../api/post/collection';

BlazeLayout.setRoot('body');

/*
所有的全局subscriptions都运行在每一个route上
 */
FlowRouter.subscriptions = function () {
  this.register('posts', Meteor.subscribe('post.posts'));
};

FlowRouter.route('/', {
  name: 'postList',
  async action() {
    await import('../../ui/pages/post-list.js');
    BlazeLayout.render('layout', { mainContent: 'postList' });
  },
});

FlowRouter.route('/posts/:_id', {
  name: 'postPage',
  async action(){
    await import('../../ui/pages/post-page.js');
    BlazeLayout.render('layout',{ mainContent: 'postPage' });
  },
  data(){
     return Posts.findOne(FlowRouter.getParam('_id'));
   },
});

FlowRouter.notFound={
  async action(){
    await import('../../ui/pages/not-found.js');
    BlazeLayout.render('notFound');
  }
};

FlowRouter.route('/submit',{
  name: 'postSubmit',
  async action(){
    await import('../../ui/pages/post-submit.js');
    BlazeLayout.render('layout', {mainContent: 'postSubmit'});
  },
 requireLogin: true,
});

FlowRouter.route('/posts/:_id/edit', {
  name: 'postEdit',
  async action(){
    await import('../../ui/pages/post-edit.js');
    BlazeLayout.render('layout',{ mainContent: 'postEdit'});
  },
  data(){
    return Posts.findOne(FlowRouter.getParam('_id'));
  },

});
