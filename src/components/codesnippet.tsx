import { CodeBlock, dracula } from 'react-code-blocks'
import nearestColor from '../nearestColor'
import { useSpring, animated } from 'react-spring'
import { useEffect } from 'react'

function camelize (str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word: string, index: number) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

export default function CodeSnippet ({
  swatch,
  show
}: {
  swatch: any[]
  show: boolean
}) {
  const { opacity, y } = useSpring({ opacity: show ? 1 : 0, y: show ? 0 : 10 })

  let code = `${camelize(nearestColor(swatch[5].color))}: {`

  for (let i = 0; i < swatch.length; i++) {
    const color = swatch[i]
    code += `\n\t${color.x}: "${color.color.toHexString()}",`
  }

  code += `\n}`

  return (
    <animated.div
      style={{ opacity, y }}
      className='absolute top-10 flex flex-col'
    >
      <CodeBlock
        style={{ opacity, y }}
        className='p-6'
        language='json'
        text={code}
        theme={dracula}
        showLineNumbers={false}
      />
    </animated.div>
  )
}
/*
"myColor": {
          "50": "#f1eaea",
          "100": "#e2d5d5",
          "200": "#c5acac",
          "300": "#a98282",
          "400": "#8c5959",
          "500": "#6f2f2f",
          "600": "#592626",
          "700": "#431c1c",
          "800": "#2c1313",
          "900": "#160909"
        }
*/
