import { ColorResult, SketchPicker } from 'react-color'
import ColorDots from './colordots'
export default function LightDark ({
  color,
  complements,
  lightColor,
  darkColor,
  handlePickLight,
  handlePickDark
}: {
  color: any
  complements: any
  lightColor: any
  darkColor: any
  handlePickLight: (arg0: ColorResult) => void
  handlePickDark: (arg0: ColorResult) => void
}) {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <div
        style={{ backgroundColor: lightColor.toHexString() }}
        className='w-full h-1/2 flex flex-row justify-center items-center gap-10 relative'
      >
        <h1
          style={{ color: darkColor.toHexString() }}
          className='text-2xl font-bold text-left'
        >
          Choose a light color...
        </h1>
        <SketchPicker
          disableAlpha={true}
          presetColors={[]}
          color={lightColor}
          onChange={handlePickLight}
        />
        <ColorDots colors={[color, ...complements]} />

        
      </div>
      <div
        style={{ backgroundColor: darkColor.toHexString() }}
        className='w-full h-1/2 flex flex-row-reverse justify-center items-center gap-10 relative'
      >
        <h1
          style={{ color: lightColor.toHexString() }}
          className='text-2xl font-bold text-left'
        >
          ...and a dark color
        </h1>
        <SketchPicker
          disableAlpha={true}
          presetColors={[]}
          color={darkColor}
          onChange={handlePickDark}
        />
        <ColorDots colors={[color, ...complements]} />
        
      </div>
    </div>
  )
}
