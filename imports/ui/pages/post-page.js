
import { Template } from 'meteor/templating';

import '../components/post/post-item.js';

import  './post-page.html';
import { Posts } from '../../api/post/collection';

/*Template.postList.helpers({
  posts(){
    return Posts.find({},{ sort: { submitted: -1}})
  },
});*/

/*Template.postPage.onCreated(function () {
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

});*/
