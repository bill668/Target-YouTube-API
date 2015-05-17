var youTubeAPP = window.youTubeAPP || {};

//create a model of each product
youTubeAPP.youTubeModel = Backbone.Model.extend({
	defaults:{
		url: '',
		img: '',
		price:'',
		title:'',
		productURL:''
	}
});