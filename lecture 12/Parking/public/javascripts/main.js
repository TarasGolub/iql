jQuery(function() {

	var server = 'http://localhost:3000';

	jQuery('#langChooserControl').load(server + '/lang_list',
		function(response, status, xhr) {
			if (status == "error") {
				var msg = "Sorry but there was an error: ";
				jQuery("#error").html(msg + xhr.status + " " + xhr.statusText);
			}
	});

	jQuery('#parkingApp').load(server + '/cars_list',
		function(response, status, xhr) {
			if (status == "error") {
				var msg = "Sorry but there was an error: ";
				jQuery("#error").html(msg + xhr.status + " " + xhr.statusText);
			}
		});

	jQuery('#langChooserControl').on('change', function() {
		var id = $(this).val();
		// remove "choose your language" from list
		jQuery(this).find('[value=""]').remove();

		jQuery.post(server + '/lang_details', {id : id}, function(data) {
			jQuery('#languageDetailPane').html(data);
		}).fail(function() {
			console.log("error get lang details");
		});
	});
});
