/**
 * @description index
 * @class index
 * @author yongjin<zjut_wyj@163.com> 2015/1/29
 */
var instanceClose;
function addWinOnloadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function () {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}
function doNothing() {
}
function loadScript() {
  var script = document.createElement("script");
  script.src = "http://api.map.baidu.com/api?v=2.0&ak=HACDI785p3wu9r5kynf6fY1i&callback=doNothing";//此为v1.5版本的引用方式
  document.body.appendChild(script);
}

var invite_styletype = 0;

function processButtonBackground() {
  if (invite_styletype == 1) {
    $("h3:visible>.button").each(function (index) {
      //$('#detail' + $(this).attr('id').split('button')[1]).attr('id', 'detail' + (index + 1) );
      $(this).attr('id', 'button' + (index + 1));
    });
    $("h3:visible+div>.detail").each(function (index) {
      $(this).attr('id', 'detail' + (index + 1))
    });
  }
}

function initProcessButtonBackground() {
  if (invite_styletype == 1) {
    $("h3:visible>.button").each(function (index) {
      $(this).attr('id', 'button' + (index + 1))
    });
    $("h3:visible+div>.detail").each(function (index) {
      $(this).attr('id', 'detail' + (index + 1))
    });
  } else {
    $("h3>.button").each(function (index) {
      $(this).attr('id', $(this).attr('name'))
    });
    $("h3+div>.detail").each(function (index) {
      $(this).attr('id', $(this).attr('name'))
    });
  }


}


var dragFlag1641634 = false;
var start1641634 = 0, end1641634 = 0;

function thisTouchStart1641634(e) {
  dragFlag1641634 = true;
  start1641634 = e.touches[0].pageY;
}

function thisTouchEnd1641634() {
  dragFlag1641634 = false;
}

function thisTouchMove1641634(e) {
  if (!dragFlag1641634) return;
  end1641634 = e.touches[0].pageY;
  window.scrollBy(0, ( start1641634 - end1641634 ));
}


var map1641634 = null;
var marker1641634;
var map1641634_zoom = 16;
var map1641634_latcenter = 29.978886;
var map1641634_lngcenter = 120.588281;
var map1641634_latmarker = 29.981827;
var map1641634_lngmarker = 120.588353;


function initialize1641634() {


  //Baidu MAP Control

  map1641634 = new BMap.Map("map_canvas1641634", {enableMapClick: false});
  //alert (map1641634_latcenter + "," + map1641634_lngcenter);

  //var point = new BMap.Point(116.404, 39.915);  // ?建?坐?
  //var point = new BMap.Point(map1641634_lngcenter, map1641634_latcenter );  // ?建?坐?


  map1641634.centerAndZoom(new BMap.Point(map1641634_lngcenter, map1641634_latcenter), 16);                 // 初始化地?，?置中心?坐?和地???

  //var opts = {type: BMAP_NAVIGATION_CONTROL_ZOOM};

  var opts = {anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_ZOOM};
  map1641634.addControl(new BMap.NavigationControl(opts));
  //map1641634.addControl(new BMap.ScaleControl());
  //map1641634.addControl(new BMap.OverviewMapControl());
  //map1641634.addControl(new BMap.MapTypeControl());
  //var opts = {anchor: BMAP_ANCHOR_BOTTOM_RIGHT }
  //map1641634.addControl(new CopyrightControl(opts));


  // ?建???象


  var myIcon = new BMap.Icon("images/mobile_invite/map_marker.png", new BMap.Size(34, 34), {
    // 指定定位位置。
    // ??注?示在地?上?，其所指向的地理位置距离??左上
    // 角各偏移10像素和25像素。您可以看到在本例中?位置即是
    // ??中央下端的尖角位置。
    offset: new BMap.Size(17, 34),
    // ?置?片偏移。
    // ?您需要?一幅?大的?片中截取某部分作??注???，您
    // 需要指定大?的偏移位置，此做法与css sprites技??似。
    imageOffset: new BMap.Size(0, 0)   // ?置?片偏移
  });
  // ?建?注?象并添加到地?


  marker1641634 = new BMap.Marker(new BMap.Point(map1641634_lngmarker, map1641634_latmarker), {icon: myIcon}); // ?建?注

  /*
   var infoContent = '<div style="margin:0;line-height:16px;padding:1px;">' +
   //              '<img src="../img/baidu.jpg" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
   //'地址：北京市海淀区上地十街10号<br/>电话：(010)59928888<br/>' +
   '<input name="map_direction_button1641634" type="button" disabled value="地圖導航" />' +
   '</div>';

   //创建检索信息窗口对象


   var opts = {
   title  : "百度地圖導航",      //标题
   width  : 0,             //宽度
   height : 0,              //高度
   maxWidth : 120,
   enableAutoPan : true,     //自动平移
   enableMessage: false //是否启用发送到手机
   }
   var infoWindow = new BMap.InfoWindow(infoContent, opts);  // 创建信息窗口对象
   map1641634.openInfoWindow(infoWindow, map1641634.getCenter());      // 打开信息窗口
   var infoWindow = new BMap.InfoWindow(infoContent);  // 创建信息窗口对象
   marker1641634.addEventListener("click", function(){
   this.openInfoWindow(infoWindow);
   //图片加载完毕重绘infowindow
   //document.getElementById('imgDemo').onload = function (){
   //   infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
   //}
   });

   */
  /*
   var searchInfoWindow = null;
   searchInfoWindow = new BMapLib.SearchInfoWindow(map1641634, infoContent, {
   title  : "百度大厦",      //标题
   width  : 200,             //宽度
   height : 80,              //高度
   panel  : "panel",         //检索结果面板
   enableAutoPan : true,     //自动平移
   searchTypes   :[
   //BMAPLIB_TAB_SEARCH,   //周边检索
   BMAPLIB_TAB_TO_HERE  //到这里去
   //BMAPLIB_TAB_FROM_HERE //从这里出发
   ]
   });
   marker1641634.addEventListener("click", function(e){
   searchInfoWindow.open(marker1641634);
   })

   */


  map1641634.addOverlay(marker1641634);


}

