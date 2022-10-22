var tit;
const url = "https://api.nasa.gov/planetary/apod?api_key=Mtxi0p1ya1tcUTJt2hlf6X4BZI1msEj4kFfl75GV";


let fetchRes = fetch(url);
    fetchRes.then(res => res.json()).then(data => {
        $(".image").attr("src",`${data.hdurl}`);
        $(".heading").text(data.title);
        $(".desc").text(data.explanation);
        $(".cpy").append(data.copyright);
        $(".date").text(data.date);
    });
