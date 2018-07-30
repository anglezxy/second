import { Mongo } from 'meteor/mongo';

import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { _ } from 'meteor/underscore';

import SimpleSchema from 'simpl-schema';

import { ownsDocument } from '../../modules/permissions.js';

const Posts= new Mongo.Collection('posts');

Posts.attachSchema(new SimpleSchema({
  title: {
    type: String,
  },
  author: {
    type: String,
    optional: true,
  },
  url: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true,
  },
  author:{
    type: String,
    optional: true,
  },
  userId:{
    type: String,
    regEx:SimpleSchema.RegEx._id,
    optional: true,
  },
  submitted: {
    type: Date(),
    autoValue(){
      if(this.isInsert){
        return new Date();
      } else if(this.isUpsert){
        return { $setOnInsert: new Date() };
      } else {
        this.unset();
      }
    }
  },
}));

/*Posts.allow({
  insert(userId){
    return !! userId;
  },
});*/

function validatePost(post) {
  const errors = {};
  if (!post.title) errors.title = 'please fill in a headline';
  if (!post.url) errors.url = 'please fill in a url';
  return errors;
};
Posts.allow({
  update: ownsDocument,
  remove: ownsDocument,
});

Posts.deny({
  update(userId,post,filedNames){
    //_.without(array,*values)返回一个删除所有values值后的array副本
    return (_.without(filedNames,'url','title').length > 0);
  }
});
export { Posts,validatePost };
