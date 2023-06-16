//your code here
document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.getElementById('gameContainer');
  const scoreElement = document.getElementById('score');

  const gridSize = 40;
  const totalPixels = 400 / gridSize;
  let snake = [{ row: 20, col: 1 }];
  let direction = 'right';
  let food = null;
  let score = 0;

  // Create game grid with pixels
  for (let i = 0; i < totalPixels; i++) {
    for (let j = 0; j < totalPixels; j++) {
      const pixel = document.createElement('div');
      pixel.classList.add('pixel');
      pixel.id = `pixel${i}-${j}`;
      gameContainer.appendChild(pixel);
    }
  }

  // Create and move the snake
  function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
      case 'up':
        head.row--;
        break;
      case 'down':
        head.row++;
        break;
      case 'left':
        head.col--;
        break;
      case 'right':
        head.col++;
        break;
    }

    if (head.row < 0 || head.row >= totalPixels || head.col < 0 || head.col >= totalPixels || isSnakeCollision(head)) {
      clearInterval(interval);
      alert('Game over!');
      return;
    }

    snake.unshift(head);

    if (head.row === food.row && head.col === food.col) {
      score++;
      scoreElement.textContent = score;
      generateFood();
    } else {
      snake.pop();
    }

    updateGameBoard();
  }

  // Check if snake collides with itself
  function isSnakeCollision(head) {
    return snake.some((segment, index) => {
      if (index === 0) return false;
      return segment.row === head.row && segment.col === head.col;
    });
  }

  // Generate food at random position
  function generateFood() {
    const row = Math.floor(Math.random() * totalPixels);
    const col = Math.floor(Math.random() * totalPixels);

    food = { row, col };
    const foodPixel = document.getElementById(`pixel${row}-${col}`);
    foodPixel.classList.add('food');
  }

  // Update the game board
  function updateGameBoard() {
    const pixels = document.getElementsByClassName('pixel');
    Array.from(pixels).forEach((pixel) => {
      pixel.className = 'pixel';
    });

    snake.forEach((segment, index) => {
      const { row, col } = segment;
      const pixel = document.getElementById(`pixel${row}-${col}`);
      if (index === 0) {
        pixel.classList.add('snakeBodyPixel');
      } else {
        pixel.classList.add('snakeBodyPixel');
      }
    });
  }

  // Handle key events for changing snake direction
  document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();

    if (key === 'arrowup' && direction !== 'down') {
      direction = 'up';
    } else if (key === 'arrowdown' && direction !== 'up') {
      direction = 'down';
    } else if (key === 'arrowleft' && direction !== 'right') {
      direction = 'left';
    } else if (key === 'arrowright' && direction !== 'left') {
      direction = 'right';
    }
  });

  generateFood();
  updateGameBoard();
  const interval = setInterval(moveSnake, 100);
});
