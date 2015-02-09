$(document).ready(function(){
  chitChatApp.init();


  // to delete bad data uncomment out this line and put in correct id from server
  //  chitChatApp.deleteMessage('54d68ee9ddad9b0300000284');
   //
  //  chitChatApp.deleteMessage('54d68ea8ddad9b0300000282');
  //  chitChatApp.deleteMessage('54d68e9fddad9b0300000280');
   //
   //
  //  chitChatApp.deleteMessage('54d68ba5ddad9b0300000275');
   //
  //   chitChatApp.deleteMessage('54d6896dddad9b0300000269');
  //   chitChatApp.deleteMessage('54d6896addad9b0300000268');
   //
   //
  //   chitChatApp.deleteMessage('54d68964ddad9b0300000267');
   //
  //    chitChatApp.deleteMessage('54d6867cddad9b0300000264');
  //    chitChatApp.deleteMessage('54d68610ddad9b0300000262');
  //    chitChatApp.deleteMessage('54d6860cddad9b0300000261');
  //    chitChatApp.deleteMessage('54d6841eddad9b0300000253');
   //
   //



});

var messageArray = [];

var chitChatApp = {

  config: {
    url: 'http://tiy-fee-rest.herokuapp.com/collections'
  },

  init: function(){
    chitChatApp.initEvents();
    chitChatApp.initStyling();
    chitChatApp.userExists(); //skip login screen if user exists in local storage

    setInterval(chitChatApp.renderUser, 1000);
    setInterval(chitChatApp.renderMessage, 1000);
  },
  initStyling: function(){
    chitChatApp.renderUser();
    chitChatApp.renderMessage();
  },

  userExists: function() {
    if (localStorage.length === 1 || localStorage.length === 2) {
      $('.loginForm').css('display', 'none');
      $('.container').addClass('active');
      console.log('User Exists!');
    } else {
      console.log('user does not exist');
    };
    },
  initEvents: function(){

    // var storedLogin = JSON.parse(localStorage.getItem('userInfo'));


    $('.login').on('submit', function(event){
      event.preventDefault();
      var userInfo = {
        userName: $(this).find('input[name="newUser"]').val(),
        userId: $(this).closest('li').data('itemid')
        // userMessage:""

      };

      $(this).css('display', 'none');
      $(this).parent().parent().parent().siblings('.container').addClass('active');
      chitChatApp.createUser(userInfo);

    });


    $('.userList').on('click', '.logout', function (event){
        event.preventDefault();
        var userId = $(this).closest('li').data('itemid');
        chitChatApp.deleteUser(userId);

    });

    $('.newMessage').on('click', function(event){
      event.preventDefault();

      var userNameParse = JSON.parse(localStorage.getItem('userInfo'));
      // var now = moment("YYYY-MM-DD HH:mm");
      var newMessage = {
        userMessage : $(this).siblings('input[name="newMessage"]').val(),
        userId: userNameParse.userId,
        userName: userNameParse.userName,
        // date: now

      };
      // var now = moment();
      console.log('new message event worked!');


      chitChatApp.addMessage(newMessage);
    });


    // $('.chatArea').on('click', '.delete', function (event){
    //     event.preventDefault();
    //     var userId = $(this).closest('li').data('itemid');
    //     chitChatApp.deleteMessage(userId);
    //
    // });
  },



    renderUser: function() {
    $.ajax({
      url: chitChatApp.config.url + "/chitChatUser",
      type: 'GET',
      success: function (chitChatApp) {
        var template = _.template(templates.userList);
        var markup = "";
        chitChatApp.forEach(function(item, idx, arr){
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
      url: chitChatApp.config.url + "/chitChatUser",
      data: newUser,
      type: 'POST',
      success: function (data) {
        console.log(data, '', 'added!');
        chitChatApp.renderUser();
        var strUserInfo = JSON.stringify(data);
        localStorage.setItem('userInfo', strUserInfo);
      },
      error: function (err) {
        console.log(err);
      }
    });
    $('input').val('');

  },


  deleteUser: function(userId) {
  $.ajax({
    url: chitChatApp.config.url + "/chitChatUser" + "/" + userId,
    type: 'DELETE',
    success: function (data) {
      console.log(data);
      localStorage.removeItem('userInfo');
      $('.container').removeClass('active');
      $('.loginForm').css('display', 'block');
      $('.login').css('display', 'block');
      chitChatApp.renderUser();

    },
    error: function (err) {
      console.log(err);
    }
  });
},

  renderMessage: function() {
    $.ajax({
      url: chitChatApp.config.url + "/chitChatMessage2",
      type: "GET",
      success: function (message) {
        console.log(message);
        var template = _.template(templates.messageTmpl);
        var markup = "";
        message.forEach(function(item, index, array){
          markup += template(item);
        });
        console.log('IT WORKED!', markup);
        $('.chatArea').prepend().html(markup);
      },
      error: function(err) {
        console.log(err);
      }
    });
  },



  addMessage: function(userMessage) {
    $.ajax({
      url: chitChatApp.config.url + "/chitChatMessage2",
      data: userMessage,
      type: "POST",
      success: function (data) {
        console.log(data);
        chitChatApp.renderMessage();
        var strMessage = JSON.stringify(data);
        localStorage.setItem('newMessage', strMessage);

          var info = JSON.parse(localStorage.getItem('userInfo'));
          var msg = JSON.parse(localStorage.getItem('newMessage'));
          if (info.userName === msg.userName) {
            data.forEach(function(item, idx, arr){
              messageArray.push(userMessage(userName));
            });
          };

        console.log(messageArray);


      },
      error: function(err) {
        console.log(err);
      }
    });
    $('input').val('');

  },

  deleteMessage: function(userId) {
  $.ajax({
    url: chitChatApp.config.url + "/chitChatMessage2" + "/" + userId,
    type: 'DELETE',
    success: function (data) {
      console.log(data);
      chitChatApp.renderMessage();
    },
    error: function (err) {
      console.log(err);
    }
  });
}


};
