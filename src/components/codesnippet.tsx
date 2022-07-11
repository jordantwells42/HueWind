import { CodeBlock , dracula} from "react-code-blocks";

export default function CodeSnippet ({ swatch }: { swatch: any[] }) {
    let code = `myColor: {`

    for (let i = 0; i < swatch.length; i++) {
        const color = swatch[i]
        code += `\n\t${color.x}: "${color.color.toHexString()}",`
    }

    code += `\n}`

  
    return (
    <div className='flex flex-col'>
        <CodeBlock className="p-6" language="json" text={code} theme={dracula} showLineNumbers={false} />
    </div>
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