//baidu map

function setMapCenter1641634(lng, lat) {
  map1641634.setCenter(new BMap.Point(lng, lat));
  map1641634_latcenter = lat;
  map1641634_lngcenter = lng;

}

function setMapZoom1641634(zoom) {
  map1641634.setZoom(zoom);
  map1641634_zoom = zoom;

}

function setMarkerPos1641634(lng, lat) {
  //alert(pnt);
  marker1641634.setPosition(new BMap.Point(lng, lat));
  map1641634_latmarker = lat;
  map1641634_lngmarker = lng;

}


var dragFlag1641638 = false;
var start1641638 = 0, end1641638 = 0;

function thisTouchStart1641638(e) {
  dragFlag1641638 = true;
  start1641638 = e.touches[0].pageY;
}

function thisTouchEnd1641638() {
  dragFlag1641638 = false;
}

function thisTouchMove1641638(e) {
  if (!dragFlag1641638) return;
  end1641638 = e.touches[0].pageY;
  window.scrollBy(0, ( start1641638 - end1641638 ));
}


var map1641638 = null;
var marker1641638;
var map1641638_zoom = 16;
var map1641638_latcenter = 31.240629;
var map1641638_lngcenter = 121.512625;
var map1641638_latmarker = 31.241401;
var map1641638_lngmarker = 121.512876;


function initialize1641638() {


  //Baidu MAP Control

  map1641638 = new BMap.Map("map_canvas1641638", {enableMapClick: false});
  //alert (map1641638_latcenter + "," + map1641638_lngcenter);

  //var point = new BMap.Point(116.404, 39.915);  // ?建?坐?
  //var point = new BMap.Point(map1641638_lngcenter, map1641638_latcenter );  // ?建?坐?


  map1641638.centerAndZoom(new BMap.Point(map1641638_lngcenter, map1641638_latcenter), 16);                 // 初始化地?，?置中心?坐?和地???

  //var opts = {type: BMAP_NAVIGATION_CONTROL_ZOOM};

  var opts = {anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_ZOOM};
  map1641638.addControl(new BMap.NavigationControl(opts));
  //map1641638.addControl(new BMap.ScaleControl());
  //map1641638.addControl(new BMap.OverviewMapControl());
  //map1641638.addControl(new BMap.MapTypeControl());
  //var opts = {anchor: BMAP_ANCHOR_BOTTOM_RIGHT }
  //map1641638.addControl(new CopyrightControl(opts));


  // ?建???象


  var myIcon = new BMap.Icon("images/mobile_invite/map_marker.png", new BMap.Size(34, 34), {
    // 指定定位位置。
    // ??注?示在地?上?，其所指向的地理位置距离??左上
    // 角各偏移10像素和25像素。您可以看到在本例中?位置即是
    // ??中央下端的尖角位置。
    offset: new BMap.Size(17, 34),
    // ?置?片偏移。
    // ?您需要?一幅?大的?片中截取某部分作??注???，您
    // 需要指定大?的偏移位置，此做法与css sprites技??似。
    imageOffset: new BMap.Size(0, 0)   // ?置?片偏移
  });
  // ?建?注?象并添加到地?


  marker1641638 = new BMap.Marker(new BMap.Point(map1641638_lngmarker, map1641638_latmarker), {icon: myIcon}); // ?建?注

  /*
   var infoContent = '<div style="margin:0;line-height:16px;padding:1px;">' +
   //              '<img src="../img/baidu.jpg" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
   //'地址：北京市海淀区上地十街10号<br/>电话：(010)59928888<br/>' +
   '<input name="map_direction_button1641638" type="button" disabled value="地圖導航" />' +
   '</div>';

   //创建检索信息窗口对象


   var opts = {
   title  : "百度地圖導航",      //标题
   width  : 0,             //宽度
   height : 0,              //高度
   maxWidth : 120,
   enableAutoPan : true,     //自动平移
   enableMessage: false //是否启用发送到手机
   }
   var infoWindow = new BMap.InfoWindow(infoContent, opts);  // 创建信息窗口对象
   map1641638.openInfoWindow(infoWindow, map1641638.getCenter());      // 打开信息窗口
   var infoWindow = new BMap.InfoWindow(infoContent);  // 创建信息窗口对象
   marker1641638.addEventListener("click", function(){
   this.openInfoWindow(infoWindow);
   //图片加载完毕重绘infowindow
   //document.getElementById('imgDemo').onload = function (){
   //   infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
   //}
   });

   */
  /*
   var searchInfoWindow = null;
   searchInfoWindow = new BMapLib.SearchInfoWindow(map1641638, infoContent, {
   title  : "百度大厦",      //标题
   width  : 200,             //宽度
   height : 80,              //高度
   panel  : "panel",         //检索结果面板
   enableAutoPan : true,     //自动平移
   searchTypes   :[
   //BMAPLIB_TAB_SEARCH,   //周边检索
   BMAPLIB_TAB_TO_HERE  //到这里去
   //BMAPLIB_TAB_FROM_HERE //从这里出发
   ]
   });
   marker1641638.addEventListener("click", function(e){
   searchInfoWindow.open(marker1641638);
   })

   */


  map1641638.addOverlay(marker1641638);


}

