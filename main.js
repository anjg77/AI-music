song_1=" ";
song_2=" ";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;

function preload(){
    song_1=loadSound("music.mp3");
    song_2=loadSound("music 2.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('posenet is intitialized');
}

function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    if (score_leftwrist>0.2){
        circle(leftwristx,leftwristy,20);
        convertlefty=Number(leftwristy);
        remove_decimal=floor(convertlefty);
        volume=remove_decimal/500;
        document.getElementById("volume").innerHTML="Volume = "+volume;
        song.setVolume(volume);
    }
}

function playfunction(){
    song_1.play();
    song_1.setVolume(1);
    song_1.rate(1);
    song_2.play();
    song_2.setVolume(1);
    song_2.rate(1);
}

function gotPoses(results){
    if (results.length>0){
        console.log(results);
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        console.log('left wrist x = '+leftwristx+' left wrist y = '+leftwristy);
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log('right wrist x = '+rightwristx+' right wrist y = '+rightwristy);
    }
}