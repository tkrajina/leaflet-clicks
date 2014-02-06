# Leaflet click handlers

With this plugin you can use two new event handlers:

## delayedclick

...can be used like 'click' but it is triggered only if a 'dblclick' isn't triggered in the meantime:

    element.on('delayedclick', function() { ... });

delayedclick is triggered 300 milliseconds after the click.

## click2

...can be used instead of 'click' and 'dblclick', but the event object contains the number of clicks that occured in the last 300 milliseconds.

    element.on('click2', function(event) {
        if(event.clicks == 1) {
            console.log('like a normal click');
        } else if(events.clicks >= 2) {
            console.log('like a double click');
        }
    });

## License

Leaflet.Editable.Polyline is licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)

