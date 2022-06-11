let dataImage;

function setup(){
    cout("initializing...",[0,255,255],true);
    //frameRate(1);
    const canvas = createCanvas(500,500);
    dataImage = createGraphics(width,height);
    dataImage.background(0);
    createDataImage(dataImage);

    canvas.parent('sketch-holder');
    canvas.noSmooth();
    dataImage.background(0);
    dataImage.noSmooth();

    initNN();
    cout("done",[0,255,255],true);
    
}

let mouseDown = false;
function mousePressed(){
    if(mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height){
        return;
    }
    mouseDown = true;
}
function mouseReleased(){
    if(mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height){
        return;
    }
    mouseDown = false;

    createDataImage(dataImage);
}

function draw(){
    if(mouseDown){
        dataImage.stroke(255,20);
        dataImage.strokeWeight(80);
        dataImage.point(mouseX,mouseY);
        dataImage.stroke(255,100);
        dataImage.strokeWeight(50);
        dataImage.point(mouseX,mouseY);
    }


    image(dataImage,0,0,width,height);
}








//misc
function updateLabel(){
    document.getElementById('labelDataNumberIndex').textContent = document.getElementById('sldrDataNumberIndex').value;
}

document.getElementById("btnClearCanvas").addEventListener("click",()=>{
    dataImage.background(0);
    createDataImage(dataImage);
    cout("clear canvas");
});


function createDataImage(dataimage){
    //create data image
    const w = width;
    const h = height;
    resizeCanvas(28,28);
    image(dataimage,0,0,width,height);
    const base64 = canvas.toDataURL("image/png",0.5);
    document.getElementById("imgData").src = base64;
    resizeCanvas(w,h);

    /*
    const img = loadImage(document.getElementById("imgData").src,()=>{

        console.log(img);
        dataImage.image(img,0,0,width,height);
    });
    */

}

document.getElementById("btnPredict").addEventListener("click",()=>{
    const img = loadImage(document.getElementById("imgData").src,(_img)=>{
        const predictingData = imgToPixelData(_img);
        predictNN(predictingData);
    });
});


function imgToPixelData(img){
    const data = [];
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            data.push(red(img.get(x,y))/255.0);
        }
    }
    return data;
}








