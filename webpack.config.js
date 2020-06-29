
const path = require('path')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin  = require('uglifyjs-webpack-plugin')
const {MODE} = process.env;
let IsDevelopment = MODE === 'development';//development是true,不是开发false
console.log(MODE,'MODE------>')
const Config = require('./webpack_config/dev.config')
const moduleConfig = require('./webpack_config/module.config')
const pluginsConfig = require('./webpack_config/plugins.config')

module.exports = {
    mode:MODE,
    devtool:IsDevelopment?'source-map':'cheap-module-source-map',//增加映射文件，可以帮我们调试源码，出错了会报出错的列和行
    entry: {
        index:'./src/index.js',
        // login:'./login.js',
    },  // 入口文件,多入口配置
    output: {
        filename:IsDevelopment?'js/[name].js':'js/[name][hash:8].min.js',
        path: path.resolve(__dirname, "front"),
        chunkFilename: "js/[name].[hash:8].js",
        publicPath: '/',//公共路径，每个文件引入前都会加./
    },  // 打包出口文件
    resolve:{
        extensions: ['.js'],//从左向右找，添加后缀
        alias:{
            '@assets': path.resolve(__dirname, "src/assets"),
            '@components':path.resolve(__dirname, "src/components"),
            '@http':path.resolve(__dirname, "src/http_request"),
            '@pages':path.resolve(__dirname, "src/pages"),
            '@public': path.resolve(__dirname, "src/public"),
            '@router':path.resolve(__dirname, "src/router"),
            '@store':path.resolve(__dirname, "src/store"),
        }
    },
    module: moduleConfig,    // 处理对应模块
    plugins: pluginsConfig,  // 对应的插件
    devServer: {
        port:Config.port,
        host:Config.ip,
        proxy: Config.proxy.map(item => (
            {
            context: item.path,
            target: item.target,
            changeOrigin: true,
            secure: false
            }
        )),
        contentBase: path.join(__dirname, 'front'), //服务器根路径
        compress: true, // 服务端压缩
        disableHostCheck:IsDevelopment?true:false,
        hot: true,
        // inline: false,
        historyApiFallback: true,//不添加这个路由刷新会没页面
    },  // 开发服务器配置
    optimization: {//优化项
        minimizer:[//压缩的
            new UglifyJsPlugin({
                cache: true,//是否应用缓存
                parallel: true,//是否并发，一起打包多个
                sourceMap:true,//源码映射，为了更好的调试
            }),
            new OptimizeCssAssetsPlugin()
        ],
        splitChunks:{//分割代码块
            cacheGroups:{//缓存组
                common:{//公共的模块
                    chunks:'initial',//从入口处开始
                    minSize:0,
                    minChunks:2,//只要引用2次以上就抽离
                },
                vendor:{
                    priority:1,//提高权重，先把第三方模块抽离出来，在去抽离公共代码（common），如果不设置的话，common抽离完了，就不再执行vendor抽离。
                    test:/node_modules/,//把你抽离出来
                    chunks:'initial',//从入口处开始
                    minSize:0,
                    minChunks:2,//只要引用2次以上就抽离
                }
            }
        }
    }
  }