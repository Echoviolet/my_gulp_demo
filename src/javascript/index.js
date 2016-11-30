/**
 * Created by echo on 16/11/21.
 */

$(document).ready(function(){
   'use strict';

   var nIntervId = setInterval(randomNumber,1000/16);
   function randomNumber(){
       var k = $('.c0').text(Math.floor(Math.random()*10));
       var n = $('.c1').text(Math.floor(Math.random()*10));
       var o= $('.c2').text(Math.floor(Math.random()*10));
       var w =$('.c3').text(Math.floor(Math.random()*10));
       var p = $('.c5').text(Math.floor(Math.random()*10));
       var e = $('.c6').text(Math.floor(Math.random()*10));
       var o1 = $('.c7').text(Math.floor(Math.random()*10));
       var p1 = $('.c8').text(Math.floor(Math.random()*10));
       var l = $('.c9').text(Math.floor(Math.random()*10));
       var e1 = $('.c10').text(Math.floor(Math.random()*10));
       // total();
       // function total(){
       //     if(k == 0 || n == 1 || o == 2){
       //         clearInterval(nIntervId);
       //     }
       // }

   }

    $(window).resize(function() {
        focusBackgroundReposition();
    });

    focusBackgroundReposition();
    function focusBackgroundReposition() {
        var offset = -295;
        var newPosition = ($(window).width() / 2) + offset;
        $('div#focus-container').css({'background-position': newPosition + 'px top'});
    }

});
