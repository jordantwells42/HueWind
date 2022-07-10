import { useState } from 'react'

const tinycolor = require('tinycolor2')
const Spline = require('cubic-spline')

function clamp (value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function generateSwatch (
  lightColor: any,
  seedColor: any,
  darkColor: any,
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
  const [hueInvariance, setHueInvariance] = useState<number>(2)
  
  function handleGenerate(){
    palette = []
    palette.push(generateSwatch(lightColor, color, darkColor, hueInvariance))
    complements.map(color => palette.push(generateSwatch(lightColor, color, darkColor, hueInvariance)))
    setPalette(palette)
  }

  return (
    <div style={{ backgroundColor: lightColor.toHexString() }} className='w-full h-screen flex-col flex justify-start items-center'>
      <div  className="w-full flex flex-row justify-center items-center text-center p-10">
        <button style={{ backgroundColor: darkColor.toHexString(), color: lightColor.toHexString()  }} className="text-2xl rounded-2xl  p-3 font-semibold" onClick={handleGenerate}>Generate</button>
      </div>
      <div style={{ borderColor: darkColor.toHexString(), color: darkColor.toHexString()  }} className='flex flex-row w-full justify-center items-center '>
        {palette.map((swatch:any) => 
        <div className='w-full flex flex-col justify-center items-center font-semibold' key={swatch}>{swatch.map((pcolor: any, idx: number) => {
          return (
            <div
              key={idx}
              style={{ backgroundColor: pcolor.color.toRgbString() }}
              className='w-full flex flex-col justify-end items-center font-semibold'
            >
              <h1
                style={{
                  color: pcolor.color.isDark()
                    ? lightColor.toHexString()
                    : darkColor.toHexString()
                }}
              >
                {pcolor.color.toHexString()}
              </h1>
              <h1
                style={{
                  color: pcolor.color.isDark()
                    ? lightColor.toHexString()
                    : darkColor.toHexString()
                }}
              >
                {pcolor.x}
              </h1>
            </div>
          )
        })
        }</div>)}
      </div>
    </div>
  )
}
