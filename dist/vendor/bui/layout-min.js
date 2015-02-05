/**
 * @fileOverview \u5e03\u5c40\u6a21\u5757\u7684\u5165\u53e3\u6587\u4ef6
 * @ignore
 */(function(){var e="bui/layout/";define("bui/layout",["bui/common",e+"abstract",e+"absolute",e+"anchor",e+"flow",e+"columns",e+"table",e+"border",e+"accordion",e+"viewport"],function(t){var n=t("bui/common"),r=n.namespace("Layout");return n.mix(r,{Abstract:t(e+"abstract"),Anchor:t(e+"anchor"),Flow:t(e+"flow"),Absolute:t(e+"absolute"),Columns:t(e+"columns"),Table:t(e+"table"),Border:t(e+"border"),Accordion:t(e+"accordion"),Viewport:t(e+"viewport")}),r})})(),define("bui/layout/abstract",["bui/common","bui/layout/baseitem"],function(e){var t=e("bui/common"),n=e("bui/layout/baseitem"),r=function(e){r.superclass.constructor.call(this,e)};return t.extend(r,t.Base),r.ATTRS={itemConstructor:{value:n},control:{},layoutEvents:{value:["afterWidthChange","afterHeightChange"]},items:{},elCls:{},defaultCfg:{value:{}},wraperCls:{},container:{},tpl:{},itemTpl:{value:"<div></div>"}},t.augment(r,{initializer:function(e){var t=this;t.set("control",e)},renderUI:function(){this._initWraper(),this.initItems()},bindUI:function(){var e=this,t=e.get("control"),n=e.get("layoutEvents").join(" ");t.on("afterAddChild",function(t){var n=t.child;e.addItem(n)}),t.on("afterRemoveChild",function(t){e.removeItem(t.child)}),t.on(n,function(){e.resetLayout()}),e.appendEvent(t)},appendEvent:function(e){},_initWraper:function(){var e=this,t=e.get("control"),n=t.get("view").get("contentEl"),r,i=e.get("elCls"),s=e.get("tpl");s?r=$(s).appendTo(n):r=n,i&&r.addClass(i),e.set("container",r),e.afterWraper()},afterWraper:function(){},getItemByElement:function(e){return this.getItemBy(function(t){return $.contains(t.get("el")[0],e[0])})},getItemContainer:function(e){return this.get("container")},initItems:function(){var e=this,t=e.get("control"),n=[],r=t.get("children");e.set("items",n);for(var i=0;i<r.length;i++)e.addItem(r[i]);e.afterInitItems()},afterInitItems:function(){},getNextItem:function(e){var t=this,n=t.getItemIndex(e),r=t.getCount(),i=(n+1)%r;return t.getItemAt(i)},getItemCfg:function(e){var n=this,r=n.get("defaultCfg"),i=t.mix({},r,{control:e,tpl:n.get("itemTpl"),layout:n,wraperCls:n.get("wraperCls")},e.get("layout"));return i.container=n.getItemContainer(i),i},initItem:function(e){var t=this,n=t.get("itemConstructor"),r=t.getItemCfg(e);return new n(r)},addItem:function(e){var t=this,n=t.getItems(),r=t.initItem(e);return n.push(r),r},removeItem:function(e){var n=this,r=n.getItems(),i=n.getItem(e);i&&(i.destroy(),t.Array.remove(r,i))},getItemBy:function(e){var n=this,r=n.getItems(),i=null;return t.each(r,function(t){if(e(t))return i=t,!1}),i},getItemsBy:function(e){var n=this,r=n.getItems(),i=[];return t.each(r,function(t){e(t)&&i.push(t)}),i},getItem:function(e){return this.getItemBy(function(t){return t.get("control")==e})},getCount:function(){return this.getItems().length},getItemAt:function(e){return this.getItems()[e]},getItemIndex:function(e){var n=this.getItems();return t.Array.indexOf(e,n)},getItems:function(){return this.get("items")},resetLayout:function(){var e=this,n=e.getItems();t.each(n,function(e){e.syncItem()})},clearLayout:function(){var e=this,n=e.getItems();t.each(n,function(e){e.destroy()})},reset:function(){this.resetLayout()},destroy:function(){var e=this;e.clearLayout(),e.off(),e.clearAttrVals()}}),r}),define("bui/layout/collapsable",["bui/common"],function(e){var t=e("bui/common"),n=function(){};return n.ATTRS={triggerCls:{},duration:{value:400},accordion:{value:!1}},t.augment(n,{bindCollapseEvent:function(){var e=this,t=e.get("triggerCls"),n=e.get("container");n.delegate("."+t,"click",function(t){var n=$(t.currentTarget),r=e.getItemByElement(n);e.toggleCollapse(r)})},getExpandedItem:function(){return this.getItemBy(function(e){return!e.get("collapsed")})},expandItem:function(e){var t=this,n=t.get("duration"),r=t.getCollapsedRange(e),i;e.get("collapsed")&&(t.get("accordion")&&(i=t.getExpandedItem(),i&&(t.beforeCollapsed(i,r),i.collapse(n,function(){t.afterCollapsed(i)}))),t.beforeExpanded(e,r),e.expand(r,n,function(){t.afterExpanded(e)}))},afterExpanded:function(e){},beforeExpanded:function(e,t){},collapseItem:function(e){var t=this,n=t.get("duration"),r=t.getCollapsedRange(e),i;e.get("collapsed")||(t.get("accordion")&&(i=t.getNextItem(e),t.beforeExpanded(i,r),i.expand(r,n,function(){t.afterExpanded(i)})),t.beforeCollapsed(e,r),e.collapse(n,function(){t.afterCollapsed(e)}))},beforeCollapsed:function(e,t){},afterCollapsed:function(e){},getCollapsedRange:function(e){},toggleCollapse:function(e){var t=this;e.get("collapsed")?t.expandItem(e):t.collapseItem(e)}}),n}),define("bui/layout/absolute",["bui/common","bui/layout/abstract","bui/layout/absoluteitem"],function(e){var t="x-layout-relative",n=e("bui/common"),r=e("bui/layout/abstract"),i=e("bui/layout/absoluteitem"),s=function(e){s.superclass.constructor.call(this,e)};return s.ATTRS={itemConstructor:{value:i},elCls:{value:t},tpl:{},itemTpl:{value:'<div class="x-layout-item-absolute"></div>'}},n.extend(s,r),s}),define("bui/layout/anchor",["bui/common","bui/layout/abstract","bui/layout/anchoritem"],function(e){var t=e("bui/common"),n=e("bui/layout/abstract"),r=e("bui/layout/anchoritem"),i=function(e){i.superclass.constructor.call(this,e)};return i.ATTRS={itemConstructor:{value:r},itemTpl:{value:'<div class="x-layout-item"></div>'}},t.extend(i,n),i}),define("bui/layout/columns",["bui/common","bui/layout/abstract"],function(e){function r(e){return e*100+"%"}var t=e("bui/common"),n=e("bui/layout/abstract"),i=function(e){i.superclass.constructor.call(this,e)};return i.ATTRS={columns:{value:1},columnTpl:{value:'<div class="x-layout-column"></div>'},tpl:{value:'<div class="x-layout-columns"></div>'},itemTpl:{value:'<div class="x-layout-item-column"></div>'}},t.extend(i,n),t.augment(i,{resetLayout:function(){var e=this;e._setColumnsWidth(),i.superclass.resetLayout.call(e)},moveItem:function(e,t){var n=this,r;if(t>=n.get("columns")||t<0)return;e.set("col",t),r=n.getItemContainer({col:t}),e.set("container",r),e.get("el").appendTo(r)},afterWraper:function(){var e=this,t=e.get("columns"),n=e.get("container"),r=[];for(var i=0;i<t;i++)r.push(e.get("columnTpl"));n.html(r.join("")),e._setColumnsWidth()},_setColumnsWidth:function(){var e=this,n=e.get("container"),r=n.children(),i=n.width(),s=parseInt(i/r.length,10),o=0;t.each(r,function(e){var t=$(e),n=t.outerWidth()-t.width();t.width(s-n)})},getItemContainer:function(e){var t=this,n=t.get("items"),r=t.get("columns"),i=this.get("container");return e.col===undefined&&(e.col=n.length%r),$(i.find(".x-layout-column")[e.col])}}),i}),define("bui/layout/flow",["bui/common","bui/layout/abstract","bui/layout/baseitem"],function(e){var t=e("bui/common"),n=e("bui/layout/abstract"),r=e("bui/layout/baseitem"),i=function(e){i.superclass.constructor.call(this,e)};return i.ATTRS={itemConstructor:{value:r},itemTpl:{value:'<div class="x-layout-item-flow pull-left"></div>'}},t.extend(i,n),i}),define("bui/layout/table",["bui/common","bui/layout/abstract","bui/layout/cellitem"],function(e){var t=e("bui/common"),n=e("bui/layout/abstract"),r=e("bui/layout/cellitem"),i=function(e){i.superclass.constructor.call(this,e)};return i.ATTRS={itemConstructor:{value:r},lastRow:{value:0},tpl:{value:'<table class="x-layout-table"><tbody></tbody></table>'},defaultCfg:{value:{fit:"both"}},columns:{},rows:{},itemTpl:{value:'<td class="x-layout-item-cell"></td>'}},t.extend(i,n),t.augment(i,{afterWraper:function(){var e=this,t=e.get("rows"),n=e.get("container"),r=[];for(var i=0;i<t;i++)r.push("<tr></tr>");n.find("tbody").html(r.join(""))},getItemContainer:function(e){var t=this,n=this.get("container");return $(n.find("tr")[e.row])},_getItemAppend:function(){var e=this,t=e.get("appendHeight");if(t==null){var n=e.getItemAt(0),r;n&&(t={},r=n.get("el"),t.width=r.outerHeight()-r.height(),t.height=r.outerWidth()-r.width(),e.set("append",t))}return t||{width:0,height:0}},_getCellAvg:function(){var e=this,t=e.get("control"),n=e.get("rows"),r=t.get("height"),i=t.get("width"),s=e._getItemAppend(),o=(r-s.height*n)/n,u=(i-s.width*n)/n;return{append:s,avgHeight:o,avgWidth:u}},_getItemDime:function(e,t){var n=this,r=n._getCellAvg();return e=e||1,t=t||1,{height:r.avgHeight*e+(e-1)*r.append.height,width:r.avgWidth*t+(t-1)*r.append.width}},resetLayout:function(){var e=this,n=e.getItems();t.each(n,function(t){var n=e._getItemDime(t.get("rowspan"),t.get("colspan"));t.set(n)}),i.superclass.resetLayout.call(this)},afterInitItems:function(){this.resetLayout()}}),i}),define("bui/layout/border",["bui/common","bui/layout/abstract","bui/layout/borderitem","bui/layout/collapsable"],function(e){var t=e("bui/common"),n=e("bui/layout/abstract"),r=e("bui/layout/borderitem"),i=e("bui/layout/collapsable"),s="x-border-top",o="x-border-middle",u="x-border-bottom",a=r.REGINS,f=function(e){f.superclass.constructor.call(this,e)};return f.ATTRS={layoutEvents:{value:["afterAddChild","afterRemoveChild"]},itemConstructor:{value:r},wraperCls:{value:"x-border-body"},duration:{value:200},triggerCls:{value:"x-collapsed-btn"},tpl:{value:'<div class="x-layout-border">					<div class="'+s+'"></div>					<div class="'+o+'"></div>					<div class="'+u+'"></div>				</div>'},itemTpl:{value:'<div class="x-border-{region} x-layout-item-border"><div class="x-border-body"></div></div>'}},t.extend(f,n),t.mixin(f,[i]),t.augment(f,{appendEvent:function(){this.bindCollapseEvent()},afterWraper:function(){var e=this,t=e.get("container"),n=t.find("."+s),r=t.find("."+o),i=t.find("."+u);e.set("topEl",n),e.set("middleEl",r),e.set("bottomEl",i)},afterInitItems:function(){this._setMiddleDimension()},_setMiddleDimension:function(){var e=this,t=e.get("middleEl"),n=e._getMiddleHeight(),r=e._getMiddleLeft(),i=e._getMiddleRight(),s=e.get("items"),o=e.getItemsByRegion("center")[0];t.height(n);if(o){var u=o.get("el");u.css({marginLeft:r,marginRight:i})}e._fitMiddleControl()},_fitMiddleControl:function(){var e=this,n=e.getItems();t.each(n,function(e){var t=e.get("region");(t==a.EAST||t==a.WEST||t==a.CENTER)&&e.syncFit()})},_getMiddleHeight:function(){var e=this,t=e.get("container"),n=t.height(),r=e.get("middleEl"),i=e.get("topEl"),s,o;return i.children().length?o=n-i.outerHeight()-e.get("bottomEl").outerHeight():o=n-e.get("bottomEl").outerHeight(),s=r.outerHeight()-r.height(),o-s},getItemsByRegion:function(e){return this.getItemsBy(function(t){return t.get("region")===e})},_getMiddleLeft:function(){var e=this,n=e.getItemsByRegion("west"),r=0;return t.each(n,function(e){r+=e.get("el").outerWidth()}),r},_getMiddleRight:function(){var e=this,n=e.getItemsByRegion("east"),r=0;return t.each(n,function(e){r+=e.get("el").outerWidth()}),r},getItemContainer:function(e){var t=this,n;switch(e.region){case a.NORTH:n=t.get("topEl");break;case a.SOUTH:n=t.get("bottomEl");break;default:n=t.get("middleEl")}return n},beforeExpanded:function(e,t){this.beforeCollapsedChange(e,t,!1)},beforeCollapsedChange:function(e,t,n){var r=this,i=e.getCollapseProperty(),s=n?1:-1,o=r.get("duration");i=="height"?r._setMiddleHeight(t*s,o):r._setCenterWidth(e.get("region"),t*s*-1,o)},_setMiddleHeight:function(e,t){var n=this,r=n.get("middleEl"),i=r.height(),s=i+e;r.animate({height:s},t)},_setCenterWidth:function(e,t,n){var r=this,i=r.getItemsByRegion("center")[0],s=e==a.EAST?"marginRight":"marginLeft",o,u,f={};i&&(o=i.get("el")),u=parseFloat(o.css(s)),f[s]=t+u,o.animate(f,n)},getCollapsedRange:function(e){return e.getCollapsedRange()},beforeCollapsed:function(e,t){this.beforeCollapsedChange(e,t,!0)},afterExpanded:function(){if(t.UA.ie==6)return;this._fitMiddleControl()},afterCollapsed:function(){if(t.UA.ie==6)return;this._fitMiddleControl()},resetLayout:function(){var e=this;f.superclass.resetLayout.call(e),e._setMiddleDimension()}}),f}),define("bui/layout/accordion",["bui/common","bui/layout/abstract","bui/layout/tabitem","bui/layout/collapsable"],function(e){var t="x-layout-item-accordion",n=e("bui/common"),r=e("bui/layout/abstract"),i=e("bui/layout/tabitem"),s=e("bui/layout/collapsable"),o=function(e){o.superclass.constructor.call(this,e)};return o.ATTRS={itemConstructor:{value:i},wraperCls:{value:"x-accordion-body"},titleCls:{value:"x-accordion-title"},triggerCls:{value:"x-accordion-title"},layoutEvents:{value:["afterAddChild","afterRemoveChild"]},duration:{value:400},accordion:{value:!0},itemTpl:{value:'<div class="'+t+'"><div class="x-accordion-title">{title}<s class="x-expand-button"></s></div><div class="x-accordion-body"></div></div>'}},n.extend(o,r),n.mixin(o,[s]),n.augment(o,{appendEvent:function(e){this.bindCollapseEvent()},getActivedItem:function(){return this.getExpandedItem()},afterInitItems:function(){this._resetActiveItem()},_resetActiveItem:function(){var e=this,t=e.getActivedItem()||e.getItems()[0];t.expand(e.getCollapsedRange(),0)},resetLayout:function(){var e=this;o.superclass.resetLayout.call(e),e._resetActiveItem()},getCollapsedRange:function(){var e=this,t=e.get("container"),r=t.height(),i=t.find("."+e.get("titleCls")),s=r;return n.each(i,function(e){s-=$(e).outerHeight()}),s}}),o}),define("bui/layout/viewport",["bui/common"],function(e){var t=e("bui/common"),n="x-viewport-container",r=t.UA,i=window,s=t.Component.Controller.extend({renderUI:function(){this.reset();var e=this,t=e.get("render");$(t).addClass(n)},bindUI:function(){var e=this;$(i).on("resize",t.wrapBehavior(e,"onResize"))},onResize:function(){this.reset()},reset:function(){var e=this,n=e.get("el"),r=t.viewportHeight(),i=t.viewportWidth(),s=e.getAppendWidth(),o=e.getAppendHeight();e.set("width",i-s),e.set("height",r-o),e.fire("resize")},destructor:function(){$(i).off("resize",t.getWrapBehavior(this,"onResize"))}},{ATTRS:{render:{value:"body"}}},{xclass:"views-port"});return s}),define("bui/layout/baseitem",["bui/common"],function(e){function n(e,n){return t.isString(n)?(n.indexOf("{")!=-1&&(n=t.substitute(n,e),n=t.JSON.looseParse(n)),n):n}var t=e("bui/common"),r=function(e){r.superclass.constructor.call(this,e),this.init()};return r.ATTRS={fit:{value:"none"},layout:{},control:{},wraperCls:{},container:{},srcNode:{},cssProperties:{value:["width","height"]},attrProperties:{},statusProperties:{},tplProperties:{},el:{},elCls:{},tpl:{}},t.extend(r,t.Base),t.augment(r,{init:function(){var e=this,t=e._wrapControl();e.set("el",t),e.syncItem()},getElement:function(){return this.get("el")},_wrapControl:function(){var e=this,n=e.get("control"),r=n.get("el"),i=e.get("elCls"),s=e._getContainer(r),o=t.substitute(e.get("tpl"),e.getLayoutAttrs()),u=$(o).appendTo(s),a;return i&&u.addClass(i),a=e.getControlContainer(u),r.appendTo(a),e.set("bodyEl",a),u},getControlContainer:function(e){var t=this,n=t.get("wraperCls");return n?e.find("."+n):e},syncItem:function(e){e=e||this.getLayoutAttrs();var t=this,n=t.get("el"),r=t._getSyncCss(e),i=t._getSyncAttr(e);n.css(r),n.attr(i),t.syncStatus(n,e),t.syncElements(n,e),t.syncFit()},syncElements:function(e,n){var r=this,i=r.get("tplProperties");i&&t.each(i,function(t){r.synTpl(e,t,n)})},synTpl:function(e,n,r){var i=this,s=n.name,o="_"+s+"El",u,a,f=i.get(o);r[s]?f||(u=i.get(n.value),u=t.substitute(u,r),a=n.prev?"prependTo":"appendTo",f=$(u)[a](e),i.set(o,f)):f&&f.remove()},syncStatus:function(e,n){e=e||this.get("el"),n=n||this.getLayoutAttrs();var r=this,i=r.get("statusProperties");i&&t.each(i,function(t){var n=r.get(t);if(n!=null){var i=n?"addClass":"removeClass",s="x-"+t;e[i](s)}})},syncFit:function(){var e=this,t=e.get("control"),n=e.get("fit");if(n==="none")return;if(n==="width"){e._syncControlWidth(t);return}if(n==="height"){e._syncControlHeight(t);return}n==="both"&&(e._syncControlWidth(t),e._syncControlHeight(t))},_syncControlWidth:function(e){var t=this,n=t.get("width")||t.get("el").width(),r=e.getAppendWidth();e.set("width",n-r)},_syncControlHeight:function(e){var t=this,n=t.getFitHeight(),r=e.getAppendHeight();e.set("height",n-r)},getFitHeight:function(){var e=this,n=e.get("el"),r=e.get("bodyEl"),i,s=e.get("height")||n.height(),o=s;return r[0]==n[0]?s:(i=r.siblings(),t.each(i,function(e){var t=$(e);t.css("position")!=="absolute"&&(o-=t.outerHeight())}),o)},getLayoutAttrs:function(){return this.getAttrVals()},_getSyncCss:function(e){var r=this,i=r.get("cssProperties"),s=r._getDynacAttrs(),o={};return t.each(i,function(t){o[t]=n(s,e[t])}),o},_getDynacAttrs:function(){var e=this,t=e.get("container");return{width:t.width(),height:t.height()}},_getSyncAttr:function(e){var n=this,r=n.get("attrProperties"),i={};return t.each(r,function(t){i[t]=e[t]}),i},_getContainer:function(e){var t=this,n=t.get("container");return n?n:e.parent()},destroy:function(){var e=this;e.get("el").remove(),e.off(),e.clearAttrVals()}}),r}),define("bui/layout/absoluteitem",["bui/common","bui/layout/baseitem"],function(e){var t=e("bui/common"),n=e("bui/layout/baseitem"),r=function(e){r.superclass.constructor.call(this,e)};return t.extend(r,n),r.ATTRS={cssProperties:{value:["top","left","bottom","right"]}},t.augment(r,{}),r}),define("bui/layout/anchoritem",["bui/common","bui/layout/baseitem"],function(e){function r(e,n){return t.isNumber(e)?e>0?e:"{"+n+"}"+e:t.isString(e)&&e.indexOf("-")==0?"{"+n+"}"+e:e}var t=e("bui/common"),n=e("bui/layout/baseitem"),i=function(e){i.superclass.constructor.call(this,e)};return i.ATTRS={anchor:{value:["100%"]}},t.extend(i,n),t.augment(i,{getLayoutAttrs:function(){var e=this,n=e.get("anchor"),i=t.mix({},e.getAttrVals()),s=n[0],o=n[1];return i.width=r(s,"width"),i.height=r(o,"height"),i}}),i}),define("bui/layout/borderitem",["bui/common","bui/layout/baseitem"],function(e){var t=e("bui/common"),n=e("bui/layout/baseitem"),r="x-collapsed",i={NORTH:"north",EAST:"east",SOUTH:"south",WEST:"west",CENTER:"center"},s=function(e){s.superclass.constructor.call(this,e)};return s.ATTRS={region:{},titleTpl:{value:'<div class="x-border-title x-border-title-{region}">{title}</div>'},collapseTpl:{value:'<s class="x-collapsed-btn x-collapsed-{region}"></s>'},collapsable:{value:!1},collapsed:{value:!1},leftRange:{value:28},tplProperties:{value:[{name:"title",value:"titleTpl",prev:!0},{name:"collapsable",value:"collapseTpl",prev:!0}]},statusProperties:{value:["collapsed"]}},s.REGINS=i,t.extend(s,n),t.augment(s,{syncElements:function(e,t){s.superclass.syncElements.call(this,e,t);var n=this,e=n.get("el"),r=n.getCollapseProperty();n.get("collapsed")&&n.get(r)==e[r]()&&n.collapse(0)},expand:function(e,t,n){var i=this,s=i.getCollapseProperty(),o=i.get("el"),u=i.get(s),a={};a[s]=u,o.animate(a,t,function(){i.set("collapsed",!1),o.removeClass(r),n&&n()})},getCollapseProperty:function(){var e=this,t=e.get("region");return t==i.SOUTH||t==i.NORTH?"height":"width"},_getLeftRange:function(){var e=this,t=e.get("el"),n=e.get("leftRange");return n},getCollapsedRange:function(){var e=this,n=e.getCollapseProperty(),r=e.get("el"),i=e.get(n);if(t.isString(i)){var s=e._getDynacAttrs();i.indexOf("{")!=-1?(i=t.substitute(i,s),i=t.JSON.looseParse(i)):i.indexOf("%")!=-1?i=parseInt(i,10)*.01*s[n]:i=parseInt(i,10)}return i-e._getLeftRange(n)},collapse:function(e,t){var n=this,i=n.getCollapseProperty(),s=n.get("el"),o=n._getLeftRange(i),u={};u[i]=o,s.animate(u,e,function(){n.set("collapsed",!0),s.addClass(r),t&&t()})}}),s}),define("bui/layout/cellitem",["bui/common","bui/layout/baseitem"],function(e){var t=e("bui/common"),n=e("bui/layout/baseitem"),r=function(e){r.superclass.constructor.call(this,e)};return r.ATTRS={row:{},rowspan:{value:1},colspan:{value:1},attrProperties:{value:["rowspan","colspan"]},cells:{getter:function(){return this.get("rowspan")*this.get("colspan")}}},t.extend(r,n),t.augment(r,{}),r}),define("bui/layout/tabitem",["bui/common","bui/layout/baseitem"],function(e){var t=e("bui/common"),n="x-collapsed",r=e("bui/layout/baseitem"),i=function(e){i.superclass.constructor.call(this,e)};return i.ATTRS={collapsed:{value:!0},statusProperties:{value:["collapsed"]}},t.extend(i,r),t.augment(i,{expand:function(e,t){var r=this,i=r.get("el"),s=r.get("bodyEl");s.animate({height:e},t,function(){i.removeClass(n),r.syncFit()}),r.set("collapsed",!1)},collapse:function(e){var t=this,r=t.get("el"),i=t.get("bodyEl");i.animate({height:0},e,function(){r.addClass(n)}),t.set("collapsed",!0)}}),i});
