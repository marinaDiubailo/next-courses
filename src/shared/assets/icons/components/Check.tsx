import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={36}
    ref={ref}
    viewBox={'0 0 50 50'}
    width={36}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <circle cx={25} cy={25} fill={'#C8F8E4'} r={25} />
    <g clipPath={'url(#a)'}>
      <path
        d={
          'm36.297 20.368-12.661 12.66a2.402 2.402 0 0 1-3.397 0l-6.536-6.536a2.402 2.402 0 0 1 3.397-3.397l4.838 4.838L32.9 16.971a2.402 2.402 0 0 1 3.397 3.397Z'
        }
        fill={'#1DC37E'}
      />
    </g>
    <defs>
      <clipPath id={'a'}>
        <path d={'M13 13h24v24H13z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
)

export const Check = memo(forwardRef(SvgComponent))
