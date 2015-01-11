if ( Meteor.isClient ) {
  _s = _.str;
}

if ( Meteor.isServer ) {
  _s = Npm.require("underscore.string");
}