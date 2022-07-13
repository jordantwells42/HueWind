import { ColorResult, SketchPicker } from 'react-color'
import ColorDots from './colordots'
import bestColor from '../bestColor'
import nearestColor from '../nearestColor'
import DownArrow from './downarrow'
export default function LightDark ({
  color,
  complements,
  lightColor,
  darkColor,
  handlePickLight,
  handlePickDark
}: {
  color: tinycolor.Instance
  complements: tinycolor.Instance[]
  lightColor: tinycolor.Instance
  darkColor: tinycolor.Instance
  handlePickLight: (arg0: ColorResult) => void
  handlePickDark: (arg0: ColorResult) => void
}) {
  return (
    <div className='w-full h-full md:h-screen flex flex-col justify-center items-center'>
      <div
        style={{ backgroundColor: darkColor.toHexString() }}
        className='w-full h-1/2 flex flex-col md:flex-row justify-center items-center gap-10 relative p-3'
      >
        <h1
          style={{ color: bestColor(darkColor, [lightColor, darkColor]) }}
          className='text-2xl font-bold text-left'
        >
          Choose a dark color...
        </h1>
        <div>
          <h1
            className='text-center'
            style={{ color: bestColor(darkColor, [lightColor, darkColor]) }}
          >
            {nearestColor(darkColor)}
          </h1>
          <SketchPicker
            disableAlpha={true}
            presetColors={[]}
            color={darkColor.toHexString()}
            onChange={handlePickDark}
          />
        </div>
        <DownArrow
          style={{ color: bestColor(darkColor, [lightColor, darkColor]) }}
        />

        <ColorDots colors={[color, ...complements]} />
      </div>
      <div
        style={{ backgroundColor: lightColor.toHexString() }}
        className='w-full h-1/2 flex flex-col md:flex-row-reverse justify-center items-center gap-10 relative p-3'
      >
        <h1
          style={{ color: bestColor(lightColor, [lightColor, darkColor]) }}
          className='text-2xl font-bold text-left'
        >
          ...and a light color
        </h1>
        <div>
          <h1
            className='text-center'
            style={{ color: bestColor(lightColor, [lightColor, darkColor]) }}
          >
            {nearestColor(lightColor)}
          </h1>
          <SketchPicker
            disableAlpha={true}
            presetColors={[]}
            color={lightColor.toHexString()}
            onChange={handlePickLight}
          />
        </div>
        <DownArrow
          style={{ color: bestColor(lightColor, [lightColor, darkColor]) }}
        />
        <ColorDots colors={[color, ...complements]} />
      </div>
    </div>
  )
}
