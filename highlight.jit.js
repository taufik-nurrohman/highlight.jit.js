(function(win, doc, hljs) {
    // Generate CDN path relative to this file
    let currentScript = doc.currentScript,
        src = currentScript.src;
    // Generate CDN folder path
    let parts = src.split('/');
    parts.pop(); // Remove script name
    parts = parts.join('/');
    let currentLanguagePath = parts + '/languages/%s.min.js',
        currentStyle,
        currentStylePath = parts + '/styles/%s.min.js';
    // Since Highlight.js options is not exposed to public, I need to make my own configure method
    hljs.currentLanguagePath = currentLanguagePath;
    hljs.currentStyle = currentStyle;
    hljs.currentStylePath = currentStylePath;
    // Load language if needed
    hljs.addPlugin({
        'before:highlightBlock': ({block, language}) => {
            // `language` is `undefined` if no language matched to a class name in the block
            if (!language) {
                // TODO: Prioritize class name using format `lang-*` and `language-*`
                let guessLanguages = (block.className || "").split(/\s+/);
                guessLanguages.forEach(language => {
                    let script = doc.createElement('script');
                    script.src = hljs.currentLanguagePath.replace(/%s/, language);
                    doc.body.appendChild(script);
                    // Remove on error
                    script.addEventListener('error', () => {
                        script.remove();
                    }, false);
                    // Highlight on success
                    script.addEventListener('load', () => {
                        hljs.highlightBlock(block);
                    }, false);
                });
            }
        }
    });
    win.addEventListener('DOMContentLoaded', () => {
        if (!hljs.currentStylePath) {
            return;
        }
        // Load style sheet
        let link = doc.createElement('link');
        link.href = hljs.currentStylePath.replace(/%s/, hljs.currentStyle || 'default');
        link.rel = 'stylesheet';
        doc.head.appendChild(link);
        link.addEventListener('error', () => {
            // Remove on error
            link.remove();
        }, false);
    }, false);
})(window, document, hljs);