//baidu map

function setMapCenter1641638(lng, lat) {
  map1641638.setCenter(new BMap.Point(lng, lat));
  map1641638_latcenter = lat;
  map1641638_lngcenter = lng;

}

function setMapZoom1641638(zoom) {
  map1641638.setZoom(zoom);
  map1641638_zoom = zoom;

}

function setMarkerPos1641638(lng, lat) {
  //alert(pnt);
  marker1641638.setPosition(new BMap.Point(lng, lat));
  map1641638_latmarker = lat;
  map1641638_lngmarker = lng;

}


$(document).ready(function () {
  $("#accordion").accordion({ autoHeight: false }, { collapsible: true, active: false });
  //$("#accordion").accordion("activate",0);
  //$("#accordion").accordion("activate","#accordion10");

  $("#accordion").bind('accordionchange', function (event, ui) {
    //   ui.newHeader // jQuery object, activated header
    //   ui.oldHeader // jQuery object, previous header
    //   ui.newContent // jQuery object, activated content
    //   ui.oldContent // jQuery object, previous content
    //console.log(ui);
    // console.log($("#accordion").accordion( "option", "active" ));
    if ($(ui.newHeader).offset() != null) {
      $('html, body').animate({scrollTop: $(ui.newHeader).offset().top});
    }
    bVideoPlaying = 0;
    //alert("audioPlayer.paused=" + audioPlayer.paused + ", bMute=" + bMute)
    if (audioPlayer.paused && bMute == 0) {
      audioPlayer.play();
    }

  });

  var bReloadWebFontOnce1641630 = 1;

  $("#accordion").bind('accordionchangestart', function (event, ui) {
    if (ui.newContent.attr('id') == 'invite_detail_content1641630' && bReloadWebFontOnce1641630 == 1) {
      //alert("reloadwebfont");
      //$("#invite_detail_editor1641630").hide();
      //reloadWebFont1641630();
      bReloadWebFontOnce1641630 = 0;
      //$("#invite_detail_editor1641630").show();
    }
  });


  /*
   $("#accordion").bind('accordionchange', function(event, ui) {
   if (ui.newContent.attr('id') == 'invite_detail_content1641631'  )
   {

   var cw = $('.gallery').width() * 0.33333 ; // 0.222 = 0.3333*0.6666
   alert("open: cw="+cw + ", gallery width=" + $('.gallery').width());
   $('.gallery li a .thumb').css({
   'height': cw + 'px'
   });


   }
   });
   */

  $("#accordion").bind('accordionchange', function (event, ui) {
    if (ui.newContent.attr('id') == 'invite_detail_content1641634' && !map1641634 && $("#invite_detail_mapimgurl1641634").val() == '') {
      initialize1641634();
    }


  });

  var mapCanvas = document.getElementById("map_canvas1641634");

  if (!mapCanvas.addEventListener) {
    mapCanvas.attachEvent("touchstart", thisTouchStart1641634, true);
    mapCanvas.attachEvent("touchend", thisTouchEnd1641634, true);
    mapCanvas.attachEvent("touchmove", thisTouchMove1641634, true);
  } else {
    mapCanvas.addEventListener("touchstart", thisTouchStart1641634, true);
    mapCanvas.addEventListener("touchend", thisTouchEnd1641634, true);
    mapCanvas.addEventListener("touchmove", thisTouchMove1641634, true);
  }

  var bReloadWebFontOnce1641637 = 1;

  $("#accordion").bind('accordionchangestart', function (event, ui) {
    if (ui.newContent.attr('id') == 'invite_detail_content1641637' && bReloadWebFontOnce1641637 == 1) {
      //alert("reloadwebfont");
      //$("#invite_detail_editor1641637").hide();
      reloadWebFont1641637();
      bReloadWebFontOnce1641637 = 0;
      //$("#invite_detail_editor1641637").show();
    }
  });


  $("#accordion").bind('accordionchange', function (event, ui) {
    // ui.newHeader // jQuery object, activated header
    // ui.oldHeader // jQuery object, previous header
    // ui.newContent // jQuery object, activated content
    // ui.oldContent // jQuery object, previous content
    //  alert($(ui.newContent).attr("id") + " was opened, " + $(ui.oldContent).attr("id") + " was closed");
    //   console.log(ui.newHeader.attr('id'));
    if (ui.newContent.attr('id') == 'invite_detail_content1641638' && !map1641638 && $("#invite_detail_mapimgurl1641638").val() == '') {
      //alert("initialize1641638");
      initialize1641638();
    }


  });

  var mapCanvas = document.getElementById("map_canvas1641638");

  if (!mapCanvas.addEventListener) {
    mapCanvas.attachEvent("touchstart", thisTouchStart1641638, true);
    mapCanvas.attachEvent("touchend", thisTouchEnd1641638, true);
    mapCanvas.attachEvent("touchmove", thisTouchMove1641638, true);
  } else {
    mapCanvas.addEventListener("touchstart", thisTouchStart1641638, true);
    mapCanvas.addEventListener("touchend", thisTouchEnd1641638, true);
    mapCanvas.addEventListener("touchmove", thisTouchMove1641638, true);
  }

  /*
   $("#accordion").bind('accordionchange', function(event, ui) {
   if (ui.newContent.attr('id') == 'invite_detail_content1641639'  )
   {

   var cw = $('.gallery').width() * 0.33333 ; // 0.222 = 0.3333*0.6666
   alert("open: cw="+cw + ", gallery width=" + $('.gallery').width());
   $('.gallery li a .thumb').css({
   'height': cw + 'px'
   });


   }
   });
   */


  $("#accordion").bind('accordionchange', function (event, ui) {
    accordion_active_index = $("#accordion").accordion('option', 'active');


    //not work --> tabs_selected_index = $("#tabs",parent.document.body).tabs( "option", "selected" );
    tabs_selected_index = self.parent.$("#tabs").tabs("option", "selected");
    //console.log("accordion_active_index=" + accordion_active_index + ",tabs_selected_index=" + tabs_selected_index);

    if (accordion_active_index != tabs_selected_index) {
      //not work --> $("#tabs",parent.document.body).tabs( "select" , accordion_active_index );
      if (!(accordion_active_index === false))
        self.parent.$("#tabs").tabs("select", accordion_active_index);

    }

  });


});


