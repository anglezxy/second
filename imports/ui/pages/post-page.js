import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Posts } from '../../api/post/collection.js';

import './not-found.js';

import '../components/post/post-item.js';

import  './post-page.html';

Template.postPage.onCreated(function () {
  const templateInstance=this;
  templateInstance.autorun(() => {
      if (FlowRouter.subsReady('posts')) {
        if (!Posts.findOne(FlowRouter.getParam('_id'))) {
          BlazeLayout.render('notFound');
        }
      }
    });
});
Template.postPage.helpers({
  post(){
    return Posts.findOne(FlowRouter.getParam('_id'));
  },

});
