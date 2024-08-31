import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'#fff'}
    height={15}
    ref={ref}
    width={15}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={
        'M14.772 13.663 11.074 9.95a5.913 5.913 0 0 0 1.472-3.894C12.546 2.716 9.732 0 6.273 0 2.814 0 0 2.717 0 6.056c0 3.34 2.814 6.057 6.273 6.057a6.36 6.36 0 0 0 3.594-1.096l3.726 3.74a.827.827 0 0 0 .59.243.83.83 0 0 0 .566-.22.772.772 0 0 0 .023-1.117ZM6.272 1.58c2.558 0 4.637 2.008 4.637 4.476 0 2.469-2.08 4.477-4.636 4.477-2.557 0-4.637-2.008-4.637-4.477 0-2.468 2.08-4.476 4.637-4.476Z'
      }
    />
  </svg>
)

export const SearchIcon = memo(forwardRef(SvgComponent))