var bPlayVideo = 1;

function clickObj(o) {
//    alert('clicked');
//	bPlayVideo=0;
  var o = document.getElementById(o);

  if (document.all) {
    o.click();
    //o.fireEvent("onclick");

  } else {

    var e = document.createEvent('MouseEvent');
    e.initEvent('click', false, false);
    o.dispatchEvent(e);
  }

}
//http://v.youku.com/v_show/id_XNzA5NDUzMDYw.html?f=22223434&ev=2
//http://v.youku.com/v_show/id_XNjU2MTczMjQw.html?f=21525824
function showYoukuVideo(domid, youku_vid) {
  //alert('domid:'+domid +',youku_vid='+youku_vid);
  player = new YKU.Player(domid, {
    styleid: '0',
    client_id: 'c82e23dd17655657',
    vid: youku_vid,
    show_related: false,
    events: {
      onPlayEnd: function () { /*your code*/
      },
      onPlayStart: function () { /*your code*/
        //alert('onPlayStart');
        bVideoPlaying = 1;
        if (!audioPlayer.paused) {
          audioPlayer.pause();
        }
      },
      onPlayerReady: function () { /*your code*/
      }
    }
  });
}

function init() {


}

function isIns() {

  var btn = '';

  if (document.iform.sum.value == '0') {

    btn = ' 送 出 ';

  } else {

    btn = ' 修 改 ';

  }


  if (!confirm('您确定要' + btn + '？')) {

    return false;

  } else {

    document.iform.submit();

  }

}

function replaceAll(oldStr, findStr, repStr) {

  var srchNdx = 0;

  var newStr = "";
  while (oldStr.indexOf(findStr, srchNdx) != -1) {
    newStr += oldStr.substring(srchNdx, oldStr.indexOf(findStr, srchNdx));
    newStr += repStr;
    srchNdx = (oldStr.indexOf(findStr, srchNdx) + findStr.length);
  }
  newStr += oldStr.substring(srchNdx, oldStr.length);

  return newStr;
}

/*
 function getGlobalMobile(no) {
 start = String(no.slice(0,1));
 if (start == "+" ) {
 return String(no.slice(1,no.length))
 } else {
 if (start == "0") {
 return  "86" + String(no.slice(1,no.length))
 } else {
 return "86" + no
 }
 }
 }
 */

function getGlobalMobile(no) {
  var tmp_no, inter_no;
  var preset_cc = '86';
  start = String(no.slice(0, 1));
  if (start == "+") {
    tmp_no = String(no.slice(1, no.length)); //remove leading +
    if (String(tmp_no.slice(0, preset_cc.length)) == preset_cc && String(tmp_no.slice(preset_cc.length, preset_cc.length + 1)) == '0') {
      inter_no = preset_cc + String(tmp_no.slice(preset_cc.length + 1, tmp_no.length));
    } else {
      inter_no = tmp_no;
    }
  } else {
    if (start == "0") {
      inter_no = preset_cc + String(no.slice(1, no.length))
    } else {
      if (String(no.slice(0, preset_cc.length)) == preset_cc) {
        if (String(no.slice(preset_cc.length, preset_cc.length + 1)) == '0') {
          inter_no = preset_cc + String(no.slice(preset_cc.length + 1, no.length));
        } else {
          inter_no = no;
        }
      } else {
        inter_no = preset_cc + no;
      }
    }
  }
  return inter_no;

}


function checkMobileNumber(mo) {


  if (String(mo.slice(0, 1)) == "+") {
    if (isNaN(mo.slice(1, mo.length))) {
      return false;
    }
    if (mo.length < 5) {
      return false;
    }
  } else {
    if (isNaN(mo)) {
      return false;
    }
    if (mo.length < 6) {
      return false;
    }
  }
  return true
}

function isIns2() {


  if (document.rform.remindname.value.length == 0) {

    alert('请输入姓名！');
    document.rform.remindname.focus();
    return false;

  }

  if (document.rform.remindphone.value.length == 0) {

    alert('请输入手机号！');
    document.rform.remindphone.focus();
    return false;

  }

  /*
   if( document.rform.remindphone.value.length != 10 || document.rform.remindphone.value.substring(0,2) != '09'){

   alert('請輸入正確的手機號碼！');
   document.rform.remindphone.focus();
   return false;

   }

   if( ! confirm('您確定要送出簡訊提醒？')){

   return false;

   }else{

   document.rform.submit();

   }
   */
  mo = replaceAll(document.rform.remindphone.value, '-', '');
  mo = replaceAll(mo, ' ', '');
  mo = replaceAll(mo, '(', '');
  mo = replaceAll(mo, ')', '');


  if (checkMobileNumber(mo) == false) {
    alert("您的手机号码格式不正确:");
    document.rform.remindphone.focus();
    return false;

  } else {

    //confirm mobile country code

    if (String(mo.slice(0, 1)) != "+") {
      if (!confirm("系统自动判别以下手机号位于 [China / 中国]\n" + mo + "\n\n如果不是的话, 请在手机号前加上 +国码, \n例如,中国大陆(国码86)的手机号: 13061711111\n请输入: +86 13061711111")) {

        document.rform.remindphone.focus();
        return false;
      }
    }
    document.rform.remindphone_data.value = getGlobalMobile(mo)

  }

  document.rform.submit();


}


