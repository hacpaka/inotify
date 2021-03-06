(function($) {
	$.notify = function(element, text, type, timeout) {

		var $element = $(element);
		if (!$element.is('input,select,textarea')){
			throw new Error(`Invalid element type: ${element.tagName}!`);
		}

		var $parent = $element.parent();
		if (!$parent.is('div')) {
			throw new Error(`Invalid parent element type: ${element.tagName}!`);
		}

		if (['error', 'success'].indexOf(type) < 0) {
			type = 'error';
		}

		if (isNaN(timeout) || timeout < 0) {
			timeout = 0;
		}

		if (!$element.data('jquery-forms-notify')) {
			$parent.addClass(`u-inotify--${type}`)
				.append(`<span class="c-inotify">${text}</span>`);

			const __INSTANCE__ = {
				destroy: function (){
					$parent.removeClass(`u-inotify--${type}`)
						.find('.c-inotify').remove();

					$element.removeData('jquery-forms-notify');
				}
			}

			$element.data('jquery-forms-notify', __INSTANCE__);
			if (timeout > 0) {
				setTimeout(function () {
					__INSTANCE__.destroy();
				}, timeout);
			}
		}
	}

	$.fn.notify = function(text, type, timeout) {
		return this.each(function() {
			$.notify(this, text, type, timeout);
		});
	}

	$.fn.error = function(text, timeout) {
		return this.each(function() {
			$.notify(this, text, "error", timeout);
		});
	}

	$.fn.success = function(text, timeout) {
		return this.each(function() {
			$.notify(this, text, "success", timeout);
		});
	}
})(jQuery);
