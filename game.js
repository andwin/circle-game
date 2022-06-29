import './style.css'

let circles = []

const setup = () => {
  const w = document.body.clientWidth
  const h = document.body.clientHeight
  createCanvas(w, h)

  setInterval(createCircle, 5000)
  setInterval(updateCircles, 20)
}

const draw = () => {
  background(5, 66, 135)
  drawText()

  for (const c of circles) {
    noStroke()
    fill(200, 66, 135)
    circle(c.x, c.y, c.size)
  }
}

const createCircle = () => {
  const margin = 125
  const x = random(margin, width - margin)
  const y = random(margin, height - margin)
  const size = 250

  circles.push({
    x,
    y,
    size,
  })
}

const updateCircles = () => {
  const minSize = 5

  for (const c of circles) {
    circle(c.x, c.y, c.size)
    c.size--
  }

  circles = circles.filter(c => c.size > minSize)
}

const drawText = () => {
  textFont('Rubik Moonrocks')
  textSize(64)
  textAlign(CENTER)
  fill(5, 200, 135)
  text('Space Circles', width / 2, 60)
}

window.setup = setup
window.draw = draw
