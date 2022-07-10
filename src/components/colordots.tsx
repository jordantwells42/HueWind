export default function ColorDots({colors}:{colors: any[]}){
    return (
        <div className="flex flex-row gap-2 absolute right-5 top-5">
            {colors.map((color, idx) => {
                return <div key = {idx} style={{ backgroundColor: color.toHexString() }} className="w-10 h-10 rounded-full" />
            })}
        </div>
    )
}