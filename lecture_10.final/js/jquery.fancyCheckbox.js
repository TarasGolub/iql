(function ($) {
    jQuery.fn.fancyCheckbox = function (options) {
        var resOptions = {};
        var defaultOptions = {
            wrapBackgroundColor: '#FFFCE5',
            wrapBorder: '1px solid #FFF1C2'
        };
        resOptions = $.extend(resOptions, defaultOptions, options);
        
        var fancyCheckbox = function () {
            var $this = $(this);

            /**
             * gets all inputs with type 'checkbox'
             */
            var cBoxes = $('input[type="checkbox"]', $this);
            if (cBoxes.length === 0) return;

            /**
             * clones input,
             * wraps each input into <DIV> and creates <A> with data attributes and classes,
             * replacea input with new block
             */
            cBoxes.each(function () {
                var currBox = $(this);
                var box = currBox.clone()
                    .wrap('<div class="myfancy myfancy-check-wrapper"></div>')
                    .after('<a class="marker"/>');
                box.next()
                    .attr('data-input-name', currBox.attr('name'))
                    .attr('data-input-value', currBox.val())
                    .addClass(currBox.prop('checked') ? 'checked' : '')
                    .addClass(currBox.prop('disabled') ? 'disabled' : 'enabled')
                    .parent().css({
                    'background-color': resOptions.wrapBackgroundColor,
                    'border': resOptions.wrapBorder
                });
                currBox.replaceWith(box.parent());
                
                /**
                 * triggers event on each wrapped checkbox
                 */
                $this.trigger('fancyCheckbox.wrap');
            });
        };
        return this.each(fancyCheckbox);
    }

})(jQuery);
