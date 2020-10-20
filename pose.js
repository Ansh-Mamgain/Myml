let video;
let poseNet;
let result;
let myPose;
let skeleton;
function setup() {
   createCanvas(1280,720);
   video = createCapture(VIDEO);
   video.hide();
   poseNet = ml5.poseNet(video,onReady)

 poseNet.on("pose",(res)=>{
    if(res.length > 0) {
     results = res;
    skeleton = results[0].skeleton;
    myPose = results[0].pose;
    }
   } 
  );
 }

function onReady(){
    console.log("model is ready to use.");
}

function draw(){
    image(video,0,0);
    fill(255,0,0);
    if(myPose){
    ellipse(myPose.nose.x,myPose.nose.y,15);
    console.log(myPose);
    if(myPose.score > 0.3){
     for(let i = 0; i < myPose.keypoints.length; i++){
     let x = myPose.keypoints[i].position.x;
     let y = myPose.keypoints[i].position.y;
     fill(0,0,255);
     ellipse(x,y,15) 
    }
  }
  for(let i = 0; i < skeleton.length; i++){
     let initial = skeleton[i][0];
     let final = skeleton[i][1] ;
     strokeWeight(3);
     stroke(225);
     line(initial.position.x,initial.position.y,
        final.position.x,final.position.y);
  }
 }
}