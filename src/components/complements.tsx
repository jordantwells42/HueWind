import { ColorResult, SketchPicker } from 'react-color'
import ColorDots from './colordots'
import bestColor from '../bestColor'
import nearestColor from '../nearestColor'
import DownArrow from './downarrow'
const tinycolor = require('tinycolor2')

export default function Complements ({
  color,
  complements,
  lightColor,
  darkColor,
  setComplements,
  setHavePicked
}: {
  color: tinycolor.Instance
  complements: tinycolor.Instance[]
  lightColor: tinycolor.Instance
  darkColor: tinycolor.Instance
  setComplements: (arg0: (arg0:tinycolor.Instance[]) => tinycolor.Instance[] ) => void
  setHavePicked: (arg0: boolean) => void
}) {
  return (
    <div
      style={{ backgroundColor: color.toHexString() }}
      className='w-full h-full md:h-screen flex flex-col items-center justify-center'
    >
      <div
        style={{
          backgroundColor: lightColor.toHexString(),
          color: bestColor(lightColor, [lightColor, darkColor])
        }}
        className='w-full h-full md:h-1/4 text-2xl text-center flex flex-col font-bold justify-center items-center p-3'
      >
        <h1>Choose some complementary colors...</h1>
        <DownArrow
          style={{ color: bestColor(lightColor, [lightColor, darkColor]) }}
        />
      </div>

      <div className='w-full h-full md:h-3/4 flex flex-col md:flex-row items-center justify-center'>
        {complements.map((ccolor: any, idx: number) => {
          return (
            <div
              className='w-full h-full flex flex-col items-center justify-center relative p-3'
              style={{ backgroundColor: ccolor.toHexString() }}
              key={idx}
            >
              <h1 style={{ color: bestColor(ccolor, [lightColor, darkColor]) }}>
                {nearestColor(ccolor)}
              </h1>
              <SketchPicker
                disableAlpha={true}
                presetColors={[]}
                color={ccolor}
                onChange={inp => [
                  setComplements((p) =>
                    p.map((c, i) =>
                      i === idx ? tinycolor(inp.hex) : c
                    )
                  ),
                  setHavePicked(true)
                ]}
              />
              <ColorDots colors={[color, ...complements]} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
