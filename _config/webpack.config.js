const path = require( 'path' );
const webpack = require( "webpack" );
const ExtractTextPlugin = require( "extract-text-webpack-plugin" );
const BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' );
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
const VueLoaderPlugin = require( 'vue-loader/lib/plugin' );


const CONFIG = {
    PROJECT : path.resolve( __dirname, '../' ),
    PUBLIC : path.resolve( __dirname, '../public' ),
    DIST : path.resolve( __dirname, '../public/assets' ),
    SRC : path.resolve( __dirname, '../src' ),
    BrowserSync : {
        proxy : 'vue-to-php-mailer.env',
        port : 2222,
        notify : false,
        open : false
    }
};

module.exports = env => {
    const PRODUCTION = JSON.stringify( process.env.NODE_ENV === "production" );

    // js
    // --------------------------------------------------
    const jsBuildConfig = {
        context : CONFIG.SRC,
        entry : require( __dirname + '/entries' ),
        output : {
            path : CONFIG.DIST + '/js/',
            filename : '[name].bundle.js'
        },
        resolve : {
            alias : {
                'vue$' : 'vue/dist/vue.common.js',
                '@' : path.join( __dirname, '../src/js/vue/' ),
                '@store' : path.join( __dirname, '../src/js/vue/store/index.js' ),
                'js' : path.join( __dirname, '../src/js/' ),
                'utility' : path.join( __dirname, '../src/js/utils/Utility.js' ),
                'TweenLite' : 'gsap/src/uncompressed/TweenLite',
            }
        },
        module : {
            rules : [
                {
                    test : /\.vue$/,
                    loader : 'vue-loader',
                    options : {

                        loaders : {
                            // sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                            js : {
                                loader : 'babel-loader',
                                options : {
                                    presets : [ 'es2015' ]
                                }
                            },
                        }
                    }
                }, {
                    test : /\.js$/,
                    include : CONFIG.SRC + '/js',
                    use : [ {
                        loader : 'babel-loader',
                        options : {
                            presets : [
                                [ 'es2015', { modules : false } ]
                            ]
                        }
                    } ]
                }, {
                    test : /\.(glsl|vs|fs)$/,
                    include : CONFIG.SRC + '/js',
                    use : [ {
                        loader : 'shader-loader'
                    } ]
                }, {
                    test : /\.(png|jpg|gif)$/,
                    use : [
                        {
                            loader : 'url-loader',
                            options : {
                                // limit: 8192
                            }
                        }
                    ]
                }, {
                    test : /\.css$/,
                    use : [
                        'vue-style-loader',
                        'css-loader'
                    ]
                }
            ]
        },
        plugins : [
            new VueLoaderPlugin(),
            new webpack.ProvidePlugin( {
                '$' : 'jquery',
                'jquery' : 'jquery',
                'window.jQuery' : 'jquery',
                'TweenLite' : 'gsap/src/uncompressed/TweenLite',
            } ),
            new webpack.DefinePlugin( {
                'process.env.NODE_ENV' : JSON.stringify( process.env.NODE_ENV ),
                'process.env.TIME_STAMP' : JSON.stringify( Date.now() ),
                'PRODUCTION' : PRODUCTION,
            } ),
            new UglifyJsPlugin( {
                sourceMap : !PRODUCTION,
                uglifyOptions : {
                    warnings : false
                }
            } ),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin()
        ],
        optimization : {
            splitChunks : {
                cacheGroups : {
                    vendor : {
                        test : /node_modules/,
                        name : 'vendor',
                        chunks : 'initial',
                        enforce : true
                    }
                }
            }
        },
        devtool : PRODUCTION ? '' : 'source-map'
    };

    return [ jsBuildConfig ];
};