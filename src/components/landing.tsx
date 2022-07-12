import { ColorResult, SketchPicker } from 'react-color'
import bestColor from '../bestColor'
import nearestColor from '../nearestColor';
import DownArrow from './downarrow';

export default function Landing({color, lightColor, darkColor, handlePick}:{color:any, lightColor:any, darkColor:any, handlePick:(arg0:ColorResult) => void}) {
    return (
    <div
          style={{ backgroundColor: color.toHexString() }}
          className='w-full h-screen flex flex-col items-center justify-center p-4 gap-10'
        >
          <h1
            style={{
              color: bestColor(color, [lightColor, darkColor])
            }}
            className='text-4xl font-bold text-left'
          >
            HueWind
          </h1>
          <h2 className='text-2xl font-bold text-left' style={{
              color: bestColor(color, [lightColor, darkColor])
            }}>
            Pick a color you like..
          </h2>
          <div>
          <h1 className="text-center" style={{color: bestColor(color, [lightColor, darkColor])}}>{nearestColor(color)}</h1>
          <SketchPicker
            disableAlpha={true}
            presetColors={[]}
            color={color}
            onChange={handlePick}
          />
          </div>
          <DownArrow style={{color: bestColor(color, [lightColor, darkColor])}}/>
        </div>
    )
}