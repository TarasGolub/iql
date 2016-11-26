/**
 * Created by taraska on 10/5/2016.
 */
$(document).ready(function(){
    $('[name="delivery_method"]').change(function () {
        if ( $('#self_pickup').prop('checked') ) {
            $('#delivery_city').attr('disabled', true);
            $('#delivery_storage').attr('disabled', true);
        } else {
            $('#delivery_city').attr('disabled', false);
            $('#delivery_storage').attr('disabled', false);
        }
    });
});