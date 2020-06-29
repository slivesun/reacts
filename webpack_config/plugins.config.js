const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pluginsConfig = [
	new HtmlWebpackPlugin({
		filename:'index.html',
		template: './index.html',
		hash:false,
		minify:{
		  removeAttributeQuotes:process.env.MODE == 'production'?true:false,//删除html的双引号
		  collapseWhitespace:process.env.MODE == 'production'?true:false,//折叠成一行
		},//html压缩
	}),
	new MiniCssExtractPlugin({
		filename: 'css/[name][hash:8].css',
		chunkFilename: 'css/[id].css',
		// ignoreOrder: false, 
	}),
	new webpack.NamedModulesPlugin(),//打印更新的模块路径
	new webpack.HotModuleReplacementPlugin(),//热更新插件
	
	// new CopyWebpackPlugin([
	//     {from:'./src/lib',to:'lib'}//输出目录默认是打包目录
	// ]),
]
if (process.env.MODE == 'production') {
	pluginsConfig.push(
		new CleanWebpackPlugin()//清除的就是打包的目录
	)
	console.log('CleanWebpackPlugin---[清除dist目录]------------>')
}
module.exports = pluginsConfig;

console.log('pluginsConfig--------[导出插件]---------------->')
