// OUTPUTS (not caps as they aren't settings for the user)
const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

// VISUAL SETTINGS
const PIXEL_SIZE = 5;
const GRID_SIZE = 100;
const GAME_FPS = 10;

// GAMEPLAY SETTINGS
const GAME_MAX_NEIGHBORS = 3;
const GAME_MIN_NEIGHBORS = 2;
const GAME_SPAWN_NEIGHBORS = 3;

// CALCULATED
const CANVAS_SIZE = GRID_SIZE * PIXEL_SIZE;

// UPDATE CANVAS SIZE
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;


myGrid = random_grid(GRID_SIZE);

setInterval(render,1000/GAME_FPS);

function render() {
  draw_game(myGrid);
  myGrid=update_grid(myGrid);
}

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
  context.fillRect( x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE - 1, PIXEL_SIZE - 1);
}

function block_is_alive(grid, x, y) {
  if (x < 0 || x >= GRID_SIZE) return false;
  if (y < 0 || y >= GRID_SIZE) return false;

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
  for (let yc = 0; yc < GRID_SIZE; yc++){
    new_grid[yc] = [];
    for (let xc = 0; xc < GRID_SIZE; xc++){
      liveNeighbours = live_neighbors(grid, xc, yc);
      
      new_grid[yc][xc] = grid[yc][xc]
      if ((liveNeighbours < GAME_MIN_NEIGHBORS) || (liveNeighbours > GAME_MAX_NEIGHBORS)) {
        // kill our little friend
        new_grid[yc][xc] = 0;
      }

      if (liveNeighbours == GAME_SPAWN_NEIGHBORS){
        // welcome back to life, little pixel!
        new_grid[yc][xc] = 1;
      }
    }
  }
  return new_grid;
}
