import * as tf from '@tensorflow/tfjs'
import CanvasDraw from "react-canvas-draw";
import React,{useRef,useState} from 'react';

function TensorImage()
{
  const imgRef = useRef();
  const [predict_val,SetVal] = useState(0);

  function onClick_clear()
  {
    imgRef.current.clear();
  }

  async function onClick_predict()
  {
    const model = await tf.loadLayersModel('http://localhost:3001/model/model.json');
     var image = imgRef.current.canvasContainer.children[1];
   
    var tensor = await tf.browser.fromPixels(image,1);

    tensor = tf.image.resizeBilinear(tensor,[28,28],false);
    tensor = tensor.reshape([1,28,28,1]);
    //let image_b = await Image.load(image);

    const pre = model.predict(tensor);

    SetVal(pre.argMax([-1]).dataSync()[0]);
    imgRef.current.clear();
  }

  const canvas_props={
    backgroundColor: 'black',
    brushColor:'white',
    hideGrid:'true',
    canvasHeight:'200px',
    canvasWidth:'200px',
    brushRadius: 5
  };
  return (
    <div>
      <CanvasDraw ref={imgRef} {...canvas_props}/>
    <button onClick={() => onClick_predict()}>Predict</button>
    <button onClick={() => onClick_clear()}>Clear</button>
    <p style={{
      fontWeight: 'bold',
      fontSize: '72px'
    }}>Predict: {predict_val}</p>
    </div>
  )
}

export default TensorImage;