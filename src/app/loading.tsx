import { Flex, Spinner } from '@chakra-ui/react'

const Loading = () => {
  return (
    <Flex
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner size="xl" />
    </Flex>
  )
}

export default Loading
