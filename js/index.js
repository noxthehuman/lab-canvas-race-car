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
      this.x -= 5;
    }
    if(direction === 'right') {
      this.x += 5;
    }
    refreshDrawings();
  }
}

function refreshDrawings() {
  clearCanvas()
  road.draw()
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

  function startGame() {
    canvas.width = road.image.width * 2;
    canvas.height = road.image.height * 2;
    road.draw();
    car.draw();

    document.addEventListener('keydown', handleKeyDown)
  }
};
