/**
 * Created by taraska on 10/5/2016.
 */

$(document).ready(function(){
    $('#license').change(function () {
        if ( $('#license').prop('checked') ) {
            $('.btn_submit').attr('disabled', false);
        } else {
            $('.btn_submit').attr('disabled', true);
        }
    });
});