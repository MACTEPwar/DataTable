/** Переменные для удобного пользования*/
var table = $(".table_container");
var header = table.find(".thead_container");
var body = table.find(".tbody_container");
var scroll_right = body.find(".scrollbar_right");
var tumb_right = scroll_right.find(".right_tumb");
var button_right = tumb_right.find(".right_scroll_btn");
var scroll_bottom = body.find(".scrollbar_bottom");
var tumb_bottom = scroll_bottom.find(".bottom_tumb");
var button_bottom = tumb_bottom.find(".bottom_scroll_btn");
var dataView = body.find(".data_container");
var dataContainer = dataView.find(".data");

/** Указывает показан скролл или нет */
var isScrollRight = false;
var isScrollBottom = false;

$(document).ready(function () {
    display();
    calculateSizeScrollButtons();

    /** При нажатии на правый скрол (кнопку) */
    button_right.on("mousedown",function(e){
        var curTop = $(this).position().top;
        var positionClickY = e.pageY - (e.clientY - scroll_right.get(0).offsetTop) + curTop;
        var button = $(this);

        /** При передвижении мышки после нажатия правого крола (кнопки) */
        $(document).on("mousemove",function(ee){
            moveAt(ee);
        });

        /** При отпускании мышки после нажатия правого крола (кнопки) */
        $(document).on("mouseup", function() {
            $(document).off("mousemove");
        });

        /** Двигать */
        function moveAt(eee) {
            var deltaY = e.pageY - (eee.clientY - scroll_right.get(0).offsetTop);
            var move_top = positionClickY - deltaY;
            if (move_top >= 0 && move_top <= (tumb_right.height() - button_right.height())){
                button.css("top",move_top);
            } else if (move_top < 0) {
                button.css("top",0);
            } else if (move_top > (tumb_right.height() - button_right.height())) {
                button.css("top",tumb_right.height() - button_right.height());
            }
            var pecScroll = (button.position().top * 100) /tumb_right.height();
            var curScrollCont = (dataContainer.get(0).scrollHeight * pecScroll) / 100;
            dataView.scrollTop(curScrollCont);
        }
    });

    // table.resize(function(){
    //     display();
    //     calculateSizeScrollButtons();
    // });
    var frame = document.querySelector(".table_container .table_container_frame");

    frame.onresize = function(){
        alert('Размеры div #Test изменены.');
    }
    // $(".table_container .table_container_frame").resize(function(){
    //     console.log("resize");
    // });


     /** При нажатии на нижний скрол (кнопку) */
     button_bottom.on("mousedown",function(e){
        var curLeft = $(this).position().left;
        var positionClickX = e.pageX - (e.clientX - scroll_bottom.get(0).offsetLeft) + curLeft;
        var button = $(this);

        /** При передвижении мышки после нажатия нижнего крола (кнопки) */
        $(document).on("mousemove",function(ee){
            moveAt(ee);
        });

        /** При отпускании мышки после нажатия нижнего крола (кнопки) */
        $(document).on("mouseup", function() {
            $(document).off("mousemove");
        });

        /** Двигать */
        function moveAt(eee) {
            var deltaX = e.pageX - (eee.clientX - scroll_bottom.get(0).offsetLeft);
            var move_left = positionClickX - deltaX;
            if (move_left >= 0 && move_left <= (tumb_bottom.width() - button_bottom.width())){
                button.css("left",move_left);
            } else if (move_left < 0) {
                button.css("left",0);
            } else if (move_left > (tumb_bottom.width() - button_bottom.width())) {
                button.css("left",tumb_bottom.width() - button_bottom.width());
            }
            var pecScroll = (button.position().left * 100) /tumb_bottom.width();
            var curScrollCont = (dataContainer.get(0).scrollWidth * pecScroll) / 100;
            dataView.scrollLeft(curScrollCont);
            header.scrollLeft(curScrollCont);
        }
    });

    /** прокрутка колесиком и синхронизация скорллбар-кнопки (правой) */
    body.on("wheel", function(e){
        dataView.scrollTop(dataView.scrollTop() + e.originalEvent.deltaY);
        var scrollTopPec =  dataView.scrollTop() * 100 / dataContainer.height();
        var scrollDeltaPx = tumb_right.height() * scrollTopPec / 100;
        button_right.css("top",`${scrollDeltaPx}px`);
    });

});

/** проверки нужно или не нужн опоказывать скроллбары. Также поправляет некоторые стили. */
function display() {
    var dataContainerView = table.find(".data_container");
    var dataContainer = dataContainerView.find(".data");

    if (dataContainer.prop('scrollWidth') <= dataContainerView.width()) {
        scroll_bottom.css("display", "none");
        dataContainerView.height("100%");
        scroll_right.height("100%");
        isScrollBottom = false;
    } else {
        isScrollBottom = true;
    }

    if (dataContainer.prop('scrollHeight') <= dataContainerView.height()) {
        scroll_right.css("display", "none");
        dataContainerView.width("100%");
        scroll_bottom.width("100%");
        isScrollRight = false;

    } else {
        isScrollRight = true;
        header.css("margin-right","1rem");
    }
}

/** Высчитывает величину кнопок для скролла */
function calculateSizeScrollButtons() {
    var dataContainerView = table.find(".data_container");
    var dataContainer = dataContainerView.find(".data");

    if (isScrollRight) {
        var all = parseFloat(dataContainer.prop('scrollHeight'));
        var view = parseFloat(dataContainerView.height());
        var pec = (view * 100) / all;

        button_right.height(`${pec}%`);
    }
    if (isScrollBottom) {
        var all = parseFloat(dataContainer.prop('scrollWidth'));
        var view = parseFloat(dataContainerView.width());
        var pec = (view * 100) / all;

        button_bottom.width(`${pec}%`);
    }
}