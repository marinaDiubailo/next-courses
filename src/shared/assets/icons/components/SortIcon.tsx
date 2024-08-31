import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'currentColor'}
    height={13}
    ref={ref}
    width={20}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <rect height={3} rx={1.5} width={20} />
    <rect height={3} rx={1.5} width={14} y={5} />
    <rect height={3} rx={1.5} width={8} y={10} />
  </svg>
)

export const SortIcon = memo(forwardRef(SvgComponent))
