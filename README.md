操作历史 
====

### 服务端API文档 - 数据接口
- 192.168.1.99:8001/jihui88/

### BUI组件 - UI组件
- http://builive.com/scaffolding/index.php

### Backbone API文档 - MVC框架
- http://backbonejs.org/

### seajs API文档 - 模块加载
- http://seajs.org/docs/#docs

### artDialog API文档 - 对话框
- http://aui.github.io/artDialog/doc/index.html

### handlebars API文档 - 模板引擎
- http://handlebarsjs.com/

### jquery API文档 - DOM选择器
- http://oscarotero.com/jquery/

### git API文档 - 项目管理
- http://git-scm.com/book/zh/v1
- 抓取并合并 ：git fetch origin master:jhw -> git merge jhw
- 提交 ：git add . -> git commit -m "wyj" -> git push origin

- 若抓取合并失败， 先stash自己的内容[命令git stash]， 然后执行[git merge jhw], 然后再unstash自己的[命令git stash pop]
- 清空stash[git stash clear]

### 说明
- config.js [配置模块路径、模板与路由与全局变量]
- base文件夹 [所有模块的父类]
- common文件夹 [功能模块，如分页、标签、属性列表、图片库等]
- models文件夹 [所有模型类]
- modules [业务模块， 如产品管理、新闻管理、分类管理等]
- scripts [包含所有帮助类与起始脚本， 如：handlebars模板引擎帮助类]
- styles [所有样式文件]
- swf [所有flash文件 如：复制粘贴组件， 上传组件]
- vendor [所有第三方插件]
- doc [前端工具类库帮助文档 如：each pluck clone等]
- test [供测试调试用]
- dist [发布到服务器的文件夹， 合并压缩JS、css后的最终代码]

### 注意
- git一天只能提交一次， 晚上10点之前提交, 提交前先fetch抓取合并
- 各模块[必须]、方法前 标注自己的作者， 如： @author yongjin 2014.11.6
- 修改别人的代码， 请通知原作者， 禁止私自修改[可以添加方法， 注明作者]
- 功能模块完成后， 请附带demo.html

### 框架文档
1) BaseModel [模型类]
 - defaults 默认值
 - baseId ID标识符 如productId
 - baseUrl 服务器交互地址
 - initialize 实现父类_initialize
 - validate (可选) 当需要实现单个字段保存时， 需要调用父类_validation, 参照ProductModel

2) BaseCollection [集合]
 - url 获取列表地址， 值可为方法，返回地址
 - model 模型类
 - initialize 初始化， 实现父类 _initialize方法

3) BaseItem [单视图]
 - tagName 
 - className (可选)
 - initialize 实现父类_initialize 参数: {template: 模板字符串} _onAfterRender (可选) ：渲染后执行的方法
 - render 实现父类_render
 
4) BaseList [列表视图]
 - el 目标元素Id 当前项目为"#jhw-main"
 - initialize 实现父类_initialize 
   参数：{template: 字符串模板, render: 插入列表的元素选择符, collection: 集合, item: 单视图, model: 模型类}
   返回值：promise 参数为context
 - render 实现父类 _render
 
5) BaseDetail [详细页]
 - initialize 实现父类_initialize 参数：{template: 字符串模板, model: 模型类}
 - render 实现父类 _render this._form('#J_Form')._validate()._init(function () {})