function addRow(parent_node, maxid) {



  //取得屬於要應用新增列的區塊
  var obj = document.getElementById(parent_node);
  //取得目前有多少欄位
  //var sIndex=obj.getElementsByTagName('div').length+1;
  var sIndex = maxid;

  //依照原表單格式,先建一個div
  var div = document.createElement('div');
  div.id = 's' + sIndex;

  //再建立文字欄位,並指定相關屬性
  var input = document.createElement('input');
  input.type = 'radio';
  input.name = 't' + parent_node.replace('q', '');


  var txt = document.createElement('span');
  txt.id = 'o' + maxid;
  txt.innerHTML = ' 新增选项';


  div.appendChild(input);
  div.appendChild(txt);

  obj.appendChild(div);


  var obj2 = eval('document.iform.t' + parent_node.replace('q', ''));
  if (typeof(obj2.length) == 'undefined') {

    obj2.style.display = 'none';

  } else {

    for (var i = 0; i < obj2.length; i++) {

      obj2[i].style.display = '';
    }
  }

}

function delRow(q, t) {

  d = document.getElementById(t);

  d.parentNode.removeChild(d);


  var obj2 = eval('document.iform.t' + q.replace('q', ''));
  if (typeof(obj2.length) == 'undefined') {

    obj2.style.display = 'none';

  } else {

    for (var i = 0; i < obj2.length; i++) {

      obj2[i].style.display = '';
    }
  }

}


function setQuestionTitle(qq, txt) {

  document.getElementById('qq' + qq).innerHTML = txt;

}


function setOptionTitle(o, txt) {

  var range_array, inputstr, qid;
  var leftstr, rightstr, midstr, leftpos, rightpos;
  var txtlength;
  var option_title, option_title_left, option_title_right;

  option_title = txt;
  option_title_right = option_title;

  leftstr = '';
  rightstr = '';
  midstr = '';

  inputstr = '';

  qid = document.getElementById('o' + o).parentNode.parentNode.id.replace('q', '');

  if (option_title.split('{').length - 1 > 1) {
    txtlength = 6;
  } else {
    txtlength = 16;
  }

  if (option_title.split('{').length - 1 > 0) {

    for (var n = 0; n < option_title.split('{').length - 1; n++) {
      //if (leftpos >= 0 && rightpos > 0){

      //是,{1-10}人 {}

      option_title_left = option_title_right;
      leftstr = "";
      rightstr = "";
      midstr = "";
      leftpos = parseInt(option_title_left.indexOf('{'));
      rightpos = parseInt(option_title_left.indexOf('}'));

      leftstr = option_title_left.substring(0, leftpos);

      midstr = option_title_left.substring(leftpos + 1, rightpos);

      inputstr += leftstr;

      if (midstr == '') {

        inputstr += '&nbsp;<input type="text" id="n' + qid + '" name="n' + qid + '" value="" size="' + txtlength + '" onkeyup="setOptionValue( ' + qid + ', this.value, ' + option_title + ', ' + o + ')">&nbsp;';


        //}else if ( midstr.indexOf('-') >= 0){
      } else {


        //inputstr = '';
        inputstr += '&nbsp;<select id="n' + qid + '" name="n' + qid + '" onchange="setOptionValue( ' + qid + ', this.value, ' + option_title + ', ' + o + ')">';
        inputstr += '<option value="">请选择</option>';
        option_array = midstr.split('|');
        //alert(option_array.length);
        cc = 1;
        for (i = 0; i < option_array.length; i++) {


          range_array = option_array[i].split('-');


          if (range_array.length == 2) {
            for (j = parseInt(range_array[0]); j <= parseInt(range_array[1]); j++) {
              inputstr += '<option value="' + j + '">' + j + '</option>';
              cc = cc + 1;
            }
          } else {
            inputstr += '<option value="' + option_array[i] + '">' + option_array[i] + '</option>';
          }

          cc = cc + 1;

        }
        inputstr += '</select>&nbsp;';


      }

      //alert(leftstr + inputstr + rightstr);
      // inputstr += leftstr;

      leftpos = parseInt(option_title_left.indexOf('{'));
      rightpos = parseInt(option_title_left.indexOf('}'));
      option_title_right = option_title_left.substring(rightpos + 1, txt.length);


    }
    inputstr += option_title_right;

    document.getElementById('o' + o).innerHTML = inputstr;

  } else {

    document.getElementById('o' + o).innerHTML = ' ' + txt;
  }


}

function updateSelect(parent_node, str) {


  var s = document.getElementById(parent_node.replace('q', 't'));

  var arr = new Array();
  arr = parent.document.getElementById(parent_node).getElementsByTagName('input');


  s.options.length = 0;

  s.options[0] = new Option('请选择', 0);
  for (var i = 0; i < arr.length; i++) {

    if (arr[i].value.Trim().length != 0) {

      s.options[i + 1] = new Option(arr[i].value, arr[i].value);

      if (arr[i].value == str) s.options[i + 1].selected = true;

    }
  }

}

function showQuestion(parent_node, check) {


  if (check) {

    document.getElementById(parent_node.replace('q', 'ta')).style.display = 'block';


  } else {

    document.getElementById(parent_node.replace('q', 'ta')).style.display = 'none';

  }

  var n = 0;

  //console.log($("#rsvptable tr[style*='display: block']"));


  $("#rsvptable tr[style*='block']").each(function (n) {
    n++;

    $(this).find("span:eq(0)").html(n);
  });

}


