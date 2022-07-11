import { ColorResult, SketchPicker } from 'react-color'
import ColorDots from './colordots'
const tinycolor = require('tinycolor2')

export default function Complements ({
  color,
  complements,
  lightColor,
  darkColor,
  setComplements,
  setHavePicked
}: {
  color: any
  complements: any
  lightColor: any
  darkColor: any
  setComplements: (arg0: any) => void
    setHavePicked: (arg0: any) => void
}) {
  return (
    <div
      style={{ backgroundColor: color.toHexString() }}
      className='w-full h-full md:h-screen flex flex-col items-center justify-center'
    >
      <h1
        className='w-full h-1/4 text-2xl text-center flex font-bold justify-center items-center p-2'
        style={{
          backgroundColor: lightColor.toHexString(),
          color: darkColor.toHexString()
        }}
      >
        Choose some complementary colors...
      </h1>
      <div className='w-full h-3/4 flex flex-col md:flex-row items-center justify-center'>
        {complements.map((ccolor: any, idx: number) => {
          return (
            <div
              className='w-full h-full flex flex-col items-center justify-center relative'
              style={{ backgroundColor: ccolor.toHexString() }}
              key={idx}
            >
              <SketchPicker
                disableAlpha={true}
                presetColors={[]}
                color={ccolor}
                onChange={inp =>
                  [setComplements((p: any) =>
                    p.map((c: any, i: number) =>
                      i === idx ? tinycolor(inp.hex) : c
                    )
                  ), setHavePicked(true)]
                }
              />
              <ColorDots colors={[color, ...complements]} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
