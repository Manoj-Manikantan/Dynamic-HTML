"use strict";
$(document).ready(function(){
    const targetClassElements = $(".target");
    console.log(targetClassElements.length);
let count = targetClassElements.length;
    const goodJobParagraph = $("#done");
  window.onload = initialSetup;

    const yellowDiv = $("#choices");
    yellowDiv.on("click", function () {
        yellowDiv.toggle();
        spanChoice();
    });

    const orangeDive = $("#displayChoices");
    orangeDive.on("click",function () {
       yellowDiv.toggle();
       spanChoice();
    });

    $("#game > header").on("click",function () {
        $(this).toggle(1000);
    });
    let click =0;
   targetClassElements.on({

       mouseenter: function(){
           $(this).css({"backgroundColor":"lightgreen"});
       },
       mouseleave :  function () {
           $(this).css({"backgroundColor":"white"});
       },
       click: function(){
          click++;
           $(this).text("\u2714").addClass("selected").fadeOut("slow");
           if(click<=1)
           {
               $("#game > header").slideUp(1000);
           }

           count--;
           console.log(count);
           if(count === 0)
           {
               goodJobParagraph.show().slideDown(1000);
               goodJobParagraph.on("click",function () {
                   goodJobParagraph.slideUp();
                   targetClassElements.removeClass("selected");
                   targetClassElements.text("A").show();
               })
           }
       }
    }
   );

    function initialSetup()
    {
        goodJobParagraph.toggle();
    }

    function spanChoice()
    {
        if($("#displayChoices > span").text() === "-")
        {
            $("#displayChoices > span").text("+");
        }
        else
        {
            $("#displayChoices > span").text("-");
        }
    }

});
