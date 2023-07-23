import React, { useRef, useEffect } from 'react'

const Canvas = props => {
  
  const { draw, resize, ...rest } = props
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d', { alpha: false })
    let canvasSize = {}

    // Resize
    function resizeCanvasToDisplaySize() {
    
      const { width, height } = canvas.getBoundingClientRect()
  
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
  
      canvasSize = {width, height}
    }

    resizeCanvasToDisplaySize()

    resize(canvasSize)

    window.addEventListener('resize', resizeCanvasToDisplaySize);

    // render only in view
    const isOnViweport = () => {
      const rect = canvas.getBoundingClientRect();
      console.log((window.innerHeight || document.documentElement.clientHeight))
      return (
        rect.top >= 0 - canvas.height &&
        rect.left >= 0 - canvas.width &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) +  canvas.height &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) +  canvas.width
      );
    }

    console.log('isOnViweport', isOnViweport());
    
    // AnimationFrame
    let frameCount = 0
    let animationFrameId
    
    const render = () => {
      frameCount++
      if (isOnViweport()) {
        draw(context, frameCount)
      }
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvasToDisplaySize);
    }
  }, [draw, resize])
  
  return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas