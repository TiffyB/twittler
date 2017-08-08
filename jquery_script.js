$(document).ready(function(){
  var $body = $('body');
  $body.html('');

  var $tweet;
  var $user;
  var $tweetTime; 
  
  var $refresh = $('<a class="refresh"></a>');
  $refresh.text('Refresh Tweets');
  $refresh.prependTo($body);
  
  var $logo = $('<h1 class="logo"></h1>');
  $logo.text('Twittler');
  $logo.prependTo($body);

  var displayIndividualUser = function() {
    var clickedOnUser = $(this).text();
    if ($('.tweet').hasClass('shown')) {
      $('.tweet').removeClass('shown');
      $('.tweet').show();
    } else {
      $('.tweet').filter(function(item) {
        return $('.username', this).text() === clickedOnUser;
      }).addClass('shown');
      $('.tweet:not(.shown)').hide();
    }
  };

  var getNewestTweets = function(){
    var currentNumOfTweets = $('.tweet').length; 
    var newestBatchOfTweets = streams.home.slice(currentNumOfTweets);
    var index = 0;
    while(index < newestBatchOfTweets.length){
      var tweet = newestBatchOfTweets[index];
      $tweet = $('<div class="tweet"></div>');
      $user = $('<span class="username"></span>');
      $tweetTime = $('<div class="time"></div>'); 
      $user.text('@' + tweet.user + ':');
      $tweet.text(tweet.message);
      $tweetTime.text(tweet.created_at);
      $user.prependTo($tweet);
      $tweetTime.appendTo($tweet);
      $tweet.insertAfter('.refresh');
      index += 1;
    }
    //add the '.shown' class as appropriate
    if ($('.tweet').hasClass('shown')) {
      var filterThisUsers = $('.shown').find('.username').first().text();
      $('.tweet').filter(function(item) {
        return $('.username', this).text() === filterThisUsers;
      }).addClass('shown');
    }
    //if the class '.shown' exists, then only display those items
    if($('.shown').length !== 0) {
      $('.tweet:not(.shown)').hide();
    }
  };
  
  getNewestTweets();
  $(document).on('click', '.username', displayIndividualUser);
  $('.refresh').on('click', getNewestTweets);
  
});