const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.webpackConfig({
//     resolve: {
//         extensions: [".ts", ".tsx"]
//     },
//     module : {
//         rules : [
//             {
//                 test : /\.tsx$/,
//                 loader : 'ts-loader'
//             }
//         ]
//     }
// });

mix.ts('resources/js/app.tsx', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css')
    .extract(['react', 'react-dom', 'react-router-dom'])
    .version()
    .browserSync({
        host: 'localhost',
        proxy: 'my-nginx',
        port: 3000,
        open: false,
        files: [
            'public/**/*.(js|css)',
        ],
    })
    .webpackConfig({

    });
