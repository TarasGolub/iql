(function ($) {
    jQuery.fn.syncSelect = function (options) {
        var resOptions = {};
        var defaultOptions = {
            contBorderWidth: '1px',
            contBorderStyle: 'dotted',
            contBorderColor: '#FFB797',
            selBorderWidth: '1px',
            selBorderStyle: 'solid',
            selBorderColor: 'darkblue',
            selBackgroundColor: '#C6FFE7',
            ulBorderWidth: '1px',
            ulBorderStyle: 'solid',
            ulBorderColor: 'darkred',
            ulBackgroundColor: '#FDFFD4'
        };
        resOptions = $.extend(resOptions, defaultOptions, options);
        
        var syncSelect = function () {
            var $this = $(this);
            if ($this.has('ul').has('select').length === 0) return;
            $this.css({
                'border-width': resOptions.contBorderWidth,
                'border-style': resOptions.contBorderStyle,
                'border-color': resOptions.contBorderColor
            });

            /**
             * gets all SELECTs in each found element,
             * for each SELECT gets UL associated with SELECT,
             * sets attributes to OPTION in accordance with associated LI`s classes
             */
            var selects = $('select', $this);
            selects.each(function () {
                /**
                 * clones current SELECT
                 */
                var currSelect = $(this).clone();
                currSelect.css({
                    'border-width': resOptions.selBorderWidth,
                    'border-style': resOptions.selBorderStyle,
                    'border-color': resOptions.selBorderColor,
                    'background-color': resOptions.selBackgroundColor
                });
                /**
                 * gets UL associated with SELECT on attribute data-input-name
                 */
                var ul = $('ul', $this).filter(function () {
                    return $(this).data('inputName') === currSelect.attr('name');
                });
                ul.css({
                    'border-width': resOptions.ulBorderWidth,
                    'border-style': resOptions.ulBorderStyle,
                    'border-color': resOptions.ulBorderColor,
                    'background-color': resOptions.ulBackgroundColor
                });

                /**
                 * gets all OPTIONs and LIs
                 */
                var opts = $('option', currSelect);
                var lis = $('li', ul);

                /**
                 * if UL contains more then 1 selected li - set attribute multiply to SELECT
                 */
                if (lis.filter('.selected').length > 1) {
                    $(currSelect).prop('multiple', true);
                }

                opts.each(function () {
                    var currOpt = $(this);
                    /**
                     * gets LI associated with OPTION on attribute data-input-value
                     */
                    var li = lis.filter(function () {
                        return $(this).data('inputValue') === currOpt.val();
                    });

                    /**
                     * sets attributes to OPTION in accordance with LI`s classes
                     */
                    if (li.hasClass('selected')) {
                        currOpt.prop('selected', true);
                    }
                    if (li.hasClass('disabled')) {
                        currOpt.prop('disabled', true);
                    }
                    if (li.hasClass('enabled')) {
                        currOpt.prop('disabled', false);
                    }
                });
                /**
                 * triggers event after sync each SELECT
                 */
                $this.trigger('syncSelect.sync');
                /**
                 * replaces current SELECT with modified instance
                 */
                $(this).replaceWith(currSelect);
            });
        };
        return this.each(syncSelect);
    }

})(jQuery);
