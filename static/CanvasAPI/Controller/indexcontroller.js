$(document).ready(function () {
    /**
     * side bar toggler
     */
    $('.sidebar').css('left', -window.innerWidth);
    $('.sidebar').show();

    $('#sideBarToggler').click(function () {

      if ($(this).data('status')) {
        $(this).data('status', 0)
        $(this).children().animate({
          opacity: 0
        }, 'fast', () => $(this).children().toggleClass('fa fa-bars').toggleClass('fa fa-arrow-left')).animate({
          opacity: 1
        }, 'fast');
        if (!$(this).data('expand')) {
          $('.sidebar').animate({
            left: '0',
          }, () => $(this).data('status', 1));
          $(this).data('expand', true)
        } else {
          $('.sidebar').animate({
            left: -window.innerWidth,
          }, () => $(this).data('status', 1));

          $(this).data('expand', false)
        }

      }
    });

    $(window).on('resize',function() {
      if(!$('#sideBarToggler').data('expand'))
        $('.sidebar').css('left',-window.innerWidth);
    });

    /**
     * Side bar list controller
     */

    $('.sideList').on('click',function() {
        if(!$(this).hasClass('check')) {
            let passive = "sideList list-group-item col-6 col-md-2 border  rounded-top text-center bg-secondary ";
            let active = "sideList list-group-item col-6 col-md-2  text-center border rounded-top border-bottom-0 bg-light check";
            $('.sideList').attr('class',passive);
            $(this).attr('class',active);
        }
    });
  });