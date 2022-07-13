import { useState } from 'react'
import CodeSnippet from './codesnippet'
import bestColor from '../bestColor'
import { Range } from 'react-range'
import Gradient from './gradient'

import tinycolor from 'tinycolor2'
const Spline = require('cubic-spline')

function clamp (value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function generateSwatch (
  lightColor: tinycolor.Instance,
  seedColor: tinycolor.Instance,
  darkColor: tinycolor.Instance,
  hueInvariance: number
) {
  const light = tinycolor(lightColor)
  const seed = tinycolor(seedColor)
  const dark = tinycolor(darkColor)

  const lightHsv = light.toHsv()
  const seedHsv = seed.toHsv()
  const darkHsv = dark.toHsv()

  lightHsv.h = ((lightHsv.h + 180) % 360) - 180
  seedHsv.h = ((seedHsv.h + 180) % 360) - 180
  darkHsv.h = ((darkHsv.h + 180) % 360) - 180

  const xs = [0, 500, 1000]
  const hs = [lightHsv.h, seedHsv.h, darkHsv.h]
  const splineH = new Spline(xs, hs)

  const ss = [lightHsv.s, seedHsv.s, darkHsv.s]
  const splineS = new Spline(xs, ss)

  const vs = [lightHsv.v, seedHsv.v, darkHsv.v]
  const splineV = new Spline(xs, vs)

  console.log(splineV)

  const swatch = []
  for (let x of [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]) {
    const h =
      (splineH.at(x / hueInvariance + (500 - 500 / hueInvariance)) + 720) % 360
    const s = clamp(splineS.at(x), 0, 1.0)
    const v = clamp(splineV.at(x), 0, 1.0)
    console.log(seedHsv)
    console.log(x, h, s, v)
    swatch.push({ x: x, color: tinycolor({ h: h, s: s, v: v, a: 1 }) })
  }

  return swatch
}

const color = tinycolor("#f1eaea")
export default function Generator ({
  color,
  complements,
  lightColor,
  darkColor,
  palette,
  setPalette
}: {
  color: any
  complements: any[]
  lightColor: any
  darkColor: any
  palette: any[][]
  setPalette: (arg0: any) => void
}) {
  const [hueInvariance, setHueInvariance] = useState<number>(1.5)

  function handleGenerate () {
    palette = []
    palette.push(generateSwatch(lightColor, color, darkColor, hueInvariance))
    complements.map(color =>
      palette.push(generateSwatch(lightColor, color, darkColor, hueInvariance))
    )
    setPalette(palette)
  }

  function handleSlide (value: number) {
    setHueInvariance(value)
    palette = []
    palette.push(generateSwatch(lightColor, color, darkColor, value))
    complements.map(color =>
      palette.push(generateSwatch(lightColor, color, darkColor, value))
    )
    setPalette(palette)
  }

  return (
    <div
      style={{ backgroundColor: lightColor.toHexString() }}
      className='w-full h-full md:h-screen flex-col flex justify-start items-center p-4'
    >
      <div className='w-full flex flex-col-reverse md:flex-row-reverse justify-center items-center text-center p-10'>
        <div
          style={{ color: bestColor(lightColor, [lightColor, darkColor]) }}
          className='w-full md:w-1/2 flex flex-col justify-center items-center font-semibold p-5'
        >
          <h1 className='text-2xl'>
            Set Hue Invariance: <b>{hueInvariance}</b>
          </h1>
          <h1 className='text-2xl p-2'>
            {' '}
            (how much to ignore light and dark hues)
          </h1>
          <div className='w-full md:w-1/2 flex justify-center items-center'>
            <Range
              step={0.1}
              min={1}
              max={3}
              values={[hueInvariance]}
              onChange={values => handleSlide(values[0] as number)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '4px',
                    width: '100%',
                    backgroundColor: '#ccc'
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '10px',
                    width: '10px',
                    backgroundColor: bestColor(lightColor, [
                      lightColor,
                      darkColor
                    ])
                  }}
                />
              )}
            />
          </div>
        </div>
        <button
          style={{
            backgroundColor: darkColor.toHexString(),
            color: bestColor(darkColor, [lightColor, darkColor]),
            borderColor: color.toHexString()
          }}
          className='w-full md:w-1/2 border-0 text-2xl rounded-2xl p-3 font-semibold'
          onClick={handleGenerate}
        >
          Press me to generate your custom palette!
        </button>
      </div>
      <Gradient
        lightColor={lightColor}
        darkColor={darkColor}
        palette={palette}
      />
    </div>
  )
}
