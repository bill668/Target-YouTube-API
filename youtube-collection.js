var youTubeAPP = window.youTubeAPP || {};

// collection of product model and use local storage to save it
youTubeAPP.youtubeCollection = Backbone.Collection.extend({
	model: youTubeAPP.youTubeModel,
	localStorage: new Backbone.LocalStorage('youtubeApp'),
});

youTubeAPP.Videos = new youTubeAPP.youtubeCollection();