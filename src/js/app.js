define([
	'underscore',
	'backbone',
	'models/post',
	'views/postListView',
	function( _, Backbone, Post, postListView ){

		var init = function(){

			var post = new Post( { title: "Hello World" } );

			var postListView = new postListView({
				el: '#pageContent',
				model: post
			});

			postListView.render();

		};

		return {
			init: init
		};


	}
]);
