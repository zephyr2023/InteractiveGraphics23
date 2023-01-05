const objs = []; // array to store all objects
let clicked; // boolean to see if user has clicked yet
let randX;
let randY;
let myFont;
function preload() {
  myFont = loadFont("Deutsch.ttf");
}

function setup() {
  createCanvas(500, 500);
  background(15);
  absY = 0;
  absX = 0;
  translate(250, 250); // set center to canvas' center
  clicked = false; // reset clicked

  // generate cuboids and define x,y,z,w,h,d
  cube1 = new cuboid(-15, 40, -12.12, 30, -220, 24.24);
  cube2 = new cuboid(-37.5, 40, -12.12, 75, 15, 24.24);
  cube3 = new cuboid(-8, 65, -5, 16, 55, 10);
  cube4 = new cuboid(-12.5, 55, -5, 25, 10, 10);
  cube5 = new cuboid(-12.5, 120, -7.5, 25, 10, 15);
  cube6 = new cuboid(32.5, 40, -12.12, 5, -6, 24.24);
  cube7 = new cuboid(-37.5, 40, -12.12, 5, -6, 24.24);
  tetra1 = new tetrahedron(15, -180, 10, -28);
}

function draw() {
  angleMode(DEGREES);
  // background lighter with more movement (plus blur)
  background(15 + absY / 4 + absX / 4, 40);
  translate(250 + (randX * absX) / 8, 250 + (randY * absY) / 8);

  if (mouseIsPressed === true) {
    textStyle(BOLD);
    rand = random(30, 100);
    randX = random(-3, 3);
    randY = random(-3, 3);
    // makes "sword" text color vary in brightness
    clicked = true;
    // after first click this will stay true
  } else {
    // sword green &blue values when not held are 90
    rand = 90;
    randX = 0;
    randY = 0;
    textStyle(NORMAL);
    // make sure background resets if mouse goes off page
    background(15);
  }

  if (!clicked) {
    textSize(40);
    textAlign(CENTER);
    textStyle(NORMAL);
    textFont(myFont);
    fill(255);
    text("grab", -120, -80);
    text("the", 120, -80);
  }

  textSize(140);
  textAlign(CENTER);
  textFont("Helvetica");
  fill(255, rand, rand, 30);
  text("SWORD", 0 + randX, 45 + randY);

  // draw all shapes
  cube1.draw(); // main blade
  cube2.draw(); // horizontal dude
  cube3.draw(); // main hilt
  cube4.draw(); // hilt top
  cube5.draw(); // hilt bototm
  cube6.draw(); // horizontal side dude 1
  cube7.draw(); // horizontal side dude 2
  tetra1.draw(); // pointy part
}

function mouseDragged() {
  for (i = 0; i < objs.length; i++) {
    // determine direction mouse is being pushed
    objs[i].rotateX3D((pmouseY - mouseY) / 1.5);
    objs[i].rotateY3D((pmouseX - mouseX) / 1.5);
    absY = abs(pmouseY - mouseY);
    absX = abs(pmouseX - mouseX);
  }
}

