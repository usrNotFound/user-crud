import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { render } from 'react-dom'

require('./bootstrap');

InertiaProgress.init();

createInertiaApp({
    resolve : name => import(`./Pages/${name}`),
    setup({el, App, props}) {
        render(<App {...props} />, el);
    },
});
