
function flowchartmaker() {
  var VERSION = "1.2";
  var LINENUM = 3;
  var button_linenum = 4;
  var itemprop = {width: 360, height: 120, xmargin: 40, ymargin: 40,
                  padding: 20, fsize: 42, font: "sans-serif"};
  var menu_window_prop = {
    containment: "#Flowchartmaker",
    cancel: "input,textarea,button,select,option,.button,#menu_window_1",
    opacity: 0.5,
    scroll: false,
    zIndex: 999
  };

  var itembuttons_alist = {
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
     }],
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
     }],
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
     }],
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
     }],
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
     }],
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
     }],
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
     }],
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
     }],
    ljoin:
    ["-->┃", "join-L", "",
     function(ctx, str) {
       var w = itemprop.width, h = itemprop.height;
       ctx.translate(itemprop.xmargin/2, itemprop.ymargin/2);
       ctx.beginPath();
       ctx.moveTo(0, 0.5*h);
       ctx.lineTo(w/2, 0.5*h);
       ctx.stroke();
       ctx.save();
       ctx.fillStyle = "#000000";
       ctx.beginPath();
       ctx.moveTo(0.5*w, 0.5*h);
       ctx.lineTo(0.5*w - 0.1*w, 0.5*h - 0.05*w);
       ctx.lineTo(0.5*w - 0.1*w, 0.5*h + 0.05*w);
       ctx.closePath();
       ctx.fill();
       ctx.restore();
       ctx.translate(-itemprop.xmargin/2, -itemprop.ymargin/2);
     }],
    rjoin:
    ["┃<--", "join-R", "",
     function(ctx, str) {
       var w = itemprop.width, h = itemprop.height;
       ctx.translate(itemprop.xmargin/2, itemprop.ymargin/2);
       ctx.beginPath();
       ctx.moveTo(w, 0.5*h);
       ctx.lineTo(w/2, 0.5*h);
       ctx.stroke();
       ctx.save();
       ctx.fillStyle = "#000000";
       ctx.beginPath();
       ctx.moveTo(0.5*w, 0.5*h);
       ctx.lineTo(0.5*w + 0.1*w, 0.5*h - 0.05*w);
       ctx.lineTo(0.5*w + 0.1*w, 0.5*h + 0.05*w);
       ctx.closePath();
       ctx.fill();
       ctx.restore();
       ctx.translate(-itemprop.xmargin/2, -itemprop.ymargin/2);
     }],
    lline:
    ["┫", "line-L", "",
     function(ctx, str) {
       var w = itemprop.width, h = itemprop.height;
       ctx.translate(itemprop.xmargin/2, itemprop.ymargin/2);
       ctx.beginPath();
       ctx.moveTo(-itemprop.xmargin, 0.5*h);
       ctx.lineTo(0.5*w, 0.5*h);
       ctx.stroke();
       ctx.save();
       ctx.textAlign = "left";
       filltext(ctx, str, 0, ~~(h/4), ~~(0.8*itemprop.fsize));
       ctx.restore();
       ctx.translate(-itemprop.xmargin/2, -itemprop.ymargin/2);
     }],
    rline:
    ["┣", "line-R", "",
     function(ctx, str) {
       var w = itemprop.width, h = itemprop.height;
       ctx.translate(itemprop.xmargin/2, itemprop.ymargin/2);
       ctx.beginPath();
       ctx.moveTo(w+itemprop.xmargin, 0.5*h);
       ctx.lineTo(0.5*w, 0.5*h);
       ctx.stroke();
       ctx.save();
       ctx.textAlign = "right";
       filltext(ctx, str, w, ~~(h/4), ~~(0.8*itemprop.fsize));
       ctx.restore();
       ctx.translate(-itemprop.xmargin/2, -itemprop.ymargin/2);
     }],
    void:
    ["void", "", "", function(ctx, str) { }]
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
  // [Autoset Vars] ---------------------------------------------------
  var itembuttons;
  var click_event = 'click';
  var smart_phone_flag = false;
  var size;

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

  function deg2rad(deg) {
    return deg*Math.PI/180;
  }

  function filltext(ctx, str, x, y, fsize) {
    ctx.save();
    ctx.fillStyle = "#000000";
    ctx.font = fsize + "px " + itemprop.font;
    $.each(str, function(i, e) {
      ctx.fillText(e, x, y + (i - (str.length-1)/2)*itemprop.fsize);
    });
    ctx.restore();
  }

  function append_item(key) {
    $('<div class="pv_items noselect pv_item_' + key
      + '" data-key="' + key + '"></div>')
      .append('<div>' + itembuttons_alist[key][1]
              + '<div class="itemclose_button button">X</div>'
              + '<div class="itemconnect_button button">C</div>'
              + '</div>')
      .append('<textarea class="pv_text"'
              + (key == 'void' ? ' disabled="disabled"' : "") + '">'
              + itembuttons_alist[key][2] + '</textarea>')
      .appendTo('.flowchart_preview_container_line:eq('
                + ~~(preview_line.length/2) + ')')
      .attr('data-connectflag', 1);
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
    preview_line.sortable('refresh');
  }


  function init() {
    agent_checker();
    footer.html("Flowchart Maker -- v." + VERSION)
    preview_container.html("");
    for (var i=LINENUM; i--;) {
      preview_container.append(
        '<div class="flowchart_preview_container_line"></div>'
      );
    }
    preview_line = $('.flowchart_preview_container_line');
    create_itembuttons();
    if (smart_phone_flag) { smart_phone_init(); } else { pc_init(); }
    menu_window.draggable(menu_window_prop);
    preview_line.sortable({
      cancel: '.button,textarea,input',
      connectWith: '.flowchart_preview_container_line',
      opacity: 0.7,
      placeholder: 'ui-state-highlight'
    })
      .disableSelection()
      .delegate('input,textarea', 'click',
                function(ev){ ev.target.focus(); });
    $('#submit_button').on(click_event, function() {
      create_flowchart();
      if (smart_phone_flag) {
        $('html,body').animate({
          scrollTop: canvas_container.offset().top + "px"
        }, 500, 'swing');
      }
    });
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
        //+ '<img id="image" width="' + ~~(width/2) + '" height="' + ~~(height/2) + '">'
        + '<img id="image">'
    );
    var canvas = $('#canvas')[0];
    if ( !canvas || !canvas.getContext ) { return ; }
    var ctx = canvas.getContext('2d');
    ctx.font = itemprop.fsize + "px " + itemprop.font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#ffffff";
    ctx.translate(itemprop.padding, itemprop.padding);
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
        return '<div id="itembutton_' + key + '", class="itembutton button">'
          + val[0] + '</div>' + (i == 0 ? '<br>' : "");
      }).join("")
    );
    itembuttons = $('.itembutton');
    itembuttons.each(function(i, b) {
      $(b).on(click_event, function(e) {
        append_item($(this).attr("id").split("_")[1]);
      });
    });
  }


  function go() {
    init();
  }
  go();
}


$(function() {
  flowchartmaker();
});
