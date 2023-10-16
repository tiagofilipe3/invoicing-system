import { Text, Flex, Select } from '@chakra-ui/react'
import { FieldErrors } from 'react-hook-form'

type TProps = {
  register: any
  fieldName: string
  required?: boolean
  errors: FieldErrors
  options?: any
}

const FormSelect = ({
  register,
  fieldName,
  required = false,
  errors,
  options,
}: TProps) => (
  <Flex flexDir="column" width="100%">
    <Select {...register(fieldName, { required })} defaultValue={null}>
      <option value=""></option>
      {options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
    <Text fontSize="14px" mt={2} color="red">
      {errors[fieldName] && <p>This field is required</p>}
    </Text>
  </Flex>
)

export default FormSelect
