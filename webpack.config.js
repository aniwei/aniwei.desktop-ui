var path = require('path')

module.exports = {
    entry: './src/app.jsx',
    output: {
        path: './static/js/',
        filename: 'app.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
          {
            loader: 'babel-loader',   //加载babel模块
            include:[
                path.resolve(__dirname,'src'),
            ],
            exclude:[
                path.resolve(__dirname,'node_module')
            ],
            test:/\.jsx$/,
            query:{
                presets:['es2015','stage-0','react']
            }
          }
        ]
    }
}
