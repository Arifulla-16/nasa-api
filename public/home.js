var carddet = [
    {heading:"APOD",content:"One of the most popular websites at NASA is the Astronomy Picture of the Day.In fact, this website is one of the most popular websites across all federal agencies.This section displays the Astronomy Picture of the Day, unique pictures everyday.View all the space's glory throuh this section."},
    {heading:"NeoWS",content:"NeoWs (Near Earth Object Web Service) is a RESTful web service for near earth Asteroid information. With NeoWs a user can: search for Asteroids based on their closest approach date to Earth, and even the near approached asteroids based on the earth date through this section."},
    {heading:"Mar'Rov",content:"Over the years, we've sent four robotic vehicles to learn more about Mars. And NASA's fifth Mars rover, Perseverance,landed on the Red Planet in February 2021!. Curiosity is the largest and most capable rover ever sent to Mars. Get those Mars Rover Photos taken on a particular earth date."}];
    
    
    var cntr = 0;
    var flag = 1;
    var tt;

    $(window).on("load",()=>{
        setTimeout(()=>{
            $(".loader").fadeOut();
        },4000);
    });

    $(".prevcard").click(()=>{
        cntr=cntr-1;
        if(cntr<0){
            cntr=2;
        }
        assigner(cntr);
        clearInterval(tt);
        tt = setInterval(()=>{
            cntr=(cntr+1)%3;
            assigner(cntr);
        },7000);
    });
    
    $(".nextcard").click(()=>{
        cntr=(cntr+1)%3;
        assigner(cntr);
        clearInterval(tt);
        tt = setInterval(()=>{
            cntr=(cntr+1)%3;
            assigner(cntr);
        },7000);
    });
    
    function assigner(cntr){
        $(".card").css("animation","animate 0.5s");
        setTimeout(()=>{
            if(flag==1){
                $(".card").css("background-color", "white");
                $(".card").css("color", "black");
                flag=0;
            }
            else{
                $(".card").css("background-color", "black");
                $(".card").css("color", "white");
                flag=1;
            }
            $(".heading").text(carddet[cntr].heading);
            $(".content").text(carddet[cntr].content);
        },250);
        setTimeout(()=>{
            $(".card").css("animation","none");
        },500);
    }
    
    tt = setInterval(()=>{
        cntr=(cntr+1)%3;
        assigner(cntr);
    },7000);

    