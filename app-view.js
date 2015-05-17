var youTubeAPP = window.youTubeAPP || {};

youTubeAPP.AppView = Backbone.View.extend({

	el:$('.bgWrapper'),

	events:{
		'click #create-video': 'createVideo'
	},

	initialize:function(){
		this.$productsList = $('.productsListView');

		this.$videoForm = $('#movie-form');
		this.$url = 	$('#video-url');
		this.$img =	 	$('#img-url');
		this.$price = 	$('#price');
		this.$title = 	$('#title');
		this.productURL = $('#product-url');

		this.$videoList;

		this.limit = 5;

		this.listenTo(youTubeAPP.Videos, 'add', this.addOne);
		this.listenTo(youTubeAPP.Videos, 'remove', this.removeOne);

		youTubeAPP.Videos.fetch();
	},

	addOne: function(Videos){

		//check if tiles amount touch the limit, if so create a new tileRowContainer
		this.$videoList = this.CheckContainer();

		var view;

		view = new youTubeAPP.youTubeView({ model: Videos });

		this.$videoList.append(view.render().el);

	},

	removeOne: function(){
		var $lastTileRow = $('.productsListView .tileRowContainer:last-child .tileRow');
		var $lastTileRowContainer = $('.productsListView .tileRowContainer:last-child');
		var count = $lastTileRow.find($('.tile')).length;

		//if no container left, sild up the <div> then delete the container
		if(count == 1){
			$lastTileRowContainer.slideUp('fast',function(){
				$lastTileRowContainer.remove();
			});
		}

	},

	CheckContainer: function(){
		
		var $lastTileRow = $('.productsListView .tileRowContainer:last-child .tileRow');
		var count = $lastTileRow.find($('.tile')).length;
		var remainCount = this.limit - count;
		if(remainCount === 0){
			var $newTileRow = $('<li class="tileRowContainer">' + '<ul class="tileRow">' + '</ul>' + '</li>');
			
			this.$productsList.append($newTileRow);

			var $newLastTileRow = $('.productsListView .tileRowContainer:last-child .tileRow');

			return $newLastTileRow;
		} else{
			return $lastTileRow;
		}
		
	},

	createVideo: function(e){
		e.preventDefault();

		// store values from the form
		var productValues = {
			url: this.$url.val(),
			img: this.$img.val(),
			price: this.$price.val(),
			title: this.$title.val(),
			productURL: this.productURL.val()
		};

		youTubeAPP.Videos.create(productValues);

		this.$videoForm[0].reset();
	}
});

youTubeAppView = new youTubeAPP.AppView();


