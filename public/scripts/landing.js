let i = 0, j = 1;

for(var k=$(".img-slide").length; k>0; k--)
{
    $(".img-slide").eq(k).hide();
}

window.setInterval(function(){
    if(i >= $(".img-slide").length){
        i = 0;
    }
    if(j >= $(".img-slide").length){
        j = 0;
    }
    $(".img-slide").eq(j++).fadeIn(2000);
    $(".img-slide").eq(i++).delay(500).fadeOut(2000);
}, 4000);
