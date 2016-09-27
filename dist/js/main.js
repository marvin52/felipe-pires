(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var youtubeApi = {

  init: function(){
    this.setBinds();
    this.updateVideos();
    if('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('felipe-pires/dist/js/service-worker.js')
               .then(function() { console.log('Service Worker Registered'); });
    }
  },

  setBinds: function(){
    $(document).on('click','.download-video-youtube',function(e){

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
},{}]},{},[1]);
