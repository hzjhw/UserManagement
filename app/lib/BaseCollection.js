define("BaseCollection",["jquery","underscore","backbone"],function(t,i,e){var n,o,a;n=t("backbone"),a=n.Model.extend({defaults:{page:1,pageSize:16,count:0},initialize:function(){debug("3.PaginationModel.initialize")}}),o=n.Collection.extend({constructor:function(t){this.options=t||{},n.Collection.apply(this,[null,arguments])},_initialize:function(){debug("2.BaseCollection._initialize"),this._baseUrl=this.url,this.paginationModel||(this.paginationModel=new a({page:this.options.page,pageSize:this.options.pageSize}))},parse:function(t){var i=this;return Est.isEmpty(t)?(debug(function(){var t="function"===Est.typeOf(i.url)?i.url():i.url;return"服务器返回的数据为空， 点击"+t+"是否返回数据？无？ 检查XxxCollection中的url参数是否配置正确？"},{type:"error"}),[]):(this._parsePagination(t),this._parseUrl(this.paginationModel),this.options.pagination&&this.paginationModel&&this._paginationRender(),t.attributes.data)},_parseUrl:function(t){debug("- BaseCollection._parseUrl");var i=1,e=16;if(t&&t.get("pageSize")&&(e=t.get("pageSize"),i=t.get("page")),this.options.subRender&&(i=1,e=9e3),"function"!=typeof this.url){var n="";Est.isEmpty(this._itemId)||(n="/"+this._itemId),this.url=this._baseUrl+n+"?page="+i+"&pageSize="+e}},_parsePagination:function(t){debug("6.BaseCollection._parsePagination"),t.attributes=t.attributes||{page:1,per_page:10,count:10},this.paginationModel&&(this.paginationModel.set("page",t.attributes.page),this.paginationModel.set("pageSize",t.attributes.per_page),this.paginationModel.set("count",t.attributes.count))},_paginationRender:function(){var t=this;seajs.use(["Pagination"],function(i){t.pagination?t.pagination.render():t.pagination=new i({el:"#pagination-container",model:t.paginationModel})})},_load:function(t,i,e){return debug("4.BaseCollection._load"),this._parseUrl(e),t.fetch({success:function(){debug("5.collection reset"),i.collection._reset(),i._empty()}})},_setItemId:function(t){this._itemId=t,debug("- 根据ID查列表"+this._itemId)},_empty:function(){if(debug("BaseCollection._empty"),this.collection)for(var t=this.collection.length;t>-1;)this.collection.remove(this.collection[t]),t--}}),e.exports=o});