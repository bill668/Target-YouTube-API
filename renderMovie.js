//script inherit from: https://github.com/jpetto/YouTubeAPIDemo

// set up namespace
if (typeof YouTubeAPIDemo == 'undefined') {
    window.YouTubeAPIDemo = {};
}

// YouTube requires this exactly named function in the global scope
function onYouTubeIframeAPIReady() {
    YouTubeAPIDemo.onYouTubeIframeAPIReady();
};

(function(YouTubeAPIDemo) {
    'use strict';

    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);    

    // This function will be called when the YoutTube API is ready
    var onYouTubeIframeAPIReady = function() 
    {
        var timeout;
        var $fader = $('#fader');
       
        $('.productsListView').on('mouseover', '.imageSelected', function(e)
        {
            //find data refference to get youtube ID
            var $this = $(this);
            var $youtubeID = $this.closest('.productClick').data('youtubeid');

            // reference the YouTube player and window
            var theMovie;
            var $movieWindow = $('#movieWindow'); 
                   
            timeout = setTimeout(function() 
            {
                e.preventDefault();

                var createVideo = function()
                {
                    // Remove any existing <iframe> and create an empty element for YouTube to use
                    $movieWindow.empty().html('<div class="#" id="the-movie"></div><button type="button" id="closeVideo" class="delete close">X</button>');                
                    
                    // This creates and embeds the video
                    theMovie = new window.YT.Player(document.querySelector('#the-movie'), 
                    {
                        width: '640',
                        height: '360',
                        videoId: $youtubeID,
                        events: 
                        {
                            // There are other events in the docs
                            // https://developers.google.com/youtube/js_api_reference#Events
                            'onReady': function(e) 
                            {
                                $fader.show();                         
                                // auto-play the video when ready like so:
                                theMovie.playVideo();
                            }
                        }
                    });

                    // show movie window after YouTube API added
                    $movieWindow.removeClass('hidden');

                    // close the video when user click close button and hide the window
                    $movieWindow.on('click', '#closeVideo', function(e)
                    {
                        e.preventDefault();
                        $movieWindow.empty().addClass('hidden');
                        $fader.hide();
                    });                                  
                };        

                createVideo();
            }, 5000);

        });
        
        $('.productsListView').on('mouseout', function() 
        {
          clearTimeout(timeout);
        });         
    };

    // expose the private function above to the global scope so
    // it can be called by YouTube's JS
    YouTubeAPIDemo.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
})(window.YouTubeAPIDemo);
