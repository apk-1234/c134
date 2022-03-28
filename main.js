function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    video=createCapture(VIDEO);
    video.hide();
}
objects=[];
status="";
percent=0;
function preload()
{
    
}
function modelLoaded()
{
    console.log("Model is Loaded!");
    status=true;
}
function draw() 
{
    image(video, 0, 0, 380, 380);
  
       if(status != "")
        {
          r=random(255);
          g=random(255);
          b=random(255);
          objectDetector.detect(video,gotResult);
          for (i = 0; i < objects.length; i++) 
          {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number").innerHTML = "Number of objects detected : "+objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          }
        }
}
function gotResult(results,error)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    objects=results;
}