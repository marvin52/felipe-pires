'use strict';

var youtubeApi = {


  init: function(){
    this.setBinds();
    this.updateVideos();
  },



  setBinds: function(){
    $(document).on('click','.download-video-youtube',function(e){
      console.log(e, 'click')
    })
  },



  updateVideos: function(){

    var source   = $("#card-video-template").html();
    var template = Handlebars.compile(source);

    $.ajax({
      url: this.URL_SEARCH,
      type: 'GET',
      dataType: 'json',
      data: this.queryData,
      success: function(data){
        $('.loader').addClass('off')
        $('.video-list').append(template(data));
      }
    });
  },



  URL_SEARCH  : 'https://www.googleapis.com/youtube/v3/search',
  queryData   : {
    key     : 'AIzaSyAOqrkBo3YG_3RGSO9gCNbr1I1516h16Us',
    channelId   : 'UCLJ9MNjT7Xzqa7XRiU8IEBg',
    maxResults  : 20,
    part    : 'id,snippet',
    order     : 'date'
  }
}

$(function(){
  youtubeApi.init();
})