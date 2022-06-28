
const setup = () => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  const width = document.body.clientWidth
  const height = document.body.clientHeight

  canvas.width = width
  canvas.height = height

  ctx.fillStyle = 'rgb(5, 66, 135)';
  ctx.fillRect(0, 0, width, height)

  ctx.moveTo(0, 0)
  ctx.lineTo(width, height)
  ctx.stroke()
}
setup()
