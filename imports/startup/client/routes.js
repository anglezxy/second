import { FlowRouter } from 'meteor/kadira:flow-router';

import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/layout.js';

BlazeLayout.setRoot('body');

/*
所有的全局subscriptions都运行在每一个route上
 */
FlowRouter.subscriptions=function() {
  this.register('posts',Meteor.subscribe('post.posts'));
};

FlowRouter.route('/', {
  name: 'postList',
  async action() {
    await import('../../ui/pages/post-list.js');
    BlazeLayout.render('layout', { mainContent: 'postList' });
  },
});

FlowRouter.route('/posts/:_id',{
  name: 'postPage',
  async action(){
    await import('../../ui/pages/post-page.js');
    BlazeLayout.render('layout',{ mainContent: 'postPage' });
  },
});

FlowRouter.notFound={
  async action(){
    await import('../../ui/pages/not-found.js');
    BlazeLayout.render('notFound');
  }
};