/**
 * jQuery.plinq - On the fly module to display links in parentheses
 * Copyright (c) 2010 Cory Dorning - cory.dorning|at|gmail|dot|com | http://www.corydorning.com
 * Dual licensed under MIT and GPL.
 * Date: 06/28/2010
 * @author Cory Dorning
 * @version 1.00
 *
 * http://www.corydorning.com/projects/plinq
 */

(function($) { 
	$.fn.plinq = function(params) {
		var defaults = {  // set plug-in defaults
					baseURL: '',  // all, external, local
					cleanURL: false  // true, false
				};
		var options = $.extend(defaults, params);
		var selector = $(this).selector;
		var css = '<style type="text/css" media="print">' + selector + ':after {content: " (" attr(href) ")";}</style>';
		var $links = $(selector).filter('[href]');
		var $head = $('head');

		$.each($links,function(i) {
			var $currLink = $($links[i]);
			$currLink = (options.cleanURL) ? $currLink.attr('href').replace('http://','') : $currLink.attr('href');
		});

		if (window.onbeforeprint === null && window.onafterprint === null) {
			window.onbeforeprint = function() {
				$links.after('<span>&nbsp;(' + href + ')</span>');
			};
			window.onafterprint = function() {
				$links.next('span').remove();
			};
		} else {
			$head.append(css);
		}
	};
})(jQuery);