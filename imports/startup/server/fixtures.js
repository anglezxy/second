import { Meteor } from 'meteor/meteor';

import { Posts } from '../../api/post/collection.js';
Meteor.startup(()=>{
  if (Posts.find().count() === 0) {
    Posts.insert({
      title: 'Introducing Telescope1',
      url: 'http://meteor.com'
    });
    Posts.insert({
      title: 'Introducing Telescope2',
      url: 'http://meteor.com'
    });
    Posts.insert({
      title: 'Introducing Telescope3',
      url: 'http://meteor.com'
    });
  }
});
/*export function  addpost(){
  if (Posts.find().count() === 0){
    Posts.insert({
      title: 'Introducing Telescope1',
      url: 'http://meteor.com'
    });
    Posts.insert({
        title: 'Introducing Telescope2',
        url: 'http://meteor.com'
      });
    Posts.insert({
        title: 'Introducing Telescope3',
        url: 'http://meteor.com'
      });
  }
};*/
