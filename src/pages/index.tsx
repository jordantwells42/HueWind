import { AnyMxRecord } from 'dns'
import { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Landing from '../components/landing'
import { ColorResult } from 'react-color'
import LightDark from '../components/lightdark'
import Complements from '../components/complements'
import Generator from '../components/generator'
import CodeSnippet from '../components/codesnippet'
import Explanation from '../components/explanation'

const tinycolor = require('tinycolor2')

const Home: NextPage = () => {
  const [color, setColor] = useState<any>(tinycolor({ h: 120, s: 0.5, v: 0.5 }))
  const [lightColor, setLightColor] = useState(
    tinycolor({ h: 60, s: 0.05, v: 0.95 })
  )
  const [darkColor, setDarkColor] = useState(
    tinycolor({ h: 280, s: 0.85, v: 0.04 })
  )
  const [complements, setComplements] = useState<any>(color.tetrad().slice(1))
  const [havePicked, setHavePicked] = useState(false)
  const [palette, setPalette] = useState<any[]>([])

  function handlePick (inpcolor: any) {
    setColor(tinycolor(inpcolor.hsv))
    !havePicked && setComplements(color.tetrad().slice(1))
  }

  function handlePickLight (inpcolor: any) {
    setLightColor(tinycolor(inpcolor.hsv))
  }

  function handlePickDark (inpcolor: any) {
    setDarkColor(tinycolor(inpcolor.hsv))
  }

  return (
    <>
      <Head>
        <title>HueWind</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        ></meta>
        <meta name='twitter:card' content='summary_large_image'></meta>
        <meta name='twitter:site' content='@jordantwells42' />
        <meta name='twitter:creator' content='@jordantwells42' />
        <meta name='twitter:title' content='HueWind' />
        <meta
          name='twitter:description'
          content='A cohesive theme generator for Tailwind CSS'
        />
        <meta
          name='twitter:image'
          content='https://user-images.githubusercontent.com/8213365/178173019-91491535-b7c2-4049-b4f5-2c4c43e8475c.png'
        />
        <meta
          property='og:description'
          content='A cohesive theme generator for Tailwind CSS'
        />
        <meta
          name='description'
          content='A cohesive theme generator for Tailwind CSS'
        />
        <meta property='og:title' content='HueWind' key='title' />
        <meta
          property='og:image'
          content={
            'https://user-images.githubusercontent.com/8213365/178173019-91491535-b7c2-4049-b4f5-2c4c43e8475c.png'
          }
        />
        <meta property='og:url' content={'https://huewind.jordantwells.com'} />
      </Head>

      <div
        style={{
          backgroundColor: lightColor.toHexString()
        }}
        className='w-full  h-full flex flex-col justify-center items-center overflow-x-hidden'
      >
        {/*Probably should have used some sort of contextual state, oh well */}
        <Landing
          color={color}
          lightColor={lightColor}
          darkColor={darkColor}
          handlePick={handlePick}
        />
        <Complements
          color={color}
          complements={complements}
          lightColor={lightColor}
          darkColor={darkColor}
          setHavePicked={setHavePicked}
          setComplements={setComplements}
        />
        <LightDark
          color={color}
          complements={complements}
          lightColor={lightColor}
          darkColor={darkColor}
          handlePickLight={handlePickLight}
          handlePickDark={handlePickDark}
        />
        <Generator
          color={color}
          complements={complements}
          lightColor={lightColor}
          darkColor={darkColor}
          palette={palette}
          setPalette={setPalette}
        />
        <Explanation
          palette={palette}
          lightColor={lightColor}
          darkColor={darkColor}
        />
      </div>
    </>
  )
}

export default Home