function setOptionValue(id, txt, order, optionid) {


  var obj, obj2, obj3;
  var val;

  obj = eval('document.iform.q' + id);

  //obj3 = eval('document.iform.n' + id + '_' + optionid);
  obj3 = document.getElementsByName('n' + id + '_' + optionid);

  //if (typeof(obj3.length) == 'undefined'){
  if (obj3.length == 1) {
    obj.value = txt;

  } else {

    val = '';

    for (var i = 0; i < obj3.length; i++) {

      val += '^' + obj3[i].value + '^';

    }

    val = replaceAll(val, '^^', '|');
    val = replaceAll(val, '^', '');

    obj.value = val;

  }


  obj2 = eval('document.iform.t' + id);

  if (typeof(obj2.length) == 'undefined') {

    obj2.checked = true;

  } else {

    for (var i = 0; i < obj2.length; i++) {

      if (obj2[i].value == order) {

        obj2[i].checked = true;
      }
    }
  }
}


String.prototype.Trim = function () {

  return this.replace(/(^\s*)|(\s*$)/g, "");

}


var bVideoPlaying = 0;


var bMute = 1;

var audioPlayer; //initialize in $(window).load(function()

function setMusic(mp3Url) {
  audioPlayer.pause();
  if (mp3Url.length > 0) {
    audioPlayer.src = mp3Url;
    audioPlayer.load();
    audioPlayer.play();
    bMute = 0;
  } else {
    bMute = 1;
  }
}


function stopLoading() {
  $("#Loading").fadeOut();


  audioPlayer = $("#xaudio")[0];


}


function winOnloadFunc() {
  stopLoading();
  loadScript();
}


var bWinOnLoadFired = 0;

$(window).load(function () {
  bWinOnLoadFired = 1;
  winOnloadFunc();

});

$(function () {
  setTimeout(function () {
    //alert("bWinOnLoadFired");
    if (bWinOnLoadFired == 0) {
      winOnloadFunc();
    }
    // Do something after 18 seconds
  }, 13000);
});
//?建求XMLHttpRequest?象
function createRequest() {
  try {
    request = new XMLHttpRequest();
  } catch (trymicrosoft) {
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (othermicrosoft) {
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (failed) {
        request = false;
      }
    }
  }
  if (!request)
    alert("ERROR XMLHttpRequest!");
}


