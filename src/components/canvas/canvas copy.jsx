import { useRef, useEffect } from 'react'
import { PropTypes } from 'prop-types';

export const Canvas = props => {
  
  const { draw, resize, ...rest } = props
  const canvasRef = useRef(null)
  const downScale = 0.8
  const viewBoundaryRatio= 1.8
  
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d', { alpha: false })
    let canvasSize = {}

    // Resize
    function resizeCanvasToDisplaySize() {
    
      let { width, height } = canvas.getBoundingClientRect()
      width *= downScale
      height *= downScale

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
      console.log('resize')
      canvasSize = {width, height}
    }

    resizeCanvasToDisplaySize()

    resize(canvasSize)

    window.addEventListener('resize', resizeCanvasToDisplaySize);

    // render only in view
    const isOnViweport = () => {
      const rect = canvas.getBoundingClientRect();
      return (
        rect.top >= 0 - canvas.height * viewBoundaryRatio &&
        rect.left >= 0 - canvas.width * viewBoundaryRatio &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) +  canvas.height * viewBoundaryRatio &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) +  canvas.width * viewBoundaryRatio
      );
    }
    
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

Canvas.propTypes = {
  draw: PropTypes.func,
  resize: PropTypes.func,
}