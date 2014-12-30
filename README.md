git操作历史 
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
- const.js [常量配置]
- config.js [配置模块路径、模板与路由与全局变量]
- config.local.js [本地配置文件， 此文件未加入到版本管理中]
- common文件夹 [功能模块，如分页、标签、属性列表、图片库等]
- doc [文档]
- images [存放图片， 样式中background:url()中的url图片地址存放到styles/default/img文件夹中， 且为相对地址]
- lib文件夹 [所有模块的父类]
- models文件夹 [所有模型类]
- modules [业务模块， 如产品管理、新闻管理、分类管理等]
- scripts [包含所有帮助类与起始脚本， 如：handlebars模板引擎帮助类]
- styles [所有样式文件]
- swf [所有flash文件 如：复制粘贴组件， 上传组件]
- vendor [所有第三方插件]
- doc [帮助文档 如：工具库each pluck clone, 框架类BaseList、BaseItem等]
- test [供测试调试用]
- dist [发布到服务器的文件夹， 合并压缩JS、css后的最终代码]

### 注意
- git一天只能提交一次， 晚上10点之前提交, 提交前先fetch抓取合并
- 各模块[必须]、方法前 标注自己的作者， 如： @author yongjin 2014.11.6
- 修改别人的代码， 请通知原作者， 禁止私自修改[可以添加方法， 注明作者]
- 功能模块完成后， 请附带demo.html
- 每星期六进行一次回归测试 (业务模块， 功能模块)

### 框架文档 详见doc文件
1) Application 容器: 管理所有的视图、模块、模板、数据、路由
 - app.addView('id', new Product()); // 向容器添加实例视图
 - app.getView('id'); // 获取实例视图
 - app.removeView('productList'); // 移除视图
 - app.addTemplate('name', function(require, exports, module){...}) //添加模板
 - app.setData('name', {}); // 添加数据
 - app.addRoute('name', function(){}); // 添加路由
 - app.addModule('ProductList', 'modules/product/controllers/ProductList.js'); // 添加模块
 - app.addDialog(dialog({})); // 所有对话框统一管理， 页面切换时需移除所有对话框 app.emptyDialog();
 
 ### 常见问题
1) 模型类保存不了， 谷歌提示"canceled" 错误码 -3  
 - 对话框突然关闭
2) dialog未执行close().remove()却意外关闭
 - 自定义按钮callback方法中是否有return false;语句
 
 
### handlebars
1) 获取索引
{{#each array}}
    {{@index}}: {{this}}
{{/each}}

2) 获取key
For object iteration, use @key instead:
{{#each object}}
    {{@key}}: {{this}}
{{/each}} 
3) 获取根目录
{{@root.level1_2}}
