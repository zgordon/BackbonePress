define([
	'jquery',
	'underscore',
	'backbone',
	'models/post',
	function( _, Backbone, Post ){
		var postListView = Backbone.View.extend({
			render: function(){
				this.$el.html(this.model.get("title"));
				return this;
			}
		});

		return postListView;
	}
]);
