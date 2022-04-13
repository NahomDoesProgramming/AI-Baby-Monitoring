img = "";
objects = [];
status = "";
alarm = "";
function preload()
{
    alarm = loadSound("alarm.mp3");
}
function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelLoaded() {
  console.log("The model successfully loaded!");
  status = true;
}
function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}
function draw() {
  image(video, 0, 0, 380, 380);
      if(status != "")
      {
        r =  random(255);
        g =  random(255);
        b =  random(255);      
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)
        {
          if(objects[i].label == "person")
          {
              document.getElementById("status").innerHTML = "Baby(or other human) detected";
              alarm.stop();
          }
          else if(objects == "")
          {
            document.getElementById("status").innerHTML = "Nobody is detected!!!";
            alarm.play();
          }
          else
          {
              document.getElementById("status").innerHTML = "Nobody is detected!!!";
              alarm.play();
          }
          fill(r,g,b);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
}
