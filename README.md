JIT Plugin for [Highlight.js](https://github.com/highlightjs/highlight.js)
==========================================================================

[Demo](https://taufik-nurrohman.github.io/highlight.jit.js/index.html)

Usage
-----

~~~ .js
<!-- Load the JavaScript library along with your pre-defined language highlighter -->
<script src="highlight.min.js"></script>
<!-- Let other language highlighter(s) to be loaded by my plugin automatically -->
<script src="highlight.jit.min.js"></script>
<script>
hljs.currentLanguagePath = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/languages/%s.min.js';
hljs.currentStyle = 'agate';
hljs.currentStylePath = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/styles/%s.min.js';
</script>
~~~

To disable the style sheet loader:

~~~ .js
hljs.currentStyle = null;
hljs.currentStylePath = null;
~~~

License
-------

BSD
