import Widgets from '../src/dev/js-widget-hooks';

let now = function(){
    return (new Date()).getMilliseconds() + ': ';
};

Widgets.register('test', function (elem) {
    let str = now() + 'test1 execution';
    elem.innerHTML += '<br/>' + str;
    console.log(str);
}, 5);


Widgets.register('test2', function (elem) {
    let str = now() + 'test2 execution';
    elem.innerHTML += '<br/>' + str;
    console.log(str);
}, 1);

Widgets.register('will-error', function (elem) {
    throw ('I don\'t exist');
}, 1);


Widgets.init();

Widgets.setOptions({
    'widgetClass': 'js-widget'
});

Widgets.init();
