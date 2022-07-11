export default function CodeSnippet ({ swatch }: { swatch: any[] }) {
  return (
    <div className='flex flex-col gap-2'>
      <p>&quot;myColor&quot;: {'{'}</p>
      {swatch.map((pcolor: any, idx: number) => {
        return (
          <div key={idx}>
            <p>
                {`\t"${pcolor.x}": "${pcolor.color.toHexString()}"`},
            </p>
          </div>
        )
      })}
      <p>{'}'}</p>
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
