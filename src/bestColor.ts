import tinycolor from "tinycolor2"

export default function bestColor(color:tinycolor.Instance, colors: tinycolor.Instance[]){
    return tinycolor.mostReadable(color, colors, {includeFallbackColors:true}).toHexString()
}