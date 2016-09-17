
function flowchartmaker() {
  var VERSION = "1.0";
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
       ctx.beginPath();
       ctx.arc(r, h/2, r, deg2rad(90), deg2rad(270));
       ctx.lineTo(w-r, m);
       ctx.arc(w-r, h/2, r, deg2rad(270), deg2rad(90));
       ctx.closePath();
       ctx.fill();
       filltext(ctx, str, w/2, h/2);
       ctx.stroke();
     }],
    end:
    ["end", "end", "end",
     function(ctx, str) {
       var w = itemprop.width, h = itemprop.height;
       var m = ~~(h/12);
       var r = h*0.5 - m;
       ctx.beginPath();
       ctx.arc(r, h/2, r, deg2rad(90), deg2rad(270));
       ctx.lineTo(w-r, m);
       ctx.arc(w-r, h/2, r, deg2rad(270), deg2rad(90));
       ctx.closePath();
       ctx.fill();
       ctx.stroke();
       filltext(ctx, str, w/2, h/2);
     }],
    terminal:
    ["term", "terminal", "",
     function(ctx, str) {
       var w = itemprop.width, h = itemprop.height;
       var m = ~~(h/12);
       var r = h*0.5 - m;
       ctx.beginPath();
       ctx.arc(r, h/2, r, deg2rad(90), deg2rad(270));
       ctx.lineTo(w-r, m);
       ctx.arc(w-r, h/2, r, deg2rad(270), deg2rad(90));
       ctx.closePath();
       ctx.fill();
       ctx.stroke();
       filltext(ctx, str, w/2, h/2);
     }],
    process:
    ["proc", "process", "",
     function(ctx, str) {
       var w = itemprop.width, h = itemprop.height;
       ctx.beginPath();
       ctx.moveTo(0, 0);
       ctx.lineTo(w, 0);
       ctx.lineTo(w, h);
       ctx.lineTo(0, h);
       ctx.closePath();
       ctx.fill();
       ctx.stroke();
       filltext(ctx, str, w/2, h/2);
     }],
    decision:
    ["deci", "decision", "",
     function(ctx, str) {
       var w = itemprop.width, h = itemprop.height;
       ctx.beginPath();
       ctx.moveTo(w/2, h/2);
       ctx.lineTo(w/2 + size.x, h/2);
       ctx.lineTo(w/2 + size.x, h/2 + size.y);
       ctx.stroke();
       ctx.beginPath();
       ctx.moveTo(w/2, 0);
       ctx.lineTo(w, h/2);
       ctx.lineTo(w/2, h);
       ctx.lineTo(0, h/2);
       ctx.closePath();
       ctx.fill();
       ctx.stroke();
       filltext(ctx, str, w/2, h/2, ~~(0.9*itemprop.fsize));
     }],
    io:
    ["I/O", "I/O", "",
     function(ctx, str) {
       var w = itemprop.width, h = itemprop.height;
       var m = ~~(h/12);
       ctx.beginPath();
       ctx.moveTo(0.5*h, m);
       ctx.lineTo(w, m);
       ctx.lineTo(w - 0.5*h, h - 2*m);
       ctx.lineTo(0, h - 2*m);
       ctx.closePath();
       ctx.fill();
       ctx.stroke();
       filltext(ctx, str, w/2, h/2);
     }],
    preparation:
    ["prep", "preparation", "",
     function(ctx, str) {
       var w = itemprop.width, h = itemprop.height;
       var m = ~~(h/24);
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
     }],
    returnline:
    ["lconv", "leftconv", "",
     function(ctx, str) {
       var w = itemprop.width, h = itemprop.height;
       ctx.beginPath();
       ctx.moveTo(0.5*w, 0.5*h);
       ctx.lineTo(0.5*w - size.x, 0.5*h);
       ctx.stroke();
       ctx.save();
       ctx.fillStyle = "#000000";
       ctx.beginPath();
       ctx.moveTo(0.5*w - size.x, 0.5*h);
       ctx.lineTo(0.5*w - size.x + 0.1*w, 0.5*h - 0.05*w);
       ctx.lineTo(0.5*w - size.x + 0.1*w, 0.5*h + 0.05*w);
       ctx.closePath();
       ctx.fill();
       ctx.restore();
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
  var preview_line = $('.flowchart_preview_container_line');
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
    preview_container.css({
      'display': 'inline-block',
      'width': '50%',
      'height': '600px'
    });
    canvas_container.css({
      'display': 'inline-block',
      'width': '50%',
      'height': '600px'
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
              + '<div class="itemclose_button button">x</div></div>')
      .append('<textarea class="pv_text"'
              + (key == 'void' ? ' disabled="disabled"' : "") + '">'
              + itembuttons_alist[key][2] + '</textarea>')
      .appendTo('.flowchart_preview_container_line:first');
    $('.itemclose_button').off(click_event, "**").on(click_event, function() {
      $(this).parent().parent().remove();
      preview_line.sortable('refresh');
    });
    preview_line.sortable('refresh');
  }


  function init() {
    agent_checker();
    footer.html("Flowchart Maker -- v." + VERSION)
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
    });
  }

  function create_flowchart() {
    // check size of each line.
    var num_a = preview_line.map(function(i, e) {
      return $(this).children().length;
    }).get();
    var void_a = preview_line.map(function(i, e) {
      var v = 0;
      $(this).children().each(function(j, c) {
        if ($(this).attr('data-key') == "void") { v++; }
        else { return false; }
      });
      return v;
    }).get();
    console.log(num_a);
    console.log(void_a);
    // check row/column size.
    var max_a = {x: $.grep(num_a, function(e, i) { return (e != 0); }).length,
                 y: Math.max.apply(null, num_a)};
    if (max_a.x == 0 || max_a.y == 0) { return ; }
    // calc canvas size
    var width = itemprop.width*max_a.x + itemprop.xmargin*(max_a.x - 1)
      + itemprop.padding*2;
    var height = itemprop.height*max_a.y + itemprop.ymargin*(max_a.y - 1)
      + itemprop.padding*2;
    // size
    size = {x: itemprop.width + itemprop.xmargin,
            y: itemprop.height + itemprop.ymargin};
    canvas_container.html(
      '<canvas id="canvas" width="' + width + '" height="' + height + '"></canvas>'
        + '<img id="image" width="' + ~~(width/2) + '" height="' + ~~(height/2) + '">'
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
      ctx.beginPath();
      ctx.moveTo(x*size.x + itemprop.width/2, void_a[x]*size.y + itemprop.height/2);
      ctx.lineTo(x*size.x + itemprop.width/2, (num_a[x]-1)*size.y + itemprop.height/2);
      ctx.closePath();
      ctx.stroke();
      $(this).children('.pv_items').each(function(y) {
        ctx.translate(x*size.x, y*size.y);
        itembuttons_alist[$(this).attr('data-key')][3](ctx, $(this).children(".pv_text").val().split('\n'));
        ctx.translate(-x*size.x, -y*size.y);
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
      $(b).click(function(e) {
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
