import { CodeBlock, dracula } from 'react-code-blocks'
import { useState } from 'react'
import bestColor from '../bestColor'
import nearestColor from '../nearestColor'
import { useSpring, animated } from 'react-spring'

export default function Explanation ({
  palette,
  lightColor,
  darkColor
}: {
  palette: any[][]
  lightColor: any
  darkColor: any
}) {
  function camelize (str: string) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word: string, index: number) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase()
      })
      .replace(/\s+/g, '')
  }

  const [showCode, setShowCode] = useState(false)
  const { opacity, y } = useSpring({
    opacity: showCode ? 1 : 0,
    y: showCode ? 0 : 10
  })
  function handleShowCode () {
    setShowCode(!showCode)
  }

  console.log(palette)
  let code = `module.exports = {`
  code += `\n\ttheme: {`
  code += `\n\t\textend: {`
  code += `\n\t\t\tcolors: {`

  code += `\n\t\t\t\ttheme: {`
  code += `\n\t\t\t\t\tlight: "${lightColor.toHexString()}",`
  code += `\n\t\t\t\t\tdark: "${darkColor.toHexString()}"`
  code += `\n\t\t\t\t},`

  for (let i = 0; i < palette.length; i++) {
    const swatch = palette[i] as any[]
    code += `\n\t\t\t\t${camelize(nearestColor(swatch[5].color))}: {`
    for (let j = 0; j < swatch.length; j++) {
      const color = swatch[j]
      code += `\n\t\t\t\t\t${color.x}: "${color.color.toHexString()}",`
    }
    code += '\n\t\t\t\t},\n'
  }

  code += `\n\t\t\t},\n\t\t},\n\t},\n}`

  return (
    <div className='w-full h-full flex flex-col md:flex-row justify-between p-4 pb-20'>
      <div
        style={{ color: bestColor(lightColor, [lightColor, darkColor]) }}
        className='w-full flex-col flex justify-start items-center gap-4'
      >
        <h1 className='font-bold text-center text-3xl'>
          How to update your Tailwind Config
        </h1>
        <p className='max-w-prose w-3/4 text-left text-xl'>
          To use your new Tailwind palette you will need to add it to your{' '}
          <i className='font-semibold'>tailwind.config.js</i> file. If you do
          not already have that file in the root directory of your project you
          will need to create it.
        </p>
        <p className='max-w-prose w-3/4 text-left text-xl'>
          Read the complete documentation on the official{' '}
          <a
            className='font-semibold italic underline'
            href='https://tailwindcss.com/docs/customizing-colors'
          >
            Tailwind Customizing Colors Page
          </a>{' '}
          to learn more.
        </p>

        <h1 className='font-bold text-center text-3xl pt-10'>
          Why did I make this?
        </h1>
        <p className='max-w-prose w-3/4 text-left text-xl'>
          I wanted a way to create quickly make a cohesive color theme in
          Tailwind CSS.
        </p>
        <p className='max-w-prose w-3/4 text-left text-xl'>
          This tool uses cubic spline interpolation to generate colors that are
          inherently related to your light and dark values, giving the entire
          palette a cohesive feel.
        </p>
        <h1 className='font-bold text-center text-3xl pt-10'>
          How should I use it?
        </h1>
        <p className='max-w-prose w-3/4 text-left text-xl'>
          For maximum readibility, use text colors that maximize contrast on any
          given color. Text on the gradient shows the best color for optimal
          contrast (out of light, dark, #FFFFFF, and #000000).
        </p>
        <p className='max-w-prose w-3/4 text-left text-xl'>
          If you enjoy using this tool send me your project made using it on
          Twitter @jordantwells42! I would love to see them.
        </p>
      </div>
      <div className='w-full flex justify-center'>
        <div className='w-3/4'>
          <button
            style={{
              backgroundColor: darkColor.toHexString(),
              color: bestColor(darkColor, [lightColor, darkColor])
            }}
            className='w-full text-2xl font-semibold'
            onClick={handleShowCode}
          >
            Show Full Config
          </button>
          <animated.div
            style={{ opacity, y, display: showCode ? 'block' : 'none' }}
          >
            <CodeBlock
              text={code}
              language='json'
              showLineNumbers={false}
              theme={dracula}
            />
          </animated.div>
        </div>
      </div>
    </div>
  )
}
