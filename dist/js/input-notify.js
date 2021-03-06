(function($) {

	$.inputNotify = function(element, text, timeout, options) {
		var $element = $(element);

		options = $.extend({}, {
			timeout: 0
		}, options);

		if ($element.data('inotify')) {
			console.log('~CREATED');

			$element.addClass('u-inotify-container')
				.append(`<span class="c-inotify c-inotify--error">${text}</span>`);

			// setTimeout(function(){
			// 	$element.find('span[class*="c-notify"]').remove()
			// }, timeout);
			// }

			return {
				destroy: function (){
					$element.find('span[class*="c-inotify"]').remove();
				}
			}
		}
	}

	$.fn.inputNotify = function(text, timeout, options) {
		return this.each(function() {
			$(this).data('inotify',
				new $.inputNotify(this, text, timeout, options));
		});
	}

})(jQuery);
