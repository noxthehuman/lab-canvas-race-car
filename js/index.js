window.onload = () => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };
 
  document.getElementById('start-button').onclick = () => {
    startGame();

  };

const road = {
  x: 0,
  y: 0,
  image: new Image(),
  draw() {
    context.drawImage(
      this.image,
      this.x,
      this.y,
      this.image.width * 2,
      this.image.height * 2
    )
  }
}

const car = {
  x: 250,
  y: 400,
  image: new Image(),
  draw() {
    context.drawImage(
      this.image,
      this.x,
      canvas.height - this.image.height / 2 - 10,
      this.image.width / 2,
      this.image.height / 2
    )
  },

  move(direction) {
    if(direction === 'left') {
      this.x -= 20;
    }
    if(direction === 'right') {
      this.x += 20;
    }
    refreshDrawings();
  }
}

const obstacles = []

class Obstacle {
  constructor() {
    this.y = 0
    this.height = 30
    this.x = Math.random() * canvas.width
    this.width = Math.random() * canvas.width * 0.6
  }
  draw() {
    context.fillStyle = 'brown'
    context.fillRect(this.x, this.y, this.width, this.height)
  }

  move(distance) {
    this.y += distance
  }
}

function refreshDrawings() {
  clearCanvas()
  road.draw()
  obstacles.forEach((obstacle) => obstacle.draw())
  car.draw()
}

road.image.src = './images/road.png';
car.image.src = './images/car.png';

  function handleKeyDown(event) {
    switch (event.key) {
      case 'ArrowLeft':
        car.move('left')
        break;
      case 'ArrowRight':
        car.move('right')
        break;
    }
  }

  let iterationCount = 0;

  function manageObstacles() {
    obstacles.forEach((obstacles) => {
      obstacles.move(5)
    })
    iterationCount++

    if(iterationCount % 50 === 0) {
      if (Math.random() < 0.8) {
        obstacles.push(new Obstacle())
      }
     }
    refreshDrawings()
  }

  function startGame() {
    canvas.width = road.image.width * 2;
    canvas.height = road.image.height * 2;

    setInterval(manageObstacles, 25)

    refreshDrawings()
    document.addEventListener('keydown', handleKeyDown);
  }
};
