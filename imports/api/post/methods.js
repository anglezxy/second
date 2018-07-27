import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import { Posts } from './collection.js';

export const insertPost = new ValidatedMethod({
  name: 'post.insertPost',
  validate: new SimpleSchema({
    title: {
      type: String,
    },
    url: {
      type: String,
      regEx: SimpleSchema.RegEx.Url,
    },
  }).validator({ clean: true }),
  applyOptions: {
    noRetry: true,
    throwStubExceptions: true,
  },
  run({ title, url }) {
    const postWithSameLink = Posts.findOne({ url });
    if (postWithSameLink) {
      console.log(postWithSameLink);
      return {
        postExists: true,
        _id: postWithSameLink._id,
      };
    }

    const user = Meteor.user();
    const postId = Posts.insert({
      title,
      url,
      userId: user._id,
      author: user.email,
    });

    return { _id: postId };
  },




});
