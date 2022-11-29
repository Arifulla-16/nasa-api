var url1= "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date="
var url2= "&api_key=Mtxi0p1ya1tcUTJt2hlf6X4BZI1msEj4kFfl75GV";

var evd=0;

var ddatta;

var curpho=0;
var totalpho;
var items = 5;

$(window).on("load",()=>{
    const paramsString = window.location.href;
    const searchParams = new URLSearchParams(paramsString);

    var paras = [];
    for (const p of searchParams) {
        paras.push(p[1]);
    }

    if(paras[0]!=""){
        $(".loader").fadeIn();
        $(".form").css("display","none");
        $(".postload").css("display","block");
        // $(".postload").css("flex-direction","column");
        let fetchRes = fetch(url1+paras[0]+url2);
        fetchRes.then(res => res.json()).then(data => {
            ddatta=data;
            var imgattr = '<img class="targets" src="">'
            totalpho=data["photos"].length;
            if(totalpho==0){
                alert("no pics");
            }
            if(totalpho<5){
                items=data["photos"].length;
            }
            for(var i=0;i<items;i++){
                $(".postloadl").append(imgattr);
                curpho++;
            }
            $.each($(".targets").toArray(),(idx,val)=>{
                $(val).attr("src",data["photos"][idx].img_src);

            });
        })
        setTimeout(()=>{
            $(".loader").fadeOut();
        },4000);
    }
    else{
        setTimeout(()=>{
            $(".loader").fadeOut();
        },1000);
    }


});

$(".form").submit(()=>{
    if($("#seldate").val()==""){
        if(evd==0){
            $(".guide").append("<a>Enter valid date</a>");
            evd=1;
        }
        return false;
    }
});

$("#reset").click(()=>{
    $("#seldate").val("");
    $(".guide>a").remove();
    evd=0;
});

$("#next").click(()=>{
    console.log(curpho);
    if(curpho==totalpho-1){
        return;
    }
    if(totalpho-curpho>=5){
        $.each($(".targets").toArray(),(idx,val)=>{
            $(val).attr("src","");
            $(val).attr("src",ddatta["photos"][curpho++].img_src);
        });
    }
    else{
        $.each($(".targets").toArray(),(idx,val)=>{
            if(curpho<totalpho){
                $(val).attr("src","");
                $(val).attr("src",dddatta["photos"][curpho++].img_src);
            }
        });
    }
    console.log(curpho);
});

$("#prev").click(()=>{
    console.log(curpho);
    if(curpho==0){
        return;
    }
    var temp=curpho-5;
    if(curpho>=10){
        $.each($(".targets").toArray(),(idx,val)=>{
            $(val).attr("src","");
            $(val).attr("src",ddatta["photos"][--temp].img_src);
        });
        curpho-=5;
    }
    else{
        $.each($(".targets").toArray(),(idx,val)=>{
            if(curpho>5){
                curpho--;
                $(val).attr("src","");
                $(val).attr("src",dddatta["photos"][curpho-5].img_src);
            }
        });
    }
    console.log(curpho);
});