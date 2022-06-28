const circles = []

const setup = () => {
  const w = document.body.clientWidth
  const h = document.body.clientHeight
  createCanvas(w, h)

  setInterval(createCircle, 5000)
}

const draw = () => {
  background(5, 66, 135)

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
    size
  })
}

window.setup = setup
window.draw = draw
