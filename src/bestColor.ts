
const tinycolor = require('tinycolor2')

export default function bestColor(color:any, colors: any){
    return tinycolor.mostReadable(color, colors, {includeFallbackColors:true}).toHexString()
}