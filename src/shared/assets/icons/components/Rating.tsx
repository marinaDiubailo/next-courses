import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg height={22} ref={ref} width={24} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={
        'M11.075 1.633c.32-.844 1.53-.844 1.852 0l2.07 5.734a.99.99 0 0 0 .926.633h5.087c.94 0 1.35 1.17.61 1.743L18 13a.968.968 0 0 0-.321 1.092L19 19.695c.322.9-.72 1.673-1.508 1.119l-4.917-3.12a1 1 0 0 0-1.15 0l-4.917 3.12c-.787.554-1.83-.22-1.508-1.119l1.322-5.603A.968.968 0 0 0 6 13L2.38 9.743C1.64 9.17 2.053 8 2.99 8h5.087a.989.989 0 0 0 .926-.633l2.07-5.734h0Z'
      }
      stroke={'currentColor'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
      strokeWidth={2}
    />
  </svg>
)

export const Rating = memo(forwardRef(SvgComponent))
