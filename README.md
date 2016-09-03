# Node同构应用开发

##开发工具
+ 开发环境：EcmaScript2015
 +  "babel"
 +  "babel-cli"
 + "babel-core"
 +  "babel-loader"
 +  "babel-plugin-transform-runtime"
 +  "babel-preset-es2015"
 +  "babel-preset-react"
 +  "babel-runtime"
+ 打包：[Webpack](http://webpack.github.io/docs/)
 +  "webpack"
 +  "webpack-dev-middleware"
 +  "webpack-dev-server"
 +  "webpack-hot-middleware"
+ 服务器：[Express](http://www.expressjs.com.cn/)
 +  "express":
 +  "express-handlebars"
 +  "express-mysql-session"
 +  "express-session"
 +  "body-parser"
+ 数据库：MySQL
+ ORM：[Sequelize](http://docs.sequelizejs.com/en/v3/)
+ 表单提交：[Multer](https://github.com/expressjs/multer)
+ 数据通信："babel-polyfill", "isomorphic-fetch"
+ 视图：React
 + "react"
 + "react-dom"
 + "react-dragula"
 + "react-router"
+ 状态容器：Redux
    "react-redux"
    "redux"
    "redux-logger"
    "redux-thunk"
    "redux-devtools"
待补充

##思路
1. 通过session来判断用户，每个用户有唯一ID标识
2. React组件化开发，选用react-datepicker,react-dragula等组件
3. 前后端同构，用户直接获得渲染好的数据
4. 用户可以增加/修改/排序/删除按日期显示的todo标签
