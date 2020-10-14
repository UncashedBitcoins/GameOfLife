let canvas = document.getElementsByTagName("canvas")[0];
let context = canvas.getContext("2d");
let pixel_size = 5;
let grid_size = 100;
let canvas_size = grid_size * pixel_size;
let fps = 10;

canvas.width = canvas_size;
canvas.height = canvas_size;

console.log("A Game of Life");
myGrid = random_grid(grid_size);

setInterval(function() {
  draw_game(myGrid);
  myGrid=update_grid(myGrid);
},1000/fps);

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
      grid[y].push((Math.random() > 0.5));
    }
  }

  return grid;
}

// Sets "pixels" on the canvas
function set_pixel(value, x, y) {
  r = (value ? 0 : 255);
  g = (value ? 0 : 255);
  b = (value ? 0 : 255);
  a = 1;
  context.fillStyle = "rgba("+r+","+g+","+b+","+a+")";
  context.fillRect( x * pixel_size, y * pixel_size, pixel_size - 1, pixel_size - 1);
}

function block_is_alive(grid, x, y) {
  if (x < 0 || x >= grid_size) return false;
  if (y < 0 || y >= grid_size) return false;

  return (grid[y][x] || false);
}

function live_neighbors(grid, x,y) {
  let lives = 0;
  for (let yc = y - 1; yc <= y + 1; yc++) {
    for (let xc = x - 1; xc <= x + 1; xc++) {
      if (yc === 0 && xc === 0) continue;
      if (block_is_alive(grid, xc, yc)) {
        lives += 1;
      }
    }
  }
  return lives;
}

function update_grid(grid){
  let new_grid = [];
  let liveNeighbours = 0;
  for (let yc = 0; yc<grid_size; yc++){
    new_grid[yc] = [];
    for (let xc = 0; xc<grid_size; xc++){
      liveNeighbours = live_neighbors(grid, xc, yc);
      
      new_grid[yc][xc] = grid[yc][xc]
      if ((liveNeighbours < 2) || (liveNeighbours > 3)) {
        new_grid[yc][xc] = 0;
      }

      if (liveNeighbours == 3){
         new_grid[yc][xc] = 1;
      }
    }
  }
  return new_grid;
}
