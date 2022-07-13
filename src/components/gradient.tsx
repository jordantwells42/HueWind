import bestColor from '../bestColor'
import CodeSnippet from './codesnippet'
import { useState } from 'react'
import Color from './color'

export default function Gradient ({
  palette,
  lightColor,
  darkColor,
}: {
  palette: any[][]
  lightColor: any
  darkColor: any
}) {
  const [showSwatchs, setShowSwatchs] = useState<boolean[]>([
    false,
    false,
    false,
    false
  ])
  function handleShowSwatch (idx: number) {
    setShowSwatchs(showSwatchs.map((show, i) => (i === idx ? !show : show)))
  }
  return (
    <div
      style={{
        color: bestColor(lightColor, [lightColor, darkColor])
      }}
      className='flex flex-col md:flex-row w-full justify-center items-center gap-2'
    >
      {palette.map((swatch: any, pidx: number) => (
        <div
          className='w-full flex flex-col justify-center items-center font-semibold relative'
          key={pidx}
        >
          
          <CodeSnippet swatch={swatch} show={showSwatchs[pidx] as boolean} />
          
          <button
            style={{
              backgroundColor: darkColor.toRgbString(),
              color: bestColor(darkColor, [lightColor, darkColor])
            }}
            className='w-full p-1 h-10'
            onClick={() => handleShowSwatch(pidx)}
          >
            {!showSwatchs[pidx] ? 'Show Tailwind Config' : 'Hide'}
          </button>
          {swatch.map((pcolor: any, sidx: number) => {
            return (
              <Color
                key={sidx}
                idx={sidx}
                color={pcolor}
                style={{
                  backgroundColor: pcolor.color.toRgbString(),
                  color: bestColor(pcolor.color, [lightColor, darkColor])
                }}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
