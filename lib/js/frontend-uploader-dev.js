// HTML5 async file upload ( IE9+ )

var FrontendUploader = {};

( function( $, window, undefined ) {

	FrontendUploader.init = function() {
		// @todo remove hardcoded selectors?
		FrontendUploader.$UploadInput = $( '#ugc-media-form input[type="file"]');
		FrontendUploader.$UploadForm = $('#ugc-media-form');
		FrontendUploader.$UploadedFilesList = $('#ugc-media-form #ugc-files-list');
		FrontendUploader.$Response = $('#ugc-media-form #ugc-response');
		FrontendUploader.formdata = false;



		FrontendUploader.$UploadForm.validate({
			submitHandler: function( form ) {
				FrontendUploader.upload( form );
			}
		});

	}

	FrontendUploader.showUploadedItem = function( result, filename ) {

	}

	FrontendUploader.upload = function( form ) {
		if ( window.FormData ) {
	  		FrontendUploader.formdata = new FormData();
	 		FrontendUploader.$Response.innerHTML = "Uploading . . .";
	 		var i = 0, len = FrontendUploader.$UploadInput.length, img, reader, file;
		
			for ( ; i < len; i++ ) {
				file = FrontendUploader.$UploadInput.files[i];
		
				//if (!!file.type.match(/image.*/)) {
					if ( window.FileReader ) {
						reader = new FileReader();
						reader.onloadend = function (e) { 
							FronentUdploader.showUploadedItem( e.target.result, file.fileName );
						};
						reader.readAsDataURL(file);
					}
					if (FrontendUploader.formdata) {
						FrontendUploader.formdata.append( "images[]", file );
					}
				//}	
				// @todo add non-file fields
			}
		
			if ( FrontendUploader.formdata ) {
				$.ajax({
					url: FuVars.ajaxurl,
					type: "POST",
					data: formdata,
					processData: false,
					contentType: false,
					success: function (res) {
						document.getElementById("response").innerHTML = res; 
					}
				});
			}
		} else {
			form.submit();
		}		
	}

	$(document).ready(function() {
		FrontendUploader.init();
	});
})(jQuery, window);