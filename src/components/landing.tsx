import { ColorResult, SketchPicker } from 'react-color'
import bestColor from '../bestColor'
import nearestColor from '../nearestColor';

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
          <svg
        xmlns='http://www.w3.org/2000/svg'
        className='animate-bounce sticky mt-10 bottom-0 h-10 w-10 text-white z-50'
        viewBox='0 0 20 20'
        fill='currentColor'
      >
        <path
          fillRule='evenodd'
          d='M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z'
          clipRule='evenodd'
        />
      </svg>
        </div>
    )
}