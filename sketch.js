
let mandelbrot;

let centerX;
let centerY;
let sideLength;
let sideLengthRatio;

function preload() {
  mandelbrot = loadShader('mandelbrot.vert', 'mandelbrot.frag');
}

function setup() {
  createCanvas(800, 800, WEBGL);
  centerX = -0.7;
  centerY = 0;
  sideLength = 2.4;
  sideLengthRatio = width / height;

  shader(mandelbrot);
}

function draw() {
  drag();

  let halfSideLength = sideLength * 0.5;
  let a = halfSideLength * sideLengthRatio;

  mandelbrot.setUniform('minx', centerX - a);
  mandelbrot.setUniform('maxx', centerX + a);
  mandelbrot.setUniform('miny', centerY + halfSideLength);
  mandelbrot.setUniform('maxy', centerY - halfSideLength);

  rect(-width * 0.5, -height * 0.5, width, height);
}

function drag() {
  if(mouseIsPressed) {
    let dx = (pmouseX - mouseX) / width * sideLength * sideLengthRatio;
    let dy = (pmouseY - mouseY) / height * sideLength;
    
    centerX += dx;
    centerY -= dy;
  }
}

function mouseWheel(event) {
  if(event.delta < 0) sideLength *= 10/11;
  else sideLength *= 11/10;
  sideLength = constrain(sideLength, 0, 3);
}