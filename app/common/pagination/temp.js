/**
 * @description temp
 * @namespace temp
 * @author yongjin on 2014/11/6
 */
/**
 * @description PaginationView
 * @namespace PaginationView
 * @author yongjin on 2014/11/6
 */
define('PaginationView', ['jquery', 'underscore', 'backbone'], function(require, exports, module){
    var Backbone = require('backbone');
    var _ = require('underscore');

    //分页模板
    var PaginationView = Backbone.View.extend({
        initialize:function(){
            _.bindAll(this,'toFirstPage');
            _.bindAll(this,'toPrevPage');
            _.bindAll(this,'toNextPage');
            _.bindAll(this,'toLastPage');
            _.bindAll(this,'refreshCurrentPage');
            _.bindAll(this,'keyPressOfToPageInput');
        },
        tagName:"div",
        template: _.template(document.getElementById('pagination-template').innerHTML),
        render:function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        events:{"click .firstPage":"toFirstPage",
            "click .prevPage":"toPrevPage",
            "click .nextPage":"toNextPage",
            "click .lastPage":"toLastPage",
            "click .refreshCurrentPage":"refreshCurrentPage",
            "keypress .toPageOfRefObject":"keyPressOfToPageInput",
            "change .pagesizeOfRefObject":"resizePagesize"
        },

        toFirstPage:function(e){
            var refObject=$(e.target.parentNode.parentNode).attr("refObject"); //ul的refObject
            this.loadPages(1,refObject);
        },
        toPrevPage:function(e){
            var refObject=$(e.target.parentNode.parentNode).attr("refObject"); //ul的refObject
            var currentPage=parseInt($(e.target.parentNode.parentNode).attr("currentPage"));
            var toPage=currentPage-1;
            this.loadPages(toPage,refObject);
        },
        toNextPage:function(e){
            var refObject=$(e.target.parentNode.parentNode).attr("refObject"); //ul的refObject
            var currentPage=parseInt($(e.target.parentNode.parentNode).attr("currentPage"));
            var toPage=currentPage+1;
            this.loadPages(toPage,refObject);
        },
        toLastPage:function(e){
            var refObject=$(e.target.parentNode.parentNode).attr("refObject"); //ul的refObject
            var totalPages=parseInt($("#totalPagesOf"+refObject).html());
            this.loadPages(totalPages,refObject);
        },
        refreshCurrentPage:function(e){
            var refObject=$(e.target.parentNode.parentNode).attr("refObject"); //ul的refObject
            var currentPage=parseInt($(e.target.parentNode.parentNode).attr("currentPage"));
            this.loadPages(currentPage,refObject);
        },
        keyPressOfToPageInput:function(e){
            if(e.keyCode==13){
                var refObject=$(e.target.parentNode.parentNode.parentNode).attr("refObject"); //ul的refObject
                console.log(refObject);
                var toPage=$("#toPageOf"+refObject).val();
                console.log(toPage);
                this.loadPages(toPage,refObject);
            }
        },
        resizePagesize:function(e){
            var refObject=$(e.target).attr("id").substr(10);
            this.loadPages(1,refObject);
        },

        loadPages:function(toPage,refObject){
            debugger
            var totalPages = parseInt($("#totalPagesOf"+refObject).html());
            var toItems = parseInt($("#totalItemsOf"+refObject).html());
            if(! /^[0-9]{1,}$/.test(toPage) || toPage<1){
                toPage=1;
            }
            if(toPage>totalPages){
                toPage=totalPages;
            }
            $("#toPageOf"+refObject).val(toPage);
            var refObjectLower=refObject.substr(0,1).toLowerCase()+ refObject.substr(1,refObject.length-1);
            var pagesize=$("#pagesizeOf"+refObject).val();
            if(pagesize==null){
                pagesize=5;
            }else{
                pagesize=parseInt($("#pagesizeOf"+refObject).val());
            }
            this.remove();
            //触发页面重载事件，重装请求服务器上的数据
            //eventAcrossView.trigger(refObjectLower+'ReloadPage', {pageId:toPage,pagesize:pagesize});
        }
    });

    module.exports = PaginationView;

});
