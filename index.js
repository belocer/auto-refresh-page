function defPosition(event) {
    var x = y = 0;
    var event = event || window.event;
     
    // Получаем координаты клика по странице, то есть абсолютные координаты клика.
 
    if (document.attachEvent != null) { // Internet Explorer & Opera
        x = window.event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
        y = window.event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    } else if (!document.attachEvent && document.addEventListener) { // Gecko
        x = event.clientX + window.scrollX;
        y = event.clientY + window.scrollY;
    } 
     
    //Определяем границы объекта, в нашем случае картинки.
 
    y0=document.getElementById("kartina").offsetTop;
    x0=document.getElementById("kartina").offsetLeft;
         
    // Пересчитываем координаты и выводим их алертом.
 
    x = x-x0;
    y = y-y0;
     
    console.log(x+'|'+y);
}