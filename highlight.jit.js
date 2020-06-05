(function(win, doc, hljs) {
    // Generate CDN path relative to this file
    let currentScript = doc.currentScript,
        src = currentScript.src;
    // Generate CDN folder path
    let parts = src.split('/');
    parts.pop(); // Remove script name
    let currentLanguagePath = parts.join('/') + '/languages/%s.min.js';
    // Since Highlight.js options is not exposed to public, I need to make my own configure method
    hljs.currentLanguagePath = currentLanguagePath;
    // Load language if needed
    hljs.addPlugin({
        'before:highlightBlock': ({block, language}) => {
            // `language` is `undefined` if no language matched to a class name in the block
            if (!language) {
                let classes = block.className || "",
                    // Prioritize class name using format `lang-*` and `language-*`
                    // TODO: Get language regex from the option where possible
                    guessLanguage = classes.match(/\blang(?:uage)?-([\w-:.]+)\b/),
                    // Else, try to find the original language name from every class names
                    guessLanguages = guessLanguage ? [guessLanguage[1]] : classes.split(/\s+/);
                guessLanguages.forEach(language => {
                    if (!language) {
                        return;
                    }
                    let script = doc.createElement('script');
                    script.src = hljs.currentLanguagePath.replace(/%s/, language);
                    doc.body.appendChild(script);
                    // Remove on error
                    script.addEventListener('error', () => {
                        script.remove();
                    }, false);
                    // Highlight on success
                    script.addEventListener('load', () => {
                        // TODO: Prevent recursive `before:highlightBlock` hook here
                        hljs.highlightBlock(block);
                    }, false);
                });
            }
        }
    });
})(window, document, hljs);
