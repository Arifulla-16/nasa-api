var tit;
const url = "https://api.nasa.gov/planetary/apod?api_key=Mtxi0p1ya1tcUTJt2hlf6X4BZI1msEj4kFfl75GV";

$(window).on("load",()=>{
    setTimeout(()=>{
        $(".loader").fadeOut();
    },4000);
});

let fetchRes = fetch(url);
    fetchRes.then(res => res.json()).then(data => {
        if(data.media_type==="video"){
            $("#video").css("display","block");
            $("#video").attr("src",`${data.url}`);
        }
        else{
            $("#image").css("display","block");
            $("#image").attr("src",`${data.url}`);
        }
        $(".heading").text(data.title);
        $(".desc").text(data.explanation);
        $(".cpy").append(data.copyright);
        $(".date").text(data.date);
    });