class cuboid {
  // initializes object with parameters
  constructor(x, y, z, w, h, d) {
    this.nodes = [
      [x, y, z],
      [x, y, z + d],
      [x, y + h, z],
      [x, y + h, z + d],
      [x + w, y, z],
      [x + w, y, z + d],
      [x + w, y + h, z],
      [x + w, y + h, z + d],
    ];
    // identifies nodes based on parameters
    this.edges = [
      [0, 1],
      [1, 3],
      [3, 2],
      [2, 0],
      [4, 5],
      [5, 7],
      [7, 6],
      [6, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ];
    // identifies which nodes connect to form edges
    this.shape = { nodes: this.nodes, edges: this.edges };
    this.nodeSize = 3;
    this.nodeColor = color(40, 168, 107);
    this.edgeColor = color(10, 204, 40);

    objs.push(this);
  }

  rotateX3D(theta) {
    let sinTheta = sin(theta);
    let cosTheta = cos(theta);

    for (let n = 0; n < this.nodes.length; n++) {
      let node = this.nodes[n];
      let y = node[1];
      let z = node[2];
      node[1] = y * cosTheta - z * sinTheta;
      node[2] = z * cosTheta + y * sinTheta;
    }
  }

  rotateY3D(theta) {
    let sinTheta = sin(theta);
    let cosTheta = cos(theta);

    for (let n = 0; n < this.nodes.length; n++) {
      let node = this.nodes[n];
      let x = node[0];
      let z = node[2];
      node[0] = x * cosTheta + z * sinTheta;
      node[2] = z * cosTheta - x * sinTheta;
    }
  }

  rotateZ3D(theta) {
    let sinTheta = sin(theta);
    let cosTheta = cos(theta);

    for (let n = 0; n < this.nodes.length; n++) {
      let node = this.nodes[n];
      let x = node[0];
      let y = node[1];
      node[0] = x * cosTheta - y * sinTheta;
      node[1] = y * cosTheta + x * sinTheta;
    }
  }

  draw() {
    stroke(this.edgeColor);
    for (let e = 0; e < this.edges.length; e++) {
      let n0 = this.edges[e][0];
      let n1 = this.edges[e][1];
      let node0 = this.nodes[n0];
      let node1 = this.nodes[n1];
      line(node0[0], node0[1], node1[0], node1[1]);
    }

    fill(this.nodeColor);
    noStroke();
    for (let n = 0; n < this.nodes.length; n++) {
      let node = this.nodes[n];
      ellipse(node[0], node[1], this.nodeSize, this.nodeSize);
    }
  }
}

class tetrahedron {
  // initializes object with parameters
  constructor(x, y, z, b) {
    this.nodes = [
      [x, y, z],
      [x + b / 2, y, z + (b * sqrt(3)) / 2],
      [x + b, y, z],
      [x + b / 2, y + (b * sqrt(3)) / 2, z + b / 4],
    ];
    // identifies nodes based on parameters
    this.edges = [
      [0, 1],
      [1, 3],
      [3, 2],
      [2, 0],
      [3, 0],
      [1, 2],
    ];
    // identifies which nodes connect to form edges
    this.shape = { nodes: this.nodes, edges: this.edges };
    this.nodeSize = 3;
    this.nodeColor = color(40, 168, 107);
    this.edgeColor = color(10, 204, 40);

    objs.push(this);
  }

  rotateX3D(theta) {
    let sinTheta = sin(theta);
    let cosTheta = cos(theta);

    for (let n = 0; n < this.nodes.length; n++) {
      let node = this.nodes[n];
      let y = node[1];
      let z = node[2];
      node[1] = y * cosTheta - z * sinTheta;
      node[2] = z * cosTheta + y * sinTheta;
    }
  }

  rotateY3D(theta) {
    let sinTheta = sin(theta);
    let cosTheta = cos(theta);

    for (let n = 0; n < this.nodes.length; n++) {
      let node = this.nodes[n];
      let x = node[0];
      let z = node[2];
      node[0] = x * cosTheta + z * sinTheta;
      node[2] = z * cosTheta - x * sinTheta;
    }
  }

  rotateZ3D(theta) {
    let sinTheta = sin(theta);
    let cosTheta = cos(theta);

    for (let n = 0; n < this.nodes.length; n++) {
      let node = this.nodes[n];
      let x = node[0];
      let y = node[1];
      node[0] = x * cosTheta - y * sinTheta;
      node[1] = y * cosTheta + x * sinTheta;
    }
  }

  draw() {
    stroke(this.edgeColor);
    for (let e = 0; e < this.edges.length; e++) {
      let n0 = this.edges[e][0];
      let n1 = this.edges[e][1];
      let node0 = this.nodes[n0];
      let node1 = this.nodes[n1];
      line(node0[0], node0[1], node1[0], node1[1]);
    }

    fill(this.nodeColor);
    noStroke();
    for (let n = 0; n < this.nodes.length; n++) {
      let node = this.nodes[n];
      ellipse(node[0], node[1], this.nodeSize, this.nodeSize);
    }
  }
}
