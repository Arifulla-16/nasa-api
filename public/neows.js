var url1 = "https://api.nasa.gov/neo/rest/v1/feed?start_date=";
var url2 = "&end_date=";
var url3 = "&api_key=Mtxi0p1ya1tcUTJt2hlf6X4BZI1msEj4kFfl75GV";

var excntr = 0;
var dacntr = 0;
var validator = 0;


$("#form").submit(()=>{
    if((($("#st_date").val()=="") || ($("#ed_date").val()==""))){
        if(validator==0){
            $(".guide").append("<a>Please enter valid dates.</a>");
            validator=1;
            return false;
        }  
        else{
            return false;
        }
    }
    if(excntr==1 || dacntr==1){
        return false;
    } 
});


$(window).on("load",()=>{

    const paramsString = window.location.href;
    const searchParams = new URLSearchParams(paramsString);

    var paras = [];

    if(searchParams.has('ed_date')){
        $(".loader").fadeIn();
        $(".preload").css("display","none");
        $(".icount").css("display","flex");
    }

    for (const p of searchParams) {
        paras.push(p[1]);
    }

    if(paras.length==2){
        let fetchRes = fetch(url1+paras[0]+url2+paras[1]+url3);
        fetchRes.then(res => res.json()).then(data => {
            $(".postload").css("box-shadow", "0 0 5px 5px #888888");
            var asnippet = '<a class="dname"><span>Name : </span></a><a class="dmag"><span>Magnitude : </span></a><a class="ddia"><span>Diameter : </span></a><a class="dh"><span>Is Hazardrous : </span></a><a class="dcdate"><span>Closest Approach Date : </span></a><a class="drv"><span>Relative Velocity : </span></a><a class="dmd"><span>Miss Distance : </span></a>';
            var objs = data.near_earth_objects;
            var turner = 0;
            var count = data.element_count;
            $(".icount").append(count);
            if((count+1)%4==0){
                $(".postload").css("background-color","white");
            }
            else{
                $(".postload").css("background-color","black");
            }
            if(count%2!=0){
                count++;
            }
            $(".postload").append('<span class="hf2 targets">'+asnippet+'</span>');
            for(let i=0;i<count-1;i=i+2){
                if(i==count-2||i==count-3){
                    if(turner==0){
                        $(".postload").append('<span class="hf1 targets last"></span>');
                    }
                    else{
                        $(".postload").append('<span class="hf2 targets last"></span>');
                    }
                    break;
                }
                if(turner==0){
                    $(".postload").append('<span class="hf1 targets">'+asnippet+'</span>');
                    $(".postload").append('<span class="hf1 targets">'+asnippet+'</span>');
                    turner=1;
                }
                else{
                    $(".postload").append('<span class="hf2 targets">'+asnippet+'</span>');
                    $(".postload").append('<span class="hf2 targets">'+asnippet+'</span>');
                    turner=0;
                }
            }

            var datenum = 0 ;
            var datesize = Object.keys(objs).length ;
            var astnum = 0 ;
            var astsize = objs[Object.keys(objs)[datenum]].length ;


            $.each($(".targets").toArray(),(idx,val)=>{
                // console.log(datenum+" "+astnum+"-->"+datesize+" "+astsize);
                // console.log(objs[Object.keys(objs)[datenum]][astnum]["name"]);
                $(val).find(".dname").append(objs[Object.keys(objs)[datenum]][astnum]["name"]);
                $(val).find(".dmag").append(objs[Object.keys(objs)[datenum]][astnum]["absolute_magnitude_h"]);
                $(val).find(".ddia").append(parseFloat(objs[Object.keys(objs)[datenum]][astnum]["estimated_diameter"]["kilometers"]["estimated_diameter_max"]).toFixed(2)+" km");
                console.log(objs[Object.keys(objs)[datenum]][astnum]["is_potentially_hazardous_asteroid"]);
                if(objs[Object.keys(objs)[datenum]][astnum]["is_potentially_hazardous_asteroid"]===false){
                    $(val).find(".dh").append("False");
                }
                else{
                    $(val).find(".dh").append("True");
                }
                $(val).find(".dcdate").append(objs[Object.keys(objs)[datenum]][astnum]["close_approach_data"][0]["close_approach_date_full"]);
                $(val).find(".drv").append(parseFloat(objs[Object.keys(objs)[datenum]][astnum]["close_approach_data"][0]["relative_velocity"]["kilometers_per_hour"]).toFixed(2)+" kmph");
                $(val).find(".dmd").append(parseFloat(objs[Object.keys(objs)[datenum]][astnum]["close_approach_data"][0]["miss_distance"]["lunar"]).toFixed(2)+" lunar");


                if(astnum+1==astsize){
                    astnum=0;
                    if(datenum+1==datesize){
                        return false;
                    }
                    else{
                        datenum++;
                        astsize = objs[Object.keys(objs)[datenum]].length ;
                    }
                }
                else{
                    astnum++;
                }
                setTimeout(()=>{
                    $(".loader").fadeOut();
                },1000);
            });
        });

    }
    else{
        setTimeout(()=>{
            $(".loader").fadeOut();
        },1000);
    }


});

$("#reset").click(()=>{
    $("#st_date").val("");
    $("#ed_date").val("");
    if(excntr==1 || dacntr==1 || validator==1){
        $(".guide>a").remove();
        excntr=0;
        dacntr=0;
        validator=0;
    }
});


$("#ed_date").on('input',()=>{
    datecheck();
});
$("#st_date").on('input',()=>{
    datecheck();
});


function datecheck(){
    if(($("#st_date").val()!="") && ($("#ed_date").val()!="")){
        var s = new Date($("#st_date").val());
        var e = new Date( $("#ed_date").val());
        if((e-s)/(1000*60*60*24)>7){
            if(dacntr==1 || validator==1){
                $(".guide>a").remove();
                dacntr=0;
                validator=0;
            }
            if(excntr==0){
                $(".guide").append("<a>Date range exceeded</a>");
                excntr=1;
            }
        }
        else if((e-s)/(1000*60*60*24)<=7 && (e-s)/(1000*60*60*24)>=0 && excntr==1){
            $(".guide>a").remove();
            excntr=0;
        }
        
        if(s>e){
            if(excntr==1 || validator==1){
                $(".guide>a").remove();
                excntr=0;
                validator=0;
            }
            if(dacntr==0){
                $(".guide").append("<a>Date sequence error</a>");
                dacntr=1;
            }
        }
        else if(dacntr==1){
            $(".guide>a").remove();
            dacntr=0;
        }
    }
}