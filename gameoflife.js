let canvas = document.getElementsByTagName("canvas")[0];
let context = canvas.getContext("2d");
let pixel_size = 10;
let grid_size = 5;
let canvas_size = grid_size * pixel_size;

canvas.width = canvas_size;
canvas.height = canvas_size;

console.log("A Game of Life");
myGrid = random_grid(grid_size);

setInterval(function() {
  draw_game(myGrid);
  myGrid=update_grid(myGrid);
},1000);

function draw_game(grid) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      set_pixel(grid[y][x], x, y);
    }
  }
}

function random_grid(grid_size) {
  let grid = [];
  for (let y = 0; y < grid_size; y++) {
    grid.push([]);
    for (let x = 0; x < grid_size; x++) {
      grid[y].push(Math.round(Math.random()));
    }
  }

  return grid;
}

// Sets "pixels" on the canvas
function set_pixel(value, x, y) {
  r = (value === 1 ? 0 : 255);
  g = (value === 1 ? 0 : 255);
  b = (value === 1 ? 0 : 255);
  a = 1;
  context.fillStyle = "rgba("+r+","+g+","+b+","+a+")";
  context.fillRect( x * pixel_size, y * pixel_size, pixel_size - 1, pixel_size - 1);
}

function update_grid(a){
// iterate through the grid
// Rules taken from here
// https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
  // Any live cell with two or three live neighbours survives.
  // Any dead cell with three live neighbours becomes a live cell.
  // All other live cells die in the next generation. Similarly, all other dead cells stay dead.

  var newa = [];
  var liveNeighbours = 0;
  for (j=0; j<5; j++){
    newa[j] = []
  for (i=0; i<5; i++){
      // deal with borders
      startx = -1;
      starty = -1;
      endx = 1;
      endy = 1;
      if (j==0) starty = 0;
      if (i==0) startx = 0;
      if (j==4) endy = 1;
      if (i==4) endx = 1;
      // count the live neighbours
      liveNeighbours = 0;
      for (y=starty; y<endy; y++){
        for (x=startx; x<endx; x++){
          liveNeighbours += a[j+y][i+x];
          //console.log("index ("+i+x+","+j+y+") is " + a[j+y][i+x])
        }
      }
    // oops
  liveNeighbours -= a[j][i];

      //console.log("Index (" + i + ", " + j + ") is " + a[j][i] + " has " + liveNeighbours + " neighbours")

  // rules for next generation...
  newa[j][i] = a[j][i]
      if ((liveNeighbours < 2) || (liveNeighbours > 3)) {
        newa[j][i] = 0
      }
      if (liveNeighbours == 3){
         newa[j][i] = 1
    }
    }
  }
  return newa
}
