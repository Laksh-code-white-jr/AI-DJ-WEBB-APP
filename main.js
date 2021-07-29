song="";
leftwristx="";
leftwristy="";
rightwristx="";
rightwristy="";
scoreleft="";
scoreright="";

function setup(){
canvas=createCanvas(500,500);
canvas.center();
camera=createCapture(VIDEO);
camera.hide();
posenet=ml5.poseNet(camera,modelLoaded);
posenet.on("pose",gotPoses);
}

function gotPoses(results){
    if(results.length>0){
console.log(results);
leftwristx=results[0].pose.leftWrist.x;
leftwristy=results[0].pose.leftWrist.y;
rightwristx=results[0].pose.rightWrist.x;
rightwristy=results[0].pose.rightWrist.y;
console.log("leftwristx ="+ leftwristx+"leftwristy ="+leftwristy);
console.log("rightwristx ="+ rightwristx+"rightwristy ="+rightwristy);
scoreleft=results[0].pose.keypoints[9].score;
scoreright=results[0].pose.keypoints[10].score;
    }
}

function modelLoaded(){
    console.log("Posenet Has Successfully Loaded")
}

function draw(){
image(camera,0,0,500,500);
fill("#FF0000");
stroke("#FF0000");
if(scoreleft>0.2){
    circle(leftwristx-15,leftwristy,20);
    No_leftwristy=Number(leftwristy);
    remove_decimal=floor(No_leftwristy);
    vol=remove_decimal/1000;
    volume=vol*2;
    document.getElementById("volume").innerHTML="volume ="+volume;
    song.setVolume(volume);
}
if(scoreright>0.2){
    circle(rightwristx,rightwristy,20);
     
    if(rightwristy>0 && rightwristy<=100){
        song.rate(0.5);
        document.getElementById("speed").innerHTML="speed ="+"0.5x"
    }

    if(rightwristy>100 && rightwristy<=200){
        song.rate(1);
        document.getElementById("speed").innerHTML="speed ="+"1x"
    }

    if(rightwristy>200 && rightwristy<=300){
        song.rate(1.5);
        document.getElementById("speed").innerHTML="speed ="+"1.5x"
    }

    if(rightwristy>300 && rightwristy<=400){
        song.rate(2);
        document.getElementById("speed").innerHTML="speed ="+"2x"
    }

    if(rightwristy>400 && rightwristy<=500){
        song.rate(2.5);
        document.getElementById("speed").innerHTML="speed ="+"2.5k-vgx"
    }


}
}

function preload(){
song=loadSound("robloxparody.mp3");
}

function play(){
    song.play();
}