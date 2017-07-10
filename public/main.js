$('.input-field').on('input', function () {
  if ($(this).val().length > 0) {
    $(this).parent('.input').addClass('has-input');
  } else {
    $(this).parent('.input').removeClass('has-input');
  }
});