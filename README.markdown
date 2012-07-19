jQuery-typing
=============

Assign callbacks for started/stopped typing events.


Usage
-----

    $(':text').typing({
        start: function (event, $elem) {
            $elem.css('background', '#fa0');
        },
        stop: function (event, $elem) {
            $elem.css('background', '#f00');
        },
        delay: 400,     //optional, default is 400(ms)
        target: '.type' //optional
    });

`delay` is amount of time the plugin waits for another keypress before
judging that typing has stopped; it is expressed in milliseconds and
defaults to 400. Regardless of `delay`'s value, the `stop` callback is
called immediately when blur event occurs.

`target` is the selector of the main element so that the related events will
bubble to the main element. This is to optimize the plugin with the new 'on'
function of jQuery 1.7+.

Callbacks are passed two arguments: event that caused callback execution
and jQuery object for matched element. Possible events are `keypress`
or `keydown` for `start` callbacks and `keyup` or `blur` for `stop`
callbacks.


Demo
----

To be updated.

Download
--------

Get production version from
<https://raw.github.com/anhkind/jquery-typing/master/plugin/jquery.typing.min.js>

For development version visit [GitHub][].

  [GitHub]: http://github.com/anhkind/jquery-typing