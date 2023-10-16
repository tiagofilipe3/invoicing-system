import { Text, Flex, Input, Card, InputGroup } from '@chakra-ui/react'
import { FieldErrors } from 'react-hook-form'
import ConditionalWrapper from '@/app/components/ConditionalWrapper'
import { ReactNode } from 'react'

type TProps = {
  type?: string
  defaultValue?: string
  register: any
  fieldName: string
  required?: boolean
  errors: FieldErrors
  leftElement?: ReactNode
}

const FormInput = ({
  type,
  defaultValue,
  register,
  fieldName,
  required = false,
  errors,
  leftElement,
}: TProps) => (
  <Flex flexDir="column" width="100%">
    <ConditionalWrapper
      condition={!!leftElement}
      wrapper={(children) => <InputGroup>{children}</InputGroup>}
    >
      {leftElement && leftElement}
      <Input
        type={type}
        defaultValue={defaultValue}
        {...register(fieldName, { required })}
      />
    </ConditionalWrapper>
    <Text fontSize="14px" mt={2} color="red">
      {errors[fieldName] && <p>This field is required</p>}
    </Text>
  </Flex>
)

export default FormInput
