(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
        var items = data.items.map(function(i){
          if(i.id.kind == 'youtube#video')
            return i;
        })
        $('.video-list').append(template({items: items}));
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
},{}]},{},[1]);
