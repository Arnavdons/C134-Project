status="";

ringtone="";

objects=[];
function preload(){
ringtone=loadSound("old_alarm_sound.mp3");
}

function setup(){
canvas=createCanvas(400,300);
canvas.center();
video=createCapture(VIDEO);
video.hide();
object_detector=ml5.objectDetector("cocossd",modelloaded);
}

function draw(){
image(video,0,0,400,300);
if(status!=""){
object_detector.detect(video,gotResults);
for(i=0;i<objects.length;i++){
fill("red");
percent=floor(objects[i].confidence * 100);
text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
noFill();
stroke("red");
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
if(objects[i].label=="person"){
ringtone.stop();
}
else{
ringtone.play();
}
}
}
if(objects.length==0){
ringtone.play();
}
}

function modelloaded(){
console.log('Model is Loaded!');
status=true;
}

function gotResults(error,results){
if(error){
console.log(error);
}
console.log(results);
objects=results;
}
