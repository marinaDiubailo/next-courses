import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'#BBB'}
    height={20}
    ref={ref}
    width={20}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <circle cx={10} cy={10} r={10} />
    <path
      d={
        'M15.969 8.534a.643.643 0 0 0-.549-.457l-3.464-.328-1.369-3.345A.638.638 0 0 0 10 4a.636.636 0 0 0-.586.404L8.044 7.75l-3.464.328a.645.645 0 0 0-.549.457.685.685 0 0 0 .186.708l2.619 2.396-.772 3.548a.68.68 0 0 0 .248.687.617.617 0 0 0 .701.033L10 14.042l2.986 1.864c.22.136.495.124.702-.033a.68.68 0 0 0 .248-.687l-.772-3.548 2.619-2.396a.685.685 0 0 0 .186-.708Z'
      }
      fill={'#fff'}
    />
  </svg>
)

export const Rate = memo(forwardRef(SvgComponent))
