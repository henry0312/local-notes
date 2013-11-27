/*
Copyright (c) 2013 Tsukasa ŌMOTO
henry0312@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/* This file is available under an MIT license. */

$(function () {
    /**
     * define extensions of markdown files
     *
     * @see https://github.com/github/markup/blob/master/lib/github/markups.rb#L1
     */
    var MD_FILES = /md|mkdn?|mdown|markdown/;

    /**
     * Load markdown file
     *
     * @param url file path to be loaded.
     * @return array
     */
    function load_markdown(url) {
        var arr = [];

        $.ajax({
            url:      url,
            dataType: 'text',
            async:    false
        }).done(function(data) {
            arr['result']   = true;
            arr['content']  = marked(data); // Parse markdown
        }).fail(function(data) {
            arr['result']   = false;
            arr['content']  = url + " is not found.";
        });

        return arr;
    }

    /**
     * Change contents
     *
     * @param real_path canonicalized absolute pathname of new contents
     */
    function change_content(real_path) {
        var _basename = basename(real_path);
        var _dirname  = dirname(real_path);

        // load
        var new_content = load_markdown(real_path)['content'];
        // change
        $("#content").empty();
        $("#content").append(new_content);

        /*
         * Resolve Paths
         */
        $("#content img").each(function() {
            var src = this.getAttribute('src');
            if ( !/:\/\//.test(src) ) {
                this.src = _dirname + '/' + src;
                this.src = this.src;    // canonicalize
            }
        });
        $('#content a').each(function() {
            var href = this.getAttribute('href');
            if ( !/:\/\//.test(href) ) {
                this.href = _dirname + '/' + href;
                this.href = this.href;  // canonicalize

                if (!MD_FILES.test(href)) {
                    this.target = '_blank';
                }
            } else {
                // external links
                this.target = '_blank';
            }
        });
    }

    /**
     * Initial load
     */
    function initial_load() {
        var real_path = dirname(location.href) + '/' + basename(location.href).split('.').shift() + '.md';
        change_content(real_path);
        // for history
        history.replaceState($("#content").html(), null, location.href);
    }
    $(initial_load);

    /**
     * Change contents
     */
    $("#content").on("click", "a", function(e) {
        var _protocol = e.target.protocol;
        var _filepath = e.target.getAttribute('href');

        if ( MD_FILES.test(_filepath.split('.').pop()) ) {
            e.preventDefault();
            change_content(e.target.href);
            // for history
            history.pushState($("#content").html(), null, e.target.href);
        }
    });

    // For history back or forward
    $(window).on('popstate', function(e) {
        var state = e.originalEvent.state;
        if (state != null) {
            $("#content").html(state);
        }
    });
});

function basename (path, suffix) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Ash Searle (http://hexmen.com/blog/)
  // +   improved by: Lincoln Ramsay
  // +   improved by: djmix
  // *     example 1: basename('/www/site/home.htm', '.htm');
  // *     returns 1: 'home'
  // *     example 2: basename('ecra.php?p=1');
  // *     returns 2: 'ecra.php?p=1'
  var b = path.replace(/^.*[\/\\]/g, '');

  if (typeof suffix === 'string' && b.substr(b.length - suffix.length) == suffix) {
    b = b.substr(0, b.length - suffix.length);
  }

  return b;
}

function dirname (path) {
  // http://kevin.vanzonneveld.net
  // +   original by: Ozh
  // +   improved by: XoraX (http://www.xorax.info)
  // *     example 1: dirname('/etc/passwd');
  // *     returns 1: '/etc'
  // *     example 2: dirname('c:/Temp/x');
  // *     returns 2: 'c:/Temp'
  // *     example 3: dirname('/dir/test/');
  // *     returns 3: '/dir'
  return path.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '');
}
