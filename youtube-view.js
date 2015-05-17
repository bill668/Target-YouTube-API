var youTubeAPP = window.youTubeAPP || {};

youTubeAPP.youTubeView = Backbone.View.extend({

	tagName: 'li',

	className: 'tile standard',

	template: _.template($('#youTube-template').html()),

	events:{
		'click .delete': 'deleteVideo'
	},

	deleteVideo: function(e){
		e.preventDefault();
		if ( confirm('Are you sure you want to delete this product?')) {
            this.model.destroy();

            this.$el.slideUp('fast', function(){
            	this.remove();
            });
		}
	},

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		
		return this;
	}

});