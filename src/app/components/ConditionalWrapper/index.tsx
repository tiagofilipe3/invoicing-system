import { ReactNode } from 'react'

type TProps = {
  condition: boolean
  wrapper: (children: ReactNode) => ReactNode
  children: ReactNode
}

const ConditionalWrapper = ({ condition, wrapper, children }: TProps) =>
  condition ? wrapper(children) : children

export default ConditionalWrapper
