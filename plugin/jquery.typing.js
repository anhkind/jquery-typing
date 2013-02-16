// jQuery-typing
//
// Version: 0.2.1
// Updater: Anh Nguyen <anhkind@gmail.com>
// Website: https://github.com/anhkind/jquery-typing
//
// Original:
// Website: http://narf.pl/jquery-typing/
// License: public domain <http://unlicense.org/>
// Author:  Maciej Konieczny <hello@narf.pl>

(function ($) {

    //--------------------
    //  jQuery extension
    //--------------------

    $.fn.typing = function (options) {
        return this.each(function (i, elem) {
            listenToTyping(elem, options);
        });
    };


    //-------------------
    //  actual function
    //-------------------

    function listenToTyping(elem, options) {
        // override default settings
        var settings = $.extend({
            start: null,
            stop: null,
            delay: 400
        }, options);

        // create other function-scope variables
        var $elem = $(elem),
            selector = settings.target,
            typing = false,
            delayedCallback;

        // start typing
        function startTyping(event) {
            if (!typing) {
                // set flag and run callback
                typing = true;
                if (settings.start) {
                    settings.start(event, $elem);
                }
            }
        }

        // stop typing
        function stopTyping(event, delay) {
            if (typing) {
                // discard previous delayed callback and create new one
                clearTimeout(delayedCallback);
                delayedCallback = setTimeout(function () {
                    // set flag and run callback
                    typing = false;
                    if (settings.stop) {
                        settings.stop(event, $elem);
                    }
                }, delay >= 0 ? delay : settings.delay);
            }
        }

        // listen to regular keypresses
        $elem.on('keypress', selector, startTyping);

        // listen to backspace and delete presses
        $elem.on('keydown', selector, function (event) {
            if (event.keyCode === 8 || event.keyCode === 46) {
                startTyping(event);
            }
        });

        // listen to keyups
        $elem.on('keyup', selector, stopTyping);

        // listen to focusouts
        $elem.on('focusout', selector, function (event) {
            stopTyping(event, 0);
        });
    }
})(jQuery);
