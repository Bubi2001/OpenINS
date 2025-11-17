window.MathJax = {
    options: {
        // This tells MathJax to ignore math formatting inside <pre>
        // and <code> blocks, which is essential for docs.
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
    },
    startup: {
        // This is the command that says "OK, all config is loaded, run and render the page."
        ready: () => {
        MathJax.startup.defaultPageReady();
        }
    }
};
