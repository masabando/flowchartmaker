
function flowchartmaker() {
  var APP_NAME = 'FlowchartMaker';
  var VERSION = "1.3";
  var LINENUM = 3;
  var FADE_WAIT = 200;
  var button_linenum = 4;
  var itemprop = {width: 360, height: 120, xmargin: 40, ymargin: 40,
                  padding: 20, fsize: 42, itemlw: 4, lw: 3, font: "Roboto"};
  var menu_window_prop = {
    containment: "#Flowchartmaker",
    cancel: "input,textarea,button,select,option,.button,#menu_window_1",
    opacity: 0.5,
    scroll: false,
    zIndex: 999
  };

  var itembuttons_alist = {
    // key: [button_label, id, default-string, func]
    start:
    ["start", "start", "start",
     function(ctx, str) {
       var w = itemprop.width, h = itemprop.height;
       var m = ~~(h/12);
       var r = h*0.5 - m;
       ctx.translate(itemprop.xmargin/2, itemprop.ymargin/2);
       ctx.beginPath();
       ctx.arc(r, h/2, r, deg2rad(90), deg2rad(270));
       ctx.lineTo(w-r, m);
       ctx.arc(w-r, h/2, r, deg2rad(270), deg2rad(90));
       ctx.closePath();
       ctx.fill();
       filltext(ctx, str, w/2, h/2);
       ctx.stroke();
       ctx.translate(-itemprop.xmargin/2, -itemprop.ymargin/2);
     }, "開始端子"],
    end:
    ["end", "end", "end",
     function(ctx, str) {
       var w = itemprop.width, h = itemprop.height;
       var m = ~~(h/12);
       var r = h*0.5 - m;
       ctx.translate(itemprop.xmargin/2, itemprop.ymargin/2);
       ctx.beginPath();
       ctx.arc(r, h/2, r, deg2rad(90), deg2rad(270));
       ctx.lineTo(w-r, m);
       ctx.arc(w-r, h/2, r, deg2rad(270), deg2rad(90));
       ctx.closePath();
       ctx.fill();
       ctx.stroke();
       filltext(ctx, str, w/2, h/2);
       ctx.translate(-itemprop.xmargin/2, -itemprop.ymargin/2);
     }, "終了端子"],
    terminal:
    ["term", "terminal", "",
     function(ctx, str) {
       var w = itemprop.width, h = itemprop.height;
       var m = ~~(h/12);
       var r = h*0.5 - m;
       ctx.translate(itemprop.xmargin/2, itemprop.ymargin/2);
       ctx.beginPath();
       ctx.arc(r, h/2, r, deg2rad(90), deg2rad(270));
       ctx.lineTo(w-r, m);
       ctx.arc(w-r, h/2, r, deg2rad(270), deg2rad(90));
       ctx.closePath();
       ctx.fill();
       ctx.stroke();
       filltext(ctx, str, w/2, h/2);
       ctx.translate(-itemprop.xmargin/2, -itemprop.ymargin/2);
     }, "一般端子"],
    process:
    ["proc", "process", "",
     function(ctx, str) {
       var w = itemprop.width, h = itemprop.height;
       ctx.translate(itemprop.xmargin/2, itemprop.ymargin/2);
       ctx.beginPath();
       ctx.moveTo(0, 0);
       ctx.lineTo(w, 0);
       ctx.lineTo(w, h);
       ctx.lineTo(0, h);
       ctx.closePath();
       ctx.fill();
       ctx.stroke();
       filltext(ctx, str, w/2, h/2);
       ctx.translate(-itemprop.xmargin/2, -itemprop.ymargin/2);
     }, "処理"],
    ydecision:
    ["deci-Y", "decisionY", "",
     function(ctx, str) {
       var w = itemprop.width, h = itemprop.height;
       ctx.translate(itemprop.xmargin/2, itemprop.ymargin/2);
       ctx.beginPath();
       ctx.moveTo(w/2, 0);
       ctx.lineTo(w, h/2);
       ctx.lineTo(w/2, h);
       ctx.lineTo(0, h/2);
       ctx.closePath();
       ctx.fill();
       ctx.stroke();
       filltext(ctx, str, w/2, h/2, ~~(0.9*itemprop.fsize));
       ctx.save();
       ctx.textAlign = "left";
       filltext(ctx, ["Yes"], ~~(0.55*w), ~~(h+0.5*itemprop.ymargin),
                ~~(0.8*itemprop.fsize));
       ctx.restore();
       ctx.translate(-itemprop.xmargin/2, -itemprop.ymargin/2);
     }, "判断 (下がYes)"],
    ndecision:
    ["deci-N", "decisionN", "",
     function(ctx, str) {
       var w = itemprop.width, h = itemprop.height;
       ctx.translate(itemprop.xmargin/2, itemprop.ymargin/2);
       ctx.beginPath();
       ctx.moveTo(w/2, 0);
       ctx.lineTo(w, h/2);
       ctx.lineTo(w/2, h);
       ctx.lineTo(0, h/2);
       ctx.closePath();
       ctx.fill();
       ctx.stroke();
       filltext(ctx, str, w/2, h/2, ~~(0.9*itemprop.fsize));
       ctx.save();
       ctx.textAlign = "left";
       filltext(ctx, ["No"], ~~(0.55*w), ~~(h+0.5*itemprop.ymargin),
                ~~(0.8*itemprop.fsize));
       ctx.restore();
       ctx.translate(-itemprop.xmargin/2, -itemprop.ymargin/2);
     }, "判断 (下がNo)"],
    io:
    ["I/O", "I/O", "",
     function(ctx, str) {
       var w = itemprop.width, h = itemprop.height;
       var m = ~~(h/12);
       ctx.translate(itemprop.xmargin/2, itemprop.ymargin/2);
       ctx.beginPath();
       ctx.moveTo(0.5*h, m);
       ctx.lineTo(w, m);
       ctx.lineTo(w - 0.5*h, h - 2*m);
       ctx.lineTo(0, h - 2*m);
       ctx.closePath();
       ctx.fill();
       ctx.stroke();
       filltext(ctx, str, w/2, h/2);
       ctx.translate(-itemprop.xmargin/2, -itemprop.ymargin/2);
     }, "入出力"],
    preparation:
    ["prep", "preparation", "",
     function(ctx, str) {
       var w = itemprop.width, h = itemprop.height;
       var m = ~~(h/24);
       ctx.translate(itemprop.xmargin/2, itemprop.ymargin/2);
       ctx.beginPath();
       ctx.moveTo(0, 0.5*h);
       ctx.lineTo(0.5*h, m);
       ctx.lineTo(w - 0.5*h, m);
       ctx.lineTo(w, 0.5*h);
       ctx.lineTo(w - 0.5*h, h-m);
       ctx.lineTo(0.5*h, h-m);
       ctx.closePath();
       ctx.fill();
       ctx.stroke();
       filltext(ctx, str, w/2, h/2);
       ctx.translate(-itemprop.xmargin/2, -itemprop.ymargin/2);
     }, "準備"],
    ljoin:
    ["-->┃", "join-L", "",
     function(ctx, str) {
       var w = itemprop.width, h = itemprop.height;
       ctx.translate(itemprop.xmargin/2, itemprop.ymargin/2);
       ctx.save();
       ctx.lineWidth = itemprop.lw;
       ctx.beginPath();
       ctx.moveTo(0, 0.5*h);
       ctx.lineTo(w/2, 0.5*h);
       ctx.stroke();
       ctx.fillStyle = "#000000";
       ctx.beginPath();
       ctx.moveTo(0.5*w, 0.5*h);
       ctx.lineTo(0.5*w - 0.1*w, 0.5*h - 0.05*w);
       ctx.lineTo(0.5*w - 0.1*w, 0.5*h + 0.05*w);
       ctx.closePath();
       ctx.fill();
       ctx.restore();
       ctx.translate(-itemprop.xmargin/2, -itemprop.ymargin/2);
     }, "左から合流"],
    rjoin:
    ["┃<--", "join-R", "",
     function(ctx, str) {
       var w = itemprop.width, h = itemprop.height;
       ctx.translate(itemprop.xmargin/2, itemprop.ymargin/2);
       ctx.save();
       ctx.lineWidth = itemprop.lw;
       ctx.beginPath();
       ctx.moveTo(w, 0.5*h);
       ctx.lineTo(w/2, 0.5*h);
       ctx.stroke();
       ctx.fillStyle = "#000000";
       ctx.beginPath();
       ctx.moveTo(0.5*w, 0.5*h);
       ctx.lineTo(0.5*w + 0.1*w, 0.5*h - 0.05*w);
       ctx.lineTo(0.5*w + 0.1*w, 0.5*h + 0.05*w);
       ctx.closePath();
       ctx.fill();
       ctx.restore();
       ctx.translate(-itemprop.xmargin/2, -itemprop.ymargin/2);
     }, "右から合流"],
    lline:
    ["┫", "line-L", "",
     function(ctx, str) {
       var w = itemprop.width, h = itemprop.height;
       ctx.translate(itemprop.xmargin/2, itemprop.ymargin/2);
       ctx.save();
       ctx.lineWidth = itemprop.lw;
       ctx.beginPath();
       ctx.moveTo(-itemprop.xmargin, 0.5*h);
       ctx.lineTo(0.5*w, 0.5*h);
       ctx.stroke();
       ctx.textAlign = "left";
       filltext(ctx, str, 0, ~~(h/4), ~~(0.8*itemprop.fsize));
       ctx.restore();
       ctx.translate(-itemprop.xmargin/2, -itemprop.ymargin/2);
     }, "左に線を伸ばす"],
    rline:
    ["┣", "line-R", "",
     function(ctx, str) {
       var w = itemprop.width, h = itemprop.height;
       ctx.translate(itemprop.xmargin/2, itemprop.ymargin/2);
       ctx.save();
       ctx.lineWidth = itemprop.lw;
       ctx.beginPath();
       ctx.moveTo(w+itemprop.xmargin, 0.5*h);
       ctx.lineTo(0.5*w, 0.5*h);
       ctx.stroke();
       ctx.textAlign = "right";
       filltext(ctx, str, w, ~~(h/4), ~~(0.8*itemprop.fsize));
       ctx.restore();
       ctx.translate(-itemprop.xmargin/2, -itemprop.ymargin/2);
     }, "右に線を伸ばす"],
    void:
    ["void", "", "", function(ctx, str) { }, "空"]
  };

  // [Selectors] ------------------------------------------------------
  var content = $('#Flowchartmaker');
  var footer = $('#footer');
  var header = $('#header');
  var menu_window = $('#menu_window');
  var menu_button_container = $('#menu_button_container');
  var preview_container = $('#flowchart_preview_container');
  var preview_line;
  var canvas_container = $('#flowchart_canvas_container');

  var allclear_window = $('#allclear_window');
  var help_window = $('#help_window');
  var output_window = $('#output_window');
  var load_window = $('#load_window');
  var modal_bg = $('#modal_bg');
  // [Autoset Vars] ---------------------------------------------------
  var itembuttons;
  var click_event = 'click';
  var smart_phone_flag = false;
  var size;
  var FMData_init = [[[],[],[]],
                     [[],[["start","start",0],["process","a ← 3",1],["ydecision","a % 2 == 0",1],["io","a × 3",1],["rjoin","",1],["end","end",1]],[["void","",0],["void","",0],["lline","No",0],["io","a + 2",1],["lline","",1]]],
                     [[],[],[]],
                     [[],[],[]],
                     [[],[],[]]];
  var FMData = JSON.parse(JSON.stringify(FMData_init));

  // [for smart phone] ------------------------------------------------
  function agent_checker() {
    var agent = navigator.userAgent;
    if(agent.search(/iPhone/) != -1 || agent.search(/iPad/) != -1
       || agent.search(/iPod/) != -1 || agent.search(/Android/) != -1) {
      smart_phone_flag = true;
      click_event = "touchend";
      // $(window).on('touchmove', function(e) { e.preventDefault(); });
    }
  }
  function smart_phone_init() {
    content.css({'padding': '20px 0 0 0'});
    preview_container.css({
      'display': 'block',
      'width': '100%',
      'min-height': '300px',
    });
    canvas_container.css({
      'display': 'block',
      'width': '100%',
      'min-height': '300px',
    });
    menu_window.css({
      'display': 'block',
      'background': '#44a',
      'border': '1px solid #aaa',
      'padding': '0'
    });
    $('#menu_window_title').css('display', 'none');
    // var w = content.innerWidth(), h = content.innerHeight();
    // var dw = $(window).innerWidth(), dh = $(window).innerHeight();
  }
  function pc_init() {
    $('#statusbar').css('display', 'none');
    preview_container.css({
      'display': 'inline-block',
      'width': '50%',
      'height': '700px'
    });
    canvas_container.css({
      'display': 'inline-block',
      'width': '50%',
      'height': '700px'
    });
    menu_window.css({
      'position': 'absolute',
      'left': '40px; top: 100px',
      'float': 'left',
      'display': 'inline-block',
      'background': '#44a',
      'border': '1px solid #aaa',
      'padding': '0',
      '-webkit-border-radius': '4px',
      '-moz-border-radius': '4px',
      '-o-border-radius': '4px',
      '-ms-border-radius': '4px',
      'border-radius': '4px',
      'box-shadow': '1px 1px 2px rgba(0,0,0,0.3)',
      'opacity': '0.8',
      'z-index': '9999'
    });
  }
  // ------------------------------------------------------------------

  function save() {
    localStorage.setItem(APP_NAME, JSON.stringify([VERSION, FMData]));
  }
  function load() {
    var ls_data = localStorage.getItem(APP_NAME);
    if (!ls_data || JSON.parse(ls_data).length != 2) { allclear(false); }
    else {
      ls_data = JSON.parse(ls_data);
      FMData = ls_data[1];
      if (ls_data[0] != VERSION) {
        alert("バージョンアップしました。\n("
              + ls_data[0] + " --> " + VERSION + ")");
        save();
      }
    }
  }

  function allclear(ask_flag) {
    FMData = JSON.parse(JSON.stringify(FMData_init));
    save();
    update_loadbuttons();
    update(0);
    return false;
  }

  function show_window(wd) {
    var w = $(window).width(), h = $(window).height();
    var sw = wd.outerWidth(true), sh = wd.outerHeight(true);
    wd.css({'left': ~~(0.5*(w-sw)) + 'px', 'top': ~~(0.5*(h-sh)) + 'px'});
    wd.fadeIn(FADE_WAIT);
  }

  function update(num) {
    var a = [];
    preview_line.html("");
    FMData[0] = JSON.parse(JSON.stringify(FMData[num]));
    preview_line.each(function(i, l) {
      $.each(FMData[0][i], function(j, c) { append_item(c[0], c[1], c[2], i, true); });
    });
    update_button_event();
    refresh();
  }

  function deg2rad(deg) { return deg*Math.PI/180; }

  function filltext(ctx, str, x, y, fsize) {
    ctx.save();
    ctx.fillStyle = "#000000";
    ctx.font = fsize + "px " + itemprop.font;
    $.each(str, function(i, e) {
      ctx.fillText(e, x, y + (i - (str.length-1)/2)*itemprop.fsize);
    });
    ctx.restore();
  }

  function update_connectbutton_style() {
    $('.itemconnect_button').each(function() {
      var b = (+($(this).parent().parent().attr("data-connectflag")));
      $(this).css(b == 1 ? {// on
        'font-weight': 'bold',
        'background': '#88f',
        'color': '#66f'
      } : {// off
        'font-weight': 'normal',
        'background': '#ccf',
        'color': '#66b'
      });
    });
  }

  function update_button_event() {
    $('.itemclose_button').off(click_event).on(click_event, function() {
      $(this).parent().parent().remove();
      preview_line.sortable('refresh');
    });
    $('.itemconnect_button').off(click_event).on(click_event, function() {
      var b = (+($(this).parent().parent().attr("data-connectflag"))+1) % 2;
      $(this).parent().parent().attr("data-connectflag", b);
      $(this).css(b == 1 ? {// on
        'font-weight': 'bold',
        'background': '#88f',
        'color': '#66f'
      } : {// off
        'font-weight': 'normal',
        'background': '#ccf',
        'color': '#66b'
      });
    });
    update_connectbutton_style();
  }

  function refresh() { preview_line.sortable('refresh'); }

  function append_item(key, loadstr, connectflag, _idx, norefresh) {
    var idx = (_idx === false ? ~~(preview_line.length/2) : _idx);
    $('<div class="pv_items noselect pv_item_' + key
      + '" data-key="' + key + '"></div>')
      .append('<div>' + itembuttons_alist[key][1]
              + '<div class="itemclose_button button">X</div>'
              + '<div class="itemconnect_button button">C</div>'
              + '</div>')
      .append('<textarea class="pv_text"'
              + (key == 'void' ? ' disabled="disabled"' : "") + '">'
              + (loadstr ? loadstr : itembuttons_alist[key][2]) + '</textarea>')
      .appendTo('.flowchart_preview_container_line:eq(' + idx + ')')
      .attr('data-connectflag', connectflag);
    if (!norefresh) {
      update_button_event();
      refresh();
    }
  }


  function create_flowchart() {
    // first index
    var fst_a = preview_line.map(function(i, e) {
      var v = -1;
      $(this).children().each(function(j, c) {
        if ($(this).attr('data-key') != "void") { v = j; return false; }
      });
      return v;
    }).get();
    for (var i=fst_a.length; i--; ) {
      fst_a[i] = (fst_a[i] == -1 ? null : fst_a[i]);
    }
    // last index
    var lst_a = preview_line.map(function(i, e) {
      var v = -1;
      $($(this).children().get().reverse()).each(function(j, c) {
        if ($(this).attr('data-key') != "void") {
          v = $(e).children().length - (j+1); return false;
        }
      });
      return v;
    }).get();
    for (var i=lst_a.length; i--; ) {
      lst_a[i] = (lst_a[i] == -1 ? null : lst_a[i]);
    }
    // num of items
    var num_a = preview_line.map(function(i, e) {
      return fst_a[i] != null ? lst_a[i] - fst_a[i] + 1 : 0;
    }).get();
    if (Math.max.apply(null, num_a) == 0) { return false; }
    // check row/column size.
    var rcsize = {
      x: (function() {
        var a = null, b = 0;
        for (var i=0; i < num_a.length; i++) {
          if (num_a[i] != 0) { a = i; break; }}
        if (a == null) { return 0; }
        for (var i=num_a.length; i--; ) {
          if (num_a[i] != 0) { b = i; break; }}
        return b - a + 1;
        })(),
      y: 1 + Math.max.apply(null, lst_a)
        - Math.min.apply(null, $.map(fst_a, function(e, i) { return e; }))
    };
    // shift
    var shift_a = {
      x: (function() {
        var z = 0;
        for (var j=0; j<num_a.length; j++) { if(num_a[j] != 0) { z=j; break; }}
        return z;
      })(),
      y: Math.min.apply(null, $.map(fst_a, function(e, i) { return e; }))
    };
    // calc canvas size
    var width = itemprop.width*rcsize.x + itemprop.xmargin*rcsize.x
      + itemprop.padding*2;
    var height = itemprop.height*rcsize.y + itemprop.ymargin*rcsize.y
      + itemprop.padding*2;
    // size
    size = {x: itemprop.width + itemprop.xmargin,
            y: itemprop.height + itemprop.ymargin};
    canvas_container.html(
      '<canvas id="canvas" width="' + width + '" height="' + height + '"></canvas>'
        + '<img id="image" title="右クリックで保存" alt="">'
    );
    var canvas = $('#canvas')[0];
    if ( !canvas || !canvas.getContext ) { return ; }
    var ctx = canvas.getContext('2d');
    ctx.font = itemprop.fsize + "px " + itemprop.font;
    ctx.lineWidth = itemprop.itemlw
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#ffffff";
    ctx.translate(itemprop.padding, itemprop.padding);
    ctx.save();
    ctx.lineWidth = itemprop.lw
    preview_line.each(function(x) {
      if (num_a[x] == 0) { return true; }
      $(this).children('.pv_items').each(function(y) {
        ctx.translate((x-shift_a.x)*size.x, (y-shift_a.y)*size.y);
        if (+$(this).attr('data-connectflag')) {
          ctx.beginPath();
          ctx.moveTo(0.5*size.x, 0.5*size.y);
          ctx.lineTo(0.5*size.x, -0.5*size.y);
          ctx.stroke();
        }
        ctx.translate(-(x-shift_a.x)*size.x, -(y-shift_a.y)*size.y);
      });
    });
    ctx.restore();
    preview_line.each(function(x) {
      if (num_a[x] == 0) { return true; }
      $(this).children('.pv_items').each(function(y) {
        ctx.translate((x-shift_a.x)*size.x, (y-shift_a.y)*size.y);
        itembuttons_alist[$(this).attr('data-key')][3](ctx, $(this).children(".pv_text").val().split('\n'));
        ctx.translate(-(x-shift_a.x)*size.x, -(y-shift_a.y)*size.y);
      });
    });
    $('#image')[0].src = canvas.toDataURL();
  }

  function create_itembuttons() {
    var i = 0;
    menu_button_container.append(
      $.map(itembuttons_alist, function(val, key) {
        i = (i + 1) % button_linenum;
        return '<div id="itembutton_' + key
          + '", class="itembutton button" title="'
          + val[4] + '">' + val[0] + '</div>' + (i == 0 ? '<br>' : "");
      }).join("")
    );
    itembuttons = $('.itembutton');
    itembuttons.each(function(i, b) {
      $(b).on(click_event, function(e) {
        append_item($(this).attr("id").split("_")[1], false, 1, false, false);
      });
    });
  }

  function get_data(num) {
    FMData[num] = JSON.parse(JSON.stringify(FMData_init[num]));
    preview_line.each(function(i) {
      $(this).children('.pv_items').each(function() {
        FMData[num][i].push([$(this).attr("data-key"),
                             $(this).children('.pv_text').val(),
                             +$(this).attr('data-connectflag')]);
      });
    });
  }

  function update_loadbuttons() {
    var s = 0;
    for (var i=1; i < FMData.length; i++) {
      s = 0;
      for (var j = 0; j < LINENUM; j++) {
        s += FMData[i][j].length;
      }
      $('.lbutton').eq(i-1).attr("data-ocp", "" + (s == 0 ? 0 : 1))
      .css(s == 0 ?
           {'background': '#999'} :
           {'background': '#ddf'});
    }
  }

  function add_hook_buttons() {
    $('#submit_button').on(click_event, function() {
      create_flowchart();
      get_data(0);
      save();
      if (smart_phone_flag) {
        $('html,body').animate({
          scrollTop: canvas_container.offset().top + "px"
        }, 500, 'swing');
      }
    });
    $('.sbutton').on(click_event, function(e) {
      var i = +$(this).attr("data-snum");
      $(this).blur();
      get_data(i);
      update_loadbuttons();
      save();
      e.stopPropagation();
      return false;
    });
    $('.lbutton').on(click_event, function(e) {
      $(this).blur();
      update(+$(this).attr("data-snum"));
      save();
      create_flowchart();
      e.stopPropagation();
      return false;
    });
    $('#allclear_button').on(click_event, function(e) {
      $(this).blur();
      menu_window.hide();
      modal_bg.fadeIn(FADE_WAIT);
      show_window(allclear_window);
      e.stopPropagation();
      return false;
    });
    $('#allclear_yes_button').on(click_event, function(e) {
      allclear_window.blur();
      $(this).blur();
      modal_bg.fadeOut(FADE_WAIT);
      allclear_window.fadeOut(FADE_WAIT);
      allclear(false);
      menu_window.show();
      e.stopPropagation();
      return false;
    });
    $('#allclear_no_button').on(click_event, function(e) {
      allclear_window.blur();
      $(this).blur();
      modal_bg.fadeOut(FADE_WAIT);
      allclear_window.fadeOut(FADE_WAIT);
      menu_window.show();
      e.stopPropagation();
      return false;
    });
    // load
    $('#load_button').on(click_event, function(e) {
      output_window.blur();
      $(this).blur();
      menu_window.hide();
      $('#json_load').val("");
      modal_bg.fadeIn(FADE_WAIT);
      show_window(load_window);
      e.stopPropagation();
      return false;
    });
    $('#load_OK_button').on(click_event, function(e) {
      output_window.blur();
      $(this).blur();
      menu_window.show();
      if ($('#json_load').val() != "") {
        FMData[0] = JSON.parse($('#json_load').val());
        $('#json_load').val("");
        update(0);
      }
      modal_bg.fadeOut(FADE_WAIT);
      load_window.fadeOut(FADE_WAIT);
      e.stopPropagation();
      return false;
    });
    // output
    $('#output_button').on(click_event, function(e) {
      output_window.blur();
      $(this).blur();
      menu_window.hide();
      get_data(0);
      $('#json_output').html(JSON.stringify(FMData[0]));
      modal_bg.fadeIn(FADE_WAIT);
      show_window(output_window);
      e.stopPropagation();
      return false;
    });
    $('#output_OK_button').on(click_event, function(e) {
      output_window.blur();
      $(this).blur();
      menu_window.show();
      $('#json_output').html("");
      modal_bg.fadeOut(FADE_WAIT);
      output_window.fadeOut(FADE_WAIT);
      e.stopPropagation();
      return false;
    });
    $('#help_button').on(click_event, function(e) {
      help_window.blur();
      $(this).blur();
      menu_window.hide();
      modal_bg.fadeIn(FADE_WAIT);
      show_window(help_window);
      e.stopPropagation();
      return false;
    });
    $('#help_OK_button').on(click_event, function(e) {
      help_window.blur();
      $(this).blur();
      menu_window.show();
      modal_bg.fadeOut(FADE_WAIT);
      help_window.fadeOut(FADE_WAIT);
      e.stopPropagation();
      return false;
    });
    // modal-window
    modal_bg.on(click_event, function(e) {
      modal_bg.blur();
      menu_window.show();
      allclear_window.blur();
      output_window.blur();
      $('#json_output').html("");
      modal_bg.fadeOut(FADE_WAIT);
      allclear_window.fadeOut(FADE_WAIT);
      output_window.fadeOut(FADE_WAIT);
      load_window.fadeOut(FADE_WAIT);
      help_window.fadeOut(FADE_WAIT);
      e.stopPropagation();
      return false;
    });
    $('.window').on(click_event, function(e) {
      e.stopPropagation();
    });
  }

  function create_preview_line() {
    preview_container.html("");
    for (var i=LINENUM; i--;) {
      preview_container.append(
        '<div class="flowchart_preview_container_line"></div>'
      );
    }
    preview_line = $('.flowchart_preview_container_line');
    preview_line.sortable({
      cancel: '.button,textarea,input',
      connectWith: '.flowchart_preview_container_line',
      opacity: 0.7,
      placeholder: 'ui-state-highlight'
    })
      .disableSelection()
      .delegate('input,textarea', 'click',
                function(ev){ ev.target.focus(); });
  }

  function init() {
    footer.html("Flowchart Maker -- v." + VERSION)
    $('.yes_button').html('はい');
    $('.no_button').html('いいえ');
    $('.ok_button').html('OK');
    create_itembuttons();
    if (smart_phone_flag) { smart_phone_init(); } else { pc_init(); }
    menu_window.draggable(menu_window_prop);
  }

  function go() {
    agent_checker();
    create_preview_line();
    init();
    add_hook_buttons();
    load();
    update_loadbuttons();
    update(0);
    create_flowchart();
  }

  go();
}


$(function() {
  flowchartmaker();
});
