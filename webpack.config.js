const Encore = require('@symfony/webpack-encore');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('app', './assets/app.tsx')

    // enables the Symfony UX Stimulus bridge (used in assets/bootstrap.js)
    //.enableStimulusBridge('./assets/controllers.json')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    //.enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    .configureBabel((config) => {
        config.plugins.push('@babel/plugin-proposal-class-properties');
    })

    // enables @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })

    // enables Sass/SCSS support
    //.enableSassLoader()

    .enableLessLoader(() => {
        return {
            lessOptions: {
                modifyVars: {
                    //'layout-header-background': '#f0f2f5'
                    //'primary-color': '#0BD37E',
                },
                javascriptEnabled: true,
            }
        };
    })

    // uncomment if you use TypeScript
    .enableTypeScriptLoader()

    // uncomment if you use React
    .enableReactPreset()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    //.enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()

    // .configureWatchOptions(function(watchOptions) {
    //     // enable polling and check for changes every 250ms
    //     // polling is useful when running Encore inside a Virtual Machine
    //     watchOptions.poll = 250;
    // })
;

const config = Encore.getWebpackConfig();

config.resolve.extensions.push('.tsx');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
config.plugins.push(
    new BrowserSyncPlugin(
        {
            host: 'localhost',
            proxy: 'my-nginx',
            port: 3000,
            open: false,
            files: [
                'public/**/*.(js|css)',
            ],
            notify: false
        },
        {
            reload: false, // this allow webpack server to take care of instead browser sync
            name: 'bs-webpack-plugin',
        },
    )
);

module.exports = config;

//const path = require('path');
// module.exports = {
//     mode: "development",
//     entry: ['./assets/ku.js', './assets/app.tsx'],
//     output: {
//         path: path.resolve(__dirname, 'public/build'),
//         filename: 'app.js',
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.less$/i,
//                 use: [
//                     "style-loader",
//                     "css-loader",
//                     {
//                         loader: "less-loader",
//                         options: {
//                             lessOptions: {
//                                 modifyVars: {
//                                     //'layout-header-background': '#f0f2f5'
//                                     //'primary-color': '#0BD37E',
//                                 },
//                                 javascriptEnabled: true,
//                             }
//                         },
//                     },
//                 ],
//             },
//             {
//                 test: /\.tsx?$/,
//                 use: 'ts-loader',
//                 exclude: /node_modules/,
//                 //include: path.join(__dirname, 'assets')
//             }
//         ]
//     },
//     watchOptions: {
//         ignored: '/node_modules/',
//     },
//     resolve: {
//         extensions: ['.tsx', '.ts', '.js', '.less', '.css'],
//     },
//     stats: 'verbose',
// };
