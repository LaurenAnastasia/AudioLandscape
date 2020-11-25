let song;
let cols, rows;
let scl = 20;
const w = 950;
const h = 600;
let terrain = [];
let mic;
let fft;

function preload() {
  song = loadSound('Proj1_Track9.mp3');
  
}


function setup() {
  let cnv = createCanvas(600, 600, WEBGL);
  fft = new p5.FFT()
  //cnv.mousePressed(canvasPressed);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  
  cols = w / scl;
  rows = h / scl;
  
   for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
  
}

function canvasPressed(){
  song.play();
}

function draw() {
  
  let spectrum = fft.analyze();
  
  console.log(spectrum);
  
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -60, 60);
      xoff += 0.2;
    }
    yoff += 0.2;
  }
  
  background(0);
  //translate(-w/2, -h/2);
  stroke(255);
  noFill();
  
  rotateX(PI/3);
  translate(-w/2, -h/2);
  
  for (let y = 0; y < rows; y ++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x ++) {
      let specMap = map(spectrum[x*y], 0, 255, 0, 10);
      let zVal = specMap * terrain[x][y];
      vertex(x*scl, y*scl, zVal);
      vertex(x*scl, (y+1)*scl, zVal);
      
      //  vertex(x*scl, (y+1)*scl, terrain[x][y + 1]);
      
      
    }
    endShape();
  }
  
}