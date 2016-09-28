'use strict';

var youtubeApi = {

  init: function(){
    this.setBinds();
    this.updateVideos(this.queryData);
    if('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('/felipe-pires/dist/js/service-worker.js')
               .then(function() { console.log('Service Worker Registered'); });
    }
  },

  setBinds: function(){
    var flag = false;
    $(document).on('click','.download-video-youtube',function(e){
      $('.modal').removeClass('modal--hidden').addClass('modal--visible');
    });
    $(document).on('click', '.modal__lock-screen, .modal .mdl-button', function(){
      $('.modal').removeClass('modal--visible').addClass('modal--hidden');
    })
    $('.mdl-layout__content').scroll(function(e) {
      if($('.mdl-layout__content').scrollTop() + $('.mdl-layout__content').height() >= $('.mdl-layout__content > div').height()) {
           if(!flag){
            flag = true
            var  nextPageToken = $('meta[name="next-page-token"]').attr('content');
            if(nextPageToken !== '' &&  nextPageToken.length > 0){
              var data = this.queryData;
              data.pageToken = nextPageToken;
              this.updateVideos(data, function(){
                flag = false;
              });
            }
           }
       }
    }.bind(this));
  },


  updateVideos: function(data, callback){

    var source   = $("#card-video-template").html();
    var template = Handlebars.compile(source);

    $.ajax({
      url: this.URL_SEARCH,
      type: 'GET',
      dataType: 'json',
      data: data,
      success: function(data){
        var token = (typeof data.nextPageToken != 'undefined')? data.nextPageToken : ''; 
        $('meta[name="next-page-token"]').attr('content', token)
        $('.loader').addClass('off')
        $('.video-list').append(template(data));
        if(callback) callback(data);
      }
    });
  },



  URL_SEARCH  : 'https://www.googleapis.com/youtube/v3/search',
  queryData   : {
    key     : 'AIzaSyAOqrkBo3YG_3RGSO9gCNbr1I1516h16Us',
    channelId   : 'UCLJ9MNjT7Xzqa7XRiU8IEBg',
    maxResults  : 5,
    part    : 'id,snippet',
    order     : 'date'
  }
}

$(function(){
  youtubeApi.init();
})