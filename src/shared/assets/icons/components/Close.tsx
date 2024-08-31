import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'currentColor'}
    height={19}
    ref={ref}
    width={19}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <rect height={3} rx={1.5} transform={'rotate(-45 0 16.51)'} width={23} y={16.51} />
    <rect height={3} rx={1.5} transform={'rotate(45 2.253 0)'} width={23} x={2.253} />
  </svg>
)

export const Close = memo(forwardRef(SvgComponent))