function reloadWebFont1641630() {
  var webfontinfo_array = ['粗钢笔|粗钢笔1|http://42.121.32.43:443/Fonts/csslink?family=%E7%B2%97%E9%92%A2%E7%AC%941&font=%E7%B2%97%E9%92%A2%E7%AC%94|2', '粗圆|粗圆1|http://42.121.32.43:443/Fonts/csslink?family=%E7%B2%97%E5%9C%861&font=%E7%B2%97%E5%9C%86|2', '古印体|古印体1|http://42.121.32.43:443/Fonts/csslink?family=%E5%8F%A4%E5%8D%B0%E4%BD%931&font=%E5%8F%A4%E5%8D%B0%E4%BD%93|2', '黑体|黑体1|http://42.121.32.43:443/Fonts/csslink?family=%E9%BB%91%E4%BD%931&font=%E9%BB%91%E4%BD%93|2', '粗广告体|粗广告体1|http://42.121.32.43:443/Fonts/csslink?family=%E7%B2%97%E5%B9%BF%E5%91%8A%E4%BD%931&font=%E7%B2%97%E5%B9%BF%E5%91%8A%E4%BD%93|2', '隶书|隶书1|http://42.121.32.43:443/Fonts/csslink?family=%E9%9A%B6%E4%B9%A61&font=%E9%9A%B6%E4%B9%A6|2', '书宋二|书宋二1|http://42.121.32.43:443/Fonts/csslink?family=%E4%B9%A6%E5%AE%8B%E4%BA%8C1&font=%E4%B9%A6%E5%AE%8B%E4%BA%8C|2', '中行书|中行书1|http://42.121.32.43:443/Fonts/csslink?family=%E4%B8%AD%E8%A1%8C%E4%B9%A61&font=%E4%B8%AD%E8%A1%8C%E4%B9%A6|2', '粗行楷体|粗行楷体1|http://42.121.32.43:443/Fonts/csslink?family=%E7%B2%97%E8%A1%8C%E6%A5%B7%E4%BD%931&font=%E7%B2%97%E8%A1%8C%E6%A5%B7%E4%BD%93|2', '甜妞体|甜妞体1|http://42.121.32.43:443/Fonts/csslink?family=%E7%94%9C%E5%A6%9E%E4%BD%931&font=%E7%94%9C%E5%A6%9E%E4%BD%93|2'];
  var htmltext = $("#invite_detail_editor1641630").html();
  plaintext = htmltext.replace(/(<[^<|>]+?>|\r\n|\n|\r|^\s*|\s*$|\s+|&nbsp;)/gim, '');

  plaintext_array_inorder = plaintext.split('').sort();

  if (plaintext_array_inorder.length > 0) {
    plaintext_min = plaintext_array_inorder[0];
    prechr = plaintext_array_inorder[0];
    for (i = 1; i < plaintext_array_inorder.length; i++) {
      if (plaintext_array_inorder[i] != prechr) {
        prechr = plaintext_array_inorder[i];
        plaintext_min = plaintext_min + plaintext_array_inorder[i];
      }
    }
  } else {
    plaintext_min = "";
  }


  contentcss_list = "";
  //alert(webfontinfo_array);

  for (cc = 0; cc < webfontinfo_array.length; cc++) {

    tmp_webfontname = webfontinfo_array[cc].split('|')[0];
    //	alert(tmp_webfontname);
    tmp_webfont = webfontinfo_array[cc].split('|')[1];
    tmp_webfonturl = webfontinfo_array[cc].split('|')[2];
    tmp_webfonttype = webfontinfo_array[cc].split('|')[3];

    if (htmltext.toUpperCase().indexOf(tmp_webfont.toUpperCase()) >= 0) {
      var_text = plaintext_min;
      if (tmp_webfonttype == 1) {
        $(document).find('head').append('<link class="fontcss_detail" id="' + tmp_webfont + '" rel="stylesheet" type="text/css" href="' + tmp_webfonturl + "&text=" + encodeURIComponent(var_text) + '">');
      } else if (tmp_webfonttype == 3) { //google webfont pure english,  no text parameter
        $(document).find('head').append('<link class="fontcss_detail" id="' + tmp_webfont + '" rel="stylesheet" type="text/css" href="' + tmp_webfonturl + '">');
      } else {
        post_url = tmp_webfonturl.split('?')[0];
        post_vars = tmp_webfonturl.split('?')[1] + "&text=" + encodeURIComponent(var_text);
        createRequest();
        //post_url = "http://cn.youvivid.com/test_test.asp";
        //alert(parseInt($.browser.version, 10));


        if ($.browser.msie && parseInt($.browser.version, 10) <= 8) {
          post_url = "http://cn.youvivid.com/mobile_invite_getcontentcssurl.asp";
        } else {
          post_url = "http://42.121.32.43:443/Fonts/csslink";
        }


        //alert(post_url);
        request.open("POST", post_url, false);

        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //alert(post_url+"," + post_vars);
        request.send(post_vars);
        post_response = request.responseText; //?取服?器返回的JSON字串

        //	alert("post_response=" + post_response);
        // this is for testing
        //$(document).find('head').append('<link class="fontcss_detail" id="' + tmp_webfont + '" rel="stylesheet" type="text/css" href="'+ tmp_webfonturl + "&text=" + encodeURIComponent(var_text) +'">');
        $(document).find('head').append('<link class="fontcss_detail" id="' + tmp_webfont + '" rel="stylesheet" type="text/css" href="' + post_response + '">');

      }
    } else {
      var_text = tmp_webfontname;
      if (tmp_webfonttype == 1) {
        $(document).find('head').append('<link class="fontcss_detail" id="' + tmp_webfont + '" rel="stylesheet" type="text/css" href="' + tmp_webfonturl + "&text=" + encodeURIComponent(var_text) + '">');


      } else if (tmp_webfonttype == 3) { // google webfont load first
        $(document).find('head').append('<link class="fontcss_detail" id="' + tmp_webfont + '" rel="stylesheet" type="text/css" href="' + tmp_webfonturl + '">');


      } else {
        $(document).find('head').append('<link class="fontcss_detail" id="' + tmp_webfont + '" rel="stylesheet" type="text/css" href="">');

      }
    }//if (  htmltext.toUpperCase().indexOf(tmp_webfont.toUpperCase()) >= 0 ) {
  }
} //end	function reloadWebFont1641630(){


$(document).ready(function () {

  //reloadWebFont1641630();

  bReloadWebFontOnce1641630 = 0;


});
$(function () {

  $("#playVideo1641632").click(function () {
    //alert("playVideo");

    self.parent.switchSrc_variable4(xobjurl1641632, xusrdata1641632);

    if (!audioPlayer.paused) {
      audioPlayer.pause();
    }
    //var $jParent = window.parent.jQuery.noConflict();
    //self.parent.dialogVideo = $jParent('#myOnPageContent');
    //self.parent.dialogVideo.dialog("open");

    return false;
  });
});
$(document).ready(function () {
  //init
  if ($("#invite_detail_mapimgurl1641634").val() == '') {
    $("#invite_detail_mapimg1641634").hide();
    $("#map_canvas1641634").show();
    $("#map_direction1641634").show();
  } else {
    $("#invite_detail_mapimg1641634").show();
    $("#map_canvas1641634").hide();
    $("#map_direction1641634").hide();
  }


});
$(function () {
  $('#inviteurl').click(function () {
    if ($.browser.msie) this.createTextRange().select();
    else {
      this.selectionStart = 0;
      this.selectionEnd = this.value.length;
    }
  });
})


//?建求XMLHttpRequest?象
function createRequest() {
  try {
    request = new XMLHttpRequest();
  } catch (trymicrosoft) {
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (othermicrosoft) {
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (failed) {
        request = false;
      }
    }
  }
  if (!request)
    alert("ERROR XMLHttpRequest!");
}


