var url1 = "https://api.nasa.gov/neo/rest/v1/feed?start_date=";
var url2 = "&end_date=";
var url3 = "&api_key=Mtxi0p1ya1tcUTJt2hlf6X4BZI1msEj4kFfl75GV";

var excntr = 0;
var dacntr = 0;
var validator = 0;

$("#search").click(()=>{
    if((($("#st_date").val()!="") || ($("#ed_date").val()!=""))){
        if(validator==0){
            $(".guide").append("<a>Please enter valid dates.</a>");
            validator=1;
        }   
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
        else if((e-s)/(1000*60*60*24)<7 && (e-s)/(1000*60*60*24)>=0 && excntr==1){
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

// check for validator a print