export default function ColorDots ({ colors }: { colors: tinycolor.Instance[] }) {
  return (
    <div className='flex flex-col md:flex-row gap-2 absolute right-5 top-5'>
      {colors.map((color, idx) => {
        return (
          <div
            key={idx}
            style={{ backgroundColor: color.toHexString() }}
            className='w-5 h-5 md:w-10 md:h-10 rounded-full'
          />
        )
      })}
    </div>
  )
}
