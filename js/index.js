/* @longzhou vicbeta.com */
var WebApp = WebApp || {};

/**
 * @desc Util
 */
WebApp.Util = {
    /**
     * @desc inArray
     */
    inArray: function(k, ary) {
        var i, len;
        for (i = 0, len = ary.length; i < len; i++) {
            if (ary[i] === k) {
                return i;
            }
        }
        return -1;
    },
    /**
     * @desc trim
     */
    trim: function(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    }
};

/**
 * @desc Menu
 */
WebApp.Menu = (function() {
    // page height
    var p_height = 560;

    // menu switch
    var initSwitch = function() {
        var $icons, i, len;

        $icons = document.getElementsByClassName('icon');

        for (i = 0, len = $icons.length; i < len; i++) {
            $icons[i].dataset['index'] = i;

            $icons[i].addEventListener('click', function(e) {
                var cls, ocls, index, oindex, $old;
                
                cls = this.className.split(' ');
                index = WebApp.Util.inArray('c', cls);

                if (index >= 0) { // has class 'c'
                    return;
                }

                // remove class 'c'
                $old = document.getElementById('menu').getElementsByClassName('c')[0];

                ocls = $old.className.split(' ');
                ocls.splice(WebApp.Util.inArray('c', ocls), 1);
                $old.className = ocls.join(' ');

                // add class 'c'
                cls.push('c');
                this.className = cls.join(' ');

                // slide
                document.getElementById('main').style.top = -(p_height * (+this.dataset['index'])) + 'px';
            });
        }
    };

    return {
        init: function() {
            initSwitch();
        }
    };
}());

/**
 * @desc Function Module
 */
WebApp.Fun = (function() {
    // dom转化数组
    var initFunDomTransition = function() {
        document.getElementById('fun-domtranslate-dom').addEventListener('blur', function() {
            var oval, val, i, j, len, space, lessThen;

            oval = WebApp.Util.trim(this.value);
            if (oval === '') {
                return;
            }

            val = ['[\'', oval.replace(/\n\s*/g, '\',\''), '\']'].join('');
            val = val.split('\',\'');

            space = 0;
            lessThen = false;
            for (i = 1, len = val.length; i < len; i++) {
                if (val[i].indexOf('</') === 0) {
                    space -= 4;
                    lessThen = true;
                } else {
                    if (!lessThen) {
                        space += 4;
                        lessThen = false;
                    }

                    if (/\<\/[a-zA-Z0-9]*\>/.test(val[i])) {
                        lessThen = true;
                    } else {
                        lessThen = false;
                    }
                }

                val[i] = '\'' + val[i];
                for (j = 0; j < space; j++) {
                    val[i] = ' ' + val[i];
                }
            }
            val = val.join('\',\n');

            document.getElementById('fun-domtranslate-ary').value = val + '.join(\'\');';
        });
    };

    return {
        init: function() {
            initFunDomTransition();
        }
    };
}());

// start
WebApp.Menu.init();
WebApp.Fun.init();