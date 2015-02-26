机汇网
====

### 服务端API文档 - 数据接口
- 192.168.1.99:8001/jihui88/

### BUI组件 - UI组件
- http://builive.com/scaffolding/index.php

### Backbone API文档 - MVC框架
- http://backbonejs.org/

### Backbone.ModelBinder API文档 - 模型绑定
- https://github.com/theironcook/Backbone.ModelBinder

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
- 更新之前必须先stash自己的内容， 为了减少git逻辑错误
- 若抓取合并失败， 先stash自己的内容[命令git stash]， 然后执行[git merge jhw], 然后再unstash自己的[命令git stash pop]
- 清空stash[git stash clear]

### 架构目录
- const.js [常量配置]
- config.js [配置模块路径、模板与路由与全局变量]
- config.local.js [本地配置文件， 此文件未加入到版本管理中]
- common文件夹 [功能模块，如分页、标签、属性列表、图片库、地区级联等]
- doc [文档]
- images [存放图片， 样式中background:url()中的url图片地址存放到styles/default/img文件夹中， 且为相对地址]
- lib文件夹 [backbone核心组件]
- models文件夹 [所有模型类]
- modules [业务模块， 如产品管理、新闻管理、分类管理等]
- scripts [包含所有帮助类与基础脚本， 如：handlebars模板引擎帮助类、BaseUtils工具类]
- styles [所有样式文件]
- swf [所有flash文件 如：复制粘贴组件， 上传组件]
- vendor [所有第三方插件]
- doc [帮助文档 如：工具库each pluck clone, 核心类BaseList、BaseItem等]
- test [供测试调试用]
- dist [发布到服务器的文件夹， 合并压缩JS、css后的最终代码]

### 注意
- git一天只能提交一次， 晚上10点之前提交, 提交前先fetch抓取合并
- 各模块[必须]、方法前 标注自己的作者， 如： @author yongjin 2014.11.6
- 修改别人的代码， 请通知原作者， 禁止私自修改[可以添加方法， 注明作者]
- 功能模块完成后， 请附带demo.html
- 每星期六进行一次回归测试 (业务模块， 功能模块)

### 框架文档 详见doc文件
 
### 常见问题
1) 模型类保存不了， 谷歌提示"canceled" 错误码 -3  
 - 对话框突然关闭
2) dialog未执行close().remove()却意外关闭
 - 自定义按钮callback方法中是否有return false;语句
3) ie7或8中打开对话框跳转到首页
 - 在oniframeload方法中是否加入 delete app.getRoutes()['index'];
4) git无法修改文件名称
 - git mv --force app/modules/member/management/message/model/messageSendModel.js  app/modules/member/management/message/model/MessageSendModel.js 
5) iframedialog打开时提示未找到el选择符
 - 在详细页面里 新var detailApp = new Application();
6) 图片保存不了
 - 初始化PicturePick时 检查是否attId未配置， 若不需要ID时， 可以随便取个值如001
7) 添加图片后无后续图片
 - 需添加app.addView('');
8) 加载文件404
 - 检查config.local.js是否引入
 
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

### promise示例
// 添加标签
add: function (e) {
  var ctx = this;
  if (e.keyCode === CONST.ENTER_KEY) {
    var name = this.$input.val();
    // promise入口 判断是否存在标签列表并初始化列表， 然后返回tagId。 核心用于获取tagId， 并调用insert方法
    this.initTagList(name).then(function (tagId) {
       ctx.insert(name, tagId);
    });
  }
},
// 初始化标签
initTagList: function (name) {
    var ctx = this;
    return new Est.promise(function (resolve, reject) {
        // 用于判断是否存在tagList, 分别作相应处理
        if (!ctx.tagList) {
            ctx.getTagList(function (collection) { // 用于获取标签列表
                resolve(ctx.findTagIdByName(collection.models, name));
            });
        } else {
            // 若存在tagList, 直接调用现存的标签列表
            resolve(ctx.findTagIdByName(ctx.tagList.collection.models, name));
        }
    });
},
// 获取标签列表
getTagList: function (callback) {
    var opts = Est.cloneDeep(this.options);
    opts.el = null;
    opts.afterLoad = callback;
    this.tagList = new TagList(opts);
},
// 获取标签Id
findTagIdByName: function (models, name) {
    var index = Est.findIndex(models, function (model) {
      return model.get('name') === name;
    });
    if (index !== -1) {
      return this.tagList.collection.models[index].get('tagId');
    }
}
