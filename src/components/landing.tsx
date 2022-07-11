import { ColorResult, SketchPicker } from 'react-color'

export default function Landing({color, lightColor, darkColor, handlePick}:{color:any, lightColor:any, darkColor:any, handlePick:(arg0:ColorResult) => void}) {
    return (
    <div
          style={{ backgroundColor: color.toHexString() }}
          className='w-full h-screen flex flex-col items-center justify-center p-4 gap-10'
        >
          <h1
            style={{
              color: color.isDark()
                ? lightColor.toHexString()
                : darkColor.toHexString()
            }}
            className='text-4xl font-bold text-left'
          >
            HueWind
          </h1>
          <h2 className='text-2xl font-bold text-left' style={{
              color: color.isDark()
                ? lightColor.toHexString()
                : darkColor.toHexString()
            }}>
            Pick a color you like..
          </h2>
          <SketchPicker
            disableAlpha={true}
            presetColors={[]}
            color={color}
            onChange={handlePick}
          />
        </div>
    )
}