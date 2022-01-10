;
(function (Docsify, $docsify, undefined) {
    const DEFAULT_BANNER = '_banner';
    const install = function (hook, vm) {
        const { loadBanner, ext, requestHeaders } = vm.config;
        if (!loadBanner) { return; }
        const file = loadBanner === true ? DEFAULT_BANNER + ext : loadBanner;
        hook.mounted(_ => {
            const path = vm.router.getFile(file);
            const bodyNode = Docsify.dom.getNode('body');
            Docsify
                .get(path, false, requestHeaders)
                .then(content => {
                    const html = vm.compiler.compile(content);
                    const el = Docsify.dom.create('section', html);

					bodyNode.prepend(el);

                });
        });
    }
    $docsify.plugins = [].concat(install, $docsify.plugins);
})(Docsify, $docsify);
