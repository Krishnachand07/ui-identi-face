# facenet-face-recognition

This repository contains a demonstration of face recognition using the FaceNet network (https://arxiv.org/pdf/1503.03832.pdf) and a webcam. Our implementation feeds frames from the webcam to the network to determine whether or not the frame contains an individual we recognize.

## How to use

`place all face pictures in images folder`
 
**`install python version 3.5.2`** <br/>
**`install numpy,opencv & pymongo`**<br/>
**install tensorflow** version 2.0.0 (because it supports all required library)<br/>
`run facenet.py` <br/>
wait few minutes for setting weights...<br/>
you will see preview screen ,it recognize live face and send result to mongo community client.<br/>
`Then it is updated to UI` <br/>

## NOTE

We are using the Windows 10 Text-to-Speech library to output our audio message, so if you want to run it on a different OS then you will have to replace the speech library used in facenet.py
