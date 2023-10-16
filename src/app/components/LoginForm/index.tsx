'use client'

import {
  Button,
  Image,
  Card,
  CardBody,
  CardHeader,
  Flex,
} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'

const Login = () => {
  const [isSigningIn, setIsSigningIn] = useState(false)

  useEffect(() => {
    return () => {
      setIsSigningIn(false)
    }
  }, [])

  return (
    <Flex justifyContent="center" alignItems="center" mt={60}>
      <Card width="sm" align="center" borderRadius="20px" pb={4}>
        <CardHeader mt={4}>
          <Image src="invoice_logo.png" boxSize="120px" objectFit="contain" />
        </CardHeader>
        <CardBody
          pt="10px"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Text fontSize="20px" fontWeight="500">
            Welcome back
          </Text>
          <Text fontSize="15px" mt={2}>
            Please enter your details to sign in.
          </Text>
          <Button
            isLoading={isSigningIn}
            leftIcon={<Image src="github-mark-white.svg" boxSize="20px" />}
            colorScheme="teal"
            onClick={() => {
              setIsSigningIn(true)
              signIn('github')
            }}
            mt={4}
          >
            Sign in using Github
          </Button>
        </CardBody>
      </Card>
    </Flex>
  )
}

export default Login
