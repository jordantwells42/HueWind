import { useEffect } from 'react'
import { useSpring, animated } from 'react-spring'

const ANIMATION_DELAY = 50

export default function Color ({
  style,
  color,
  idx
}: {
  style: { backgroundColor: string; color: string }
  color: { color: any; x: number }
  idx: number
}) {
  const [styles, api] = useSpring(() => ({ from: { opacity: 0, x: 100 } }))

  useEffect(() => {
    api.start({
      to: { opacity: 1, x: 0 },
      delay: ANIMATION_DELAY * Math.sqrt(idx)
    })
  }, [api, idx])

  return (
    <animated.div
      className='w-full flex flex-col justify-end items-center font-semibold'
      style={{ ...style, ...styles }}
    >
      <h1>{color.color.toHexString()}</h1>
      <h1>{color.x}</h1>
    </animated.div>
  )
}
