const $ = require('jquery');
const Backbone =  require('backbone');

(function () {

var Posts = Backbone.Collection.extend({
	url: '/posts'
});

console.log( Posts );
}());
