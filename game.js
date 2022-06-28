const circles = []
let width
let height
let ctx

const setup = () => {
  const canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')

  width = document.body.clientWidth
  height = document.body.clientHeight
  canvas.width = width
  canvas.height = height

  ctx.moveTo(0, 0)
  ctx.lineTo(width, height)
  ctx.stroke()

  setInterval(createCircle, 5000)
  setInterval(draw, 50)
}

const draw = () => {
  ctx.fillStyle = 'rgb(5, 66, 135)';
  ctx.fillRect(0, 0, width, height)


  for (const c of circles) {
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

const circle = (x, y, radius) => {
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.fillStyle = 'rgb(200, 66, 135)'
  ctx.fill()
  ctx.stroke()
}

const random = (min, max) => Math.random() * (max - min) + min

setup()
