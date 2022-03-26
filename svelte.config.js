import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { resolve } from 'path';

let routeFolder = process.env.ROUTE_FOLDER;

if (routeFolder == undefined) {
	routeFolder = 'landing';
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	// kit: {
	// 	adapter: adapter(),

	// 	// Override http methods in the Todo forms
	// 	methodOverride: {
	// 		allowed: ['PATCH', 'DELETE']
	// 	}
	// }
	kit: {
		adapter: adapter(),

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		},

		files: {
			routes: `src/routes/${routeFolder}`
		},

		vite: {
			resolve: {
				alias: {
					$src: resolve('./src'),
					$lib: resolve('./src/lib'),
					$stores: resolve('./src/stores'),
					$assets: resolve('./src/assets')
				}
			}
		}
	}
};

export default config;
