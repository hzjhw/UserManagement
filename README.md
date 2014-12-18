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
- main.js [配置模块路径、模板与路由与全局变量]
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

### 框架文档
1) Application 容器: 管理所有的视图、模块、模板、数据、路由
 - app.addView('id', new Product()); // 向容器添加实例视图
 - app.getView('id'); // 获取实例视图
 - app.addTemplate('name', function(require, exports, module){...}) //添加模板
 - app.setData('name', {}); // 添加数据
 - app.addRoute('name', function(){}); // 添加路由
 - app.addModule('ProductList', 'modules/product/controllers/ProductList.js'); // 添加模块
 
2) BaseView 普通视图
 - el: 目标元素Id 如 "#jhw-main"
 - initialize 实现父类_initialize
   参数：{
        viewId: 'productList'
        template: 字符串模板，
        data: 对象数据
        enterRender: (可选) 执行回车后的按钮点击的元素选择符 如 #submit .btn-search
   }
 - render 实现父类_render
 - 使用：
    var panel = new Panel();
          panel.on('after', function(){ // 视图渲染后回调方法， 相应有个before方法
            this.albumList = app.addView('albumList', new AlbumList());
            this.photoList = app.addView('photoList', new PhotoList());
          });
          panel.render(); // 渲染

3) BaseModel [模型类]
 - initialize 实现父类_initialize
 - defaults (可选) 默认值  如 Est.extend({}, BaseModel.prototype.defaults);
 - baseId (可选) ID标识符 如 productId
 - baseUrl (可选) 服务器交互地址
 - validate (可选) 当需要实现单个字段保存时， 需要调用父类_validation, 参照ProductModel

4) BaseCollection [集合]
 - url 获取列表地址， 值可为方法，返回地址
 - batchDel: 批量删除url
 - model 模型类
 - initialize 初始化， 实现父类 _initialize方法

5) BaseItem [单视图]
 - tagName 
 - className (可选)
 - events: {
     'click .toggle': '_toggleChecked', // 全选
     'click .edit': '_edit', // 编辑
     'click .delete': '_del', // 删除
     'click .move-up': '_moveUp', // 上移
     'click .move-down': '_moveDown', // 下移
     'change .input-sort': '_saveSort' // 保存sort 注： 当字段不为sort时， 此方法不适用， 参照AttributesList中的changeSort方法
    }
 - initialize 实现父类_initialize 
   参数: {
        viewId: 实例视图ID  如：productList
        template: 模板字符串
        detail: 修改或添加页面地址
        enterRender: (可选) 执行回车后的按钮点击的元素选择符 如 #submit .btn-search
   } 
    _onAfterRender (可选) ：渲染后执行的方法
 - render 实现父类_render

 
6) BaseList [列表视图]
 - el 目标元素Id， 如 "#jhw-main"
 - events: {
     'click #toggle-all': '_toggleAllChecked', // 选择框
     'click .btn-batch-del': '_batchDel', // 批量删除
     'click .product-add': '_detail' // 添加页面
   }
 - initialize 实现父类_initialize 
   参数：{
        template: 字符串模板, 
        render: 插入列表的元素选择符, 
        enterRender: (可选) 执行回车后的按钮点击的元素选择符 如 #submit .btn-search
        collection: 集合, 
        item: 单视图, 
        model: 模型类, 
        detail: 添加页面url地址
        checkAppend: false, // 鼠标点击checkbox， checkbox是否追加
        filter: [ {key: 'name', value: this.searchKey }] // 过滤结果
        items: [](可选， 当无需url请求时),
        // 以下为树型列表时 需要的参数(注意， 集合类继承BaseComposite)
        subRender: '.node-tree', // 下级分类的容器选择符
        collapse: '.node-collapse' 展开/收缩元素选择符
        parentId: 'belongId', // 分类 的父类ID
        categoryId: 'categoryId', // 分类 的当前ID
        parentValue: '/' // 父分类的parentId值
        extend: true // false收缩 true为展开
   }
   返回值：promise 参数为thisCtx 当前list上下文
   example1: 载入数据前执行的方法
        this._initialize({}).then(function (thisCtx) {
              if (!options._isAdd) {
                thisCtx._load({
                  beforeLoad: function (collection) { // 载入数据前执行的方法
                    collection.setItemId(options.itemId || null);
                    collection.setTagType(options.tagType || 'product');
                  }
                });
              }
            });
        return this;
   example2:
        this._initialize({
             render: '#product-list-ul',
             template: listTemp,
             model: ProductModel,
             collection: ProductCollection,
             item: ProductItem
           }).then(function (thisCtx) {
             thisCtx._initPagination(thisCtx._options);
             thisCtx._load(thisCtx._options);
           });
 - render 实现父类 _render

   
   // 重要方法
   - _setOption 设置配置
     app.getView('attributesList')._setOption({
             sortField: 'orderList'
           })._moveUp(this.model);
 
7) BaseDetail [详细页]
 - initialize 实现父类_initialize 参数：
    {
        template: 字符串模板, 
        model: 模型类
        enterRender: (可选) 执行回车后的按钮点击的元素选择符 如 #submit .btn-search
    }
 - render 实现父类 _render 
   > this._form('#J_Form')._validate()._init({
        onBeforeSave: function(){
            // 处理特殊字段
            this.model.set('taglist', Est.map(ctx.tagInstance.collection.models, function (item) {
                 return item.get('name');
            }).join(','));
        },
        onAfterSave: function(response){
        }
    })
    // 添加远程验证
    this._form('#J_Form')._validate({
        url: CONST.API + '/user/validate',
        fields: ['vali-username', 'vali-email'] // 注意， 字段前加vali-
    })._init({});
    
8) BaseComposite [树]


