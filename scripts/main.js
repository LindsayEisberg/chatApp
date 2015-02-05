$(document).ready(function(){
  user.init();

});


var user = {
  init: function(){
    user.initEvents();
    user.initStyling();
  },
  initStyling: function(){
    user.renderUser();
    user.renderMessage();
  },
  initEvents: function(){


    $('.login').on('submit', function(event){
      event.preventDefault();
        var newUser = {
          user: $(this).find('input[name="newUser"]').val()
        };
      user.createUser(newUser);
    });

    $('#createNewMessage').on('submit', function (event) {
      event.preventDefault();
      var newChatMessage = {
        message: $(this).find('input[name="newMessage"]').val()
      };
      user.createMessage(newChatMessage);

    });

  },




    config: {
      url: 'http://tiy-fee-rest.herokuapp.com/collections/chitChat'
    },

    renderUser: function() {
    $.ajax({
      url: user.config.url,
      type: 'GET',
      success: function (user) {
        var template = _.template(templates.userList);
        var markup = "";
        user.forEach(function(item, idx, arr){
          markup += template(item);
        });
        console.log('markup is...', markup);
        $('.userList').html(markup);
      },
      error: function (err) {
        console.log(err);
      }
    });
  },

    createUser: function(newUser) {
      $.ajax({
      url: user.config.url,
      data: newUser,
      type: 'POST',
      success: function (data) {
        console.log(data, '', 'added!');
        user.renderUser();
      },
      error: function (err) {
        console.log(err);
      }
    });
    $('input').val('');

  },



  renderMessage: function () {
    $.ajax({
      url: user.config.url,
      type: 'GET',
      success: function (user) {
        console.log(user);
        var template= _.template($('messageTmpl').html());
        var markup = "";
        user.forEach(function (item, idx, arr) {
          markup += template(item);
        });
        console.log('markup is ...', markup);
        $('.chatArea').html(markup);
      },
      error: function (err) {
        console.log(err);
      }
    });
  },


  createMessage: function (newMessage) {
    $.ajax({
      url: user.config.url,
      data: newMessage,
      type: 'POST',
      success: function (data) {
        console.log(data);
        user.renderMessage();
      },
      error: function (err) {
        console.log(err);
      }
    });
  }




};
