# guard

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



项目搭建 ：
            环境：   node v10.7.0
                         vue-cli v2.96
         项目启动：npm start

       自适应方案： 阿里可伸缩布局方案 lib-flexible   参考文档 https://blog.csdn.net/weixin_41257563/article/details/97266234
                           utils.js  设置标准屏幕宽度   const px2remLoader = {
                                                                      loader: 'px2rem-loader',
                                                                      options: {
                                                                        remUnit: 92
                                                                      }
                                                                                                }
                                      适配范围 920-1920   每次重新下载node_modules 中的lib——flexible 需重新设置 值
                                      function refreshRem () {
                                                        var width = docEl.getBoundingClientRect().width
                                                        if (width / dpr < 920) {
                                                          width = 920 * dpr
                                                        } else if (width / dpr > 1920) {
                                                          width = 1920 * dpr
                                                        }
                                                        var rem = width / 10
                                                        docEl.style.fontSize = rem + 'px'
                                                        flexible.rem = win.rem = rem
                                                      }                                                          
      css样式处理器 scss    
                      1.npm install node-sass sass-loader --save-dev
                      2.找到build中webpack.base.conf.js,在rules中添加scss规则
                             {
                                test: /\.scss$/,
                                loaders: ['style', 'css', 'sass']
                              }
                      3. 使用
                      <style lang='scss'>
                        
                        </style>
                 问题  打包报 this.getResolve is not a function  版本过高导致编译错误 
                 解决  把项目package.json文件中sass-loader版本改为7.3.1。执行命令，重新安装项目依赖
      全局引 全局变量的sass文件
                      1.npm install sass-resources-loader -d
                      2.在webpack中进行配置 参考地址
                      3，配置完成之后，重新npm run dev运行一下
                      问题：package.josn 中模块存在  node-modules文件中没有 编译报错
                      解决：cnpm updata 重新更新模块
                       