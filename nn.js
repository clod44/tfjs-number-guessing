
let inputDatas = [];
let outputDatas = [];

function initNN(){

    //CREATE NEURAL NETWORK
    model = tf.sequential();

    //create a layer
    hidden1 = tf.layers.dense({
        inputShape: [784], //input layer length
        units: 784,
        activation: "relu"
    });
    hidden2 = tf.layers.dense({
        units: 392,
        activation: "relu"
    });

    //create the output layer
    output = tf.layers.dense({
        units: 10,
        activation: "sigmoid"
    });

    //add the layers to the model
    model.add(hidden1);
    model.add(hidden2);
    model.add(output);

    //compile the model
    model.compile({
        optimizer: tf.train.adam(),
        loss: "meanSquaredError"
    });



}


function predictNN(predictingData){
    tf.tidy(()=>{
        console.log("predicting...");
        cout("predicting...",[255,255,0]);
        const dataTensor = tf.tensor2d([predictingData]);
        outputs = tf.tidy(()=>model.predict(dataTensor).dataSync());
        dataTensor.dispose();
        //update probabilities
        let pp = 0;
        let ppindex = 0;
        for (let i = 0; i < 10; i++) {
            if(pp<outputs[i]){
                pp = outputs[i];
                ppindex = i;
            }
            cout("number "+i+" probability: "+round(outputs[i]*100)+"%");
        }    
        cout("result number: "+ppindex+" with probability: "+round(pp*100)+"%",[255,125,0],true);
    });
}


//TRAINING
//put answers of xs into the model
//fit is an async function
async function train(epochSize){   
    
    const history = await model.fit(tf.tensor2d(inputDatas),tf.tensor2d(outputDatas),{
        epochs: epochSize,
        shuffle: true, //shuffle the training data before each epoch
        callbacks: {
            onEpochEnd: async (epoch, logs) => {
              console.log("epoch: "+epoch+", loss: " + logs.loss);
              colorMode(HSB);
              const col = color(epoch*30 % 255,255,255);
              colorMode(RGB);
              cout("epoch: "+epoch+"<br>loss: " + logs.loss,[red(col),green(col),blue(col)], true);
            }
          }
    });
    console.log("train complete");
    cout("train complete",[0,255,0],true);
    cout("saving model to Downloads..",[125,125,0],false);
    const saveResult = await model.save('downloads://NumberModel', {
        includeOptimizer: true
    });
    cout("model saved to Downloads",[255,255,0],true);
}


document.getElementById("startMnistTraining").addEventListener("click",()=>{
    //mnist images
    const epochSize = 10;
    const inputDatasSize = 4000;
    const trainingDatasSize = 1000;
    const set = mnist.set(inputDatasSize, trainingDatasSize);
    trainingDatas = set.training;
    //trainingNumbers = set.test;
    inputDatas = trainingDatas.map(d => d.input);
    outputDatas = trainingDatas.map(d => d.output);
    console.log(`mnist training started\nepochsize: ${epochSize}\ndatasize: ${inputDatasSize}\npixelData: ${inputDatasSize*epochSize*784}`);
    cout("mnist training started",[0,0,0],true);
    cout("epochsize: "+epochSize);
    cout("datasize: "+inputDatasSize);
    cout("pixelData: "+inputDatasSize*epochSize*784);
    train(epochSize);
});

document.getElementById("startMnistTesting").addEventListener("click",()=>{
    //mnist images
    cout("loading a random image...");
    predictingData =  mnist[floor(random(10))].get();
    
    //visualize the fetched number images
    const temp = createGraphics(28,28);
    temp.background(0);

    temp.loadPixels();
    for (let i = 0; i < predictingData.length; i++) {
        const val = predictingData[i]*255;

        temp.pixels[i*4+0] = val;
        temp.pixels[i*4+1] = val;
        temp.pixels[i*4+2] = val;
        temp.pixels[i*4+3] = 255;
    }
    temp.updatePixels();
    dataImage.image(temp,0,0,width,height);
    createDataImage(temp);
});