function reloadWebFont1641637() {
  var webfontinfo_array = ['粗钢笔|粗钢笔1|http://42.121.32.43:443/Fonts/csslink?family=%E7%B2%97%E9%92%A2%E7%AC%941&font=%E7%B2%97%E9%92%A2%E7%AC%94|2', '粗圆|粗圆1|http://42.121.32.43:443/Fonts/csslink?family=%E7%B2%97%E5%9C%861&font=%E7%B2%97%E5%9C%86|2', '古印体|古印体1|http://42.121.32.43:443/Fonts/csslink?family=%E5%8F%A4%E5%8D%B0%E4%BD%931&font=%E5%8F%A4%E5%8D%B0%E4%BD%93|2', '黑体|黑体1|http://42.121.32.43:443/Fonts/csslink?family=%E9%BB%91%E4%BD%931&font=%E9%BB%91%E4%BD%93|2', '粗广告体|粗广告体1|http://42.121.32.43:443/Fonts/csslink?family=%E7%B2%97%E5%B9%BF%E5%91%8A%E4%BD%931&font=%E7%B2%97%E5%B9%BF%E5%91%8A%E4%BD%93|2', '隶书|隶书1|http://42.121.32.43:443/Fonts/csslink?family=%E9%9A%B6%E4%B9%A61&font=%E9%9A%B6%E4%B9%A6|2', '书宋二|书宋二1|http://42.121.32.43:443/Fonts/csslink?family=%E4%B9%A6%E5%AE%8B%E4%BA%8C1&font=%E4%B9%A6%E5%AE%8B%E4%BA%8C|2', '中行书|中行书1|http://42.121.32.43:443/Fonts/csslink?family=%E4%B8%AD%E8%A1%8C%E4%B9%A61&font=%E4%B8%AD%E8%A1%8C%E4%B9%A6|2', '粗行楷体|粗行楷体1|http://42.121.32.43:443/Fonts/csslink?family=%E7%B2%97%E8%A1%8C%E6%A5%B7%E4%BD%931&font=%E7%B2%97%E8%A1%8C%E6%A5%B7%E4%BD%93|2', '甜妞体|甜妞体1|http://42.121.32.43:443/Fonts/csslink?family=%E7%94%9C%E5%A6%9E%E4%BD%931&font=%E7%94%9C%E5%A6%9E%E4%BD%93|2'];
  var htmltext = $("#invite_detail_editor1641637").html();
  plaintext = htmltext.replace(/(<[^<|>]+?>|\r\n|\n|\r|^\s*|\s*$|\s+|&nbsp;)/gim, '');

  plaintext_array_inorder = plaintext.split('').sort();

  if (plaintext_array_inorder.length > 0) {
    plaintext_min = plaintext_array_inorder[0];
    prechr = plaintext_array_inorder[0];
    for (i = 1; i < plaintext_array_inorder.length; i++) {
      if (plaintext_array_inorder[i] != prechr) {
        prechr = plaintext_array_inorder[i];
        plaintext_min = plaintext_min + plaintext_array_inorder[i];
      }
    }
  } else {
    plaintext_min = "";
  }


  contentcss_list = "";
  //alert(webfontinfo_array);

  for (cc = 0; cc < webfontinfo_array.length; cc++) {

    tmp_webfontname = webfontinfo_array[cc].split('|')[0];
    //	alert(tmp_webfontname);
    tmp_webfont = webfontinfo_array[cc].split('|')[1];
    tmp_webfonturl = webfontinfo_array[cc].split('|')[2];
    tmp_webfonttype = webfontinfo_array[cc].split('|')[3];

    if (htmltext.toUpperCase().indexOf(tmp_webfont.toUpperCase()) >= 0) {
      var_text = plaintext_min;
      if (tmp_webfonttype == 1) {
        $(document).find('head').append('<link class="fontcss_detail" id="' + tmp_webfont + '" rel="stylesheet" type="text/css" href="' + tmp_webfonturl + "&text=" + encodeURIComponent(var_text) + '">');
      } else if (tmp_webfonttype == 3) { //google webfont pure english,  no text parameter
        $(document).find('head').append('<link class="fontcss_detail" id="' + tmp_webfont + '" rel="stylesheet" type="text/css" href="' + tmp_webfonturl + '">');
      } else {
        post_url = tmp_webfonturl.split('?')[0];
        post_vars = tmp_webfonturl.split('?')[1] + "&text=" + encodeURIComponent(var_text);
        createRequest();
        //post_url = "http://cn.youvivid.com/test_test.asp";
        //alert(parseInt($.browser.version, 10));


        if ($.browser.msie && parseInt($.browser.version, 10) <= 8) {
          post_url = "http://cn.youvivid.com/mobile_invite_getcontentcssurl.asp";
        } else {
          post_url = "http://42.121.32.43:443/Fonts/csslink";
        }


        //alert(post_url);
        request.open("POST", post_url, false);

        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //alert(post_url+"," + post_vars);
        request.send(post_vars);
        post_response = request.responseText; //?取服?器返回的JSON字串

        //	alert("post_response=" + post_response);
        // this is for testing
        //$(document).find('head').append('<link class="fontcss_detail" id="' + tmp_webfont + '" rel="stylesheet" type="text/css" href="'+ tmp_webfonturl + "&text=" + encodeURIComponent(var_text) +'">');
        $(document).find('head').append('<link class="fontcss_detail" id="' + tmp_webfont + '" rel="stylesheet" type="text/css" href="' + post_response + '">');

      }
    } else {
      var_text = tmp_webfontname;
      if (tmp_webfonttype == 1) {
        $(document).find('head').append('<link class="fontcss_detail" id="' + tmp_webfont + '" rel="stylesheet" type="text/css" href="' + tmp_webfonturl + "&text=" + encodeURIComponent(var_text) + '">');


      } else if (tmp_webfonttype == 3) { // google webfont load first
        $(document).find('head').append('<link class="fontcss_detail" id="' + tmp_webfont + '" rel="stylesheet" type="text/css" href="' + tmp_webfonturl + '">');


      } else {
        $(document).find('head').append('<link class="fontcss_detail" id="' + tmp_webfont + '" rel="stylesheet" type="text/css" href="">');

      }
    }//if (  htmltext.toUpperCase().indexOf(tmp_webfont.toUpperCase()) >= 0 ) {
  }
} //end	function reloadWebFont1641637(){


$(document).ready(function () {

  reloadWebFont1641637();

  bReloadWebFontOnce1641637 = 0;


});