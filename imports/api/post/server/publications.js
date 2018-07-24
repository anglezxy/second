import { Meteor } from 'meteor/meteor';

import { Posts } from '../collection.js';

Meteor.publish('post.posts', function () {
  return Posts.find();
});
