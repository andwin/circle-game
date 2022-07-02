import './style.css'

let circles
let score
let lives
let nextExtraLifeAt
const extraLiveStep = 10
const mobileBreakpoint = 490
const bigTextSize = window.innerWidth < mobileBreakpoint ? 42 : 64
const smallTextSize = window.innerWidth < mobileBreakpoint ? 22 : 34
let updateCirclesInterval
const circleColors = [
  [200, 66, 135],
  [242, 86, 75],
  [250, 214, 70],
  [129, 222, 53],
  [69, 247, 206],
  [19, 86, 145],
  [219, 118, 245],
  [92, 32, 107],
  [242, 10, 176],
  [245, 51, 77],
]

const setup = () => {
  score = 0
  lives = 10
  nextExtraLifeAt = 10
  circles = []

  createCanvas(window.innerWidth, window.innerHeight)
  textFont('Rubik Moonrocks')

  const delayForFirstCircle = 1000
  setTimeout(createCircle, delayForFirstCircle)
  if (!updateCirclesInterval) {
    updateCirclesInterval = setInterval(updateCircles, 20)
  }
}

const draw = () => {
  background(5, 66, 135)

  if (lives === 0) {
    drawText()
    gameOver()
    return
  }

  drawCircles()
  drawText()
}

const drawCircles = () => {
  strokeWeight(2)
  stroke(0)
  for (const c of circles) {
    const [r, g, b] = c.color
    fill(r, g, b)
    circle(c.x, c.y, c.size)
  }
}

const click = () => {
  if (lives < 1) {
    setup()
    return
  }

  let hit = false

  for (const c of circles) {
    if (dist(mouseX, mouseY, c.x, c.y) * 2 < c.size) {
      c.clicked = true
      hit = true
    }
  }

  if (!hit) lives--
}

const createCircle = () => {
  if (lives < 1) return

  const size = circleSize()
  const margin = size / 2 + 10
  const x = random(margin, width - margin)
  const y = random(margin, height - margin)
  const color = random(circleColors)

  circles.push({
    x,
    y,
    size,
    color,
  })

  setTimeout(createCircle, timeToNextCircle())
}

const circleSize = () => Math.floor(250 - 50 * Math.log10(score + 1))
const timeToNextCircle = () => Math.floor(2000 - 700 * Math.log10(score * 0.5 + 1))

const updateCircles = () => {
  if (lives < 1) return

  const minSize = 5

  const countBeforeRemovingClicked = circles.length
  circles = circles.filter(c => !c.clicked)
  const clickedCircles = countBeforeRemovingClicked - circles.length
  score += clickedCircles

  if (score >= nextExtraLifeAt) {
    lives++
    nextExtraLifeAt += extraLiveStep
  }

  for (const c of circles) {
    c.size--
  }

  const circleCountBefore = circles.length
  circles = circles.filter(c => c.size > minSize)
  const removedCircles = circleCountBefore - circles.length
  lives -= removedCircles
}

const drawText = () => {
  const textPadding = width < mobileBreakpoint ? 40 : 60
  const extraPadding = 10

  fill(5, 200, 135)

  textAlign(CENTER)
  textSize(bigTextSize)
  text('Space Circles', width / 2, textPadding + extraPadding)

  textAlign(LEFT)
  textSize(smallTextSize)
  text('Score', extraPadding, height - textPadding - extraPadding)
  textSize(bigTextSize)
  text(score, extraPadding, height - extraPadding)

  textAlign(RIGHT)
  textSize(smallTextSize)
  text('Lives', width - extraPadding, height - textPadding - extraPadding)
  textSize(bigTextSize)
  text(lives, width - extraPadding, height - extraPadding)
}

const gameOver = () => {
  const extraPadding = width < mobileBreakpoint ? 20 : 35

  fill(5, 200, 235)
  textSize(bigTextSize)
  textAlign(CENTER)
  text('Game Over!', width / 2, height / 2 - extraPadding)
  text(`Score ${score}`, width / 2, height / 2 + extraPadding)
  textSize(smallTextSize)
  text('Click to restart', width / 2, height / 2 + extraPadding * 3)
}

window.setup = setup
window.draw = draw
window.mousePressed = click
window.touchStart = () => true
