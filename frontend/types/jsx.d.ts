import { DetailedHTMLProps, HTMLAttributes } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: DetailedHTMLProps<HTMLAttributes<any>, any>
    }
  }
}
