$(function(){
    function buildHTML(message){
      if ( message.image ) {
        var html =
          `<div class="message-list__index" data-message-id=${message.id}>
              <div class="message-list__index__top--name">
                ${message.user_name}
              </div>
              <div class="message-list__index__top--date-time">
                ${message.created_at}
              </div>
            </div>
            <div class="message-list__index__message">
              <p class="lower-message__content">
                ${message.body}
              </p>
            </div>
            <img src=${message.image} >
          </div>`
        return html;
      } else {
        var html =
          `<div class="message-list__index" data-message-id=${message.id}>
            <div class="message-list__index__top">
              <div class="message-list__index__top--name">
                ${message.user_name}
              </div>
              <div class="message-list__index__top--date-time">
                ${message.created_at}
              </div>
            </div>
            <div class="message-list__index__message">
              <p class="lower-message__content">
                ${message.body}
              </p>
            </div>
          </div>`
        return html;
      };
    }
$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
    var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
        .done(function(data){
          var html = buildHTML(data);
          $('.chat-main__message-list').append(html);
          $('form')[0].reset();
          $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
          $(".message-form__btn").prop('disabled', false);
        })
        .fail(function() {
          alert("メッセージ送信に失敗しました");
      });
    })
});
