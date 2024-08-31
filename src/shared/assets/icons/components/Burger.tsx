import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'currentColor'}
    height={17}
    ref={ref}
    width={20}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <rect height={3} rx={1.5} width={20} />
    <rect height={3} rx={1.5} width={20} y={7} />
    <rect height={3} rx={1.5} width={20} y={14} />
  </svg>
)

export const Burger = memo(forwardRef(SvgComponent))
