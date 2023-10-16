import {
  Button,
  Flex,
  InputLeftElement,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import FormInput from '@/app/components/FormInput'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TItem } from '@/app/api/invoice/types'

type TProps = {
  isOpen: boolean
  onSave: (data: TItem) => void
  onClose: () => void
}

const InvoiceItemForm = ({ isOpen, onSave, onClose }: TProps) => {
  const {
    register: itemRegister,
    handleSubmit: itemHandleSubmit,
    formState: { errors: itemErrors },
    reset,
  } = useForm<TItem>({ defaultValues: { description: '', amount: 0 } })

  const onSubmitItem: SubmitHandler<TItem> = (data: TItem) => {
    onSave(data)
    reset()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Item</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={itemHandleSubmit(onSubmitItem)}>
          <Flex flexDir="column" flex={1} px={6}>
            <Flex flexDir="column" mr={5} flex={1}>
              <Text fontSize={16} mb={1}>
                Description
              </Text>
              <FormInput
                fieldName="description"
                errors={itemErrors}
                register={itemRegister}
                required
              />
            </Flex>
            <Flex flexDir="column" mt={5} mr={5} flex={1}>
              <Text fontSize={16} mb={1}>
                Amount
              </Text>
              <FormInput
                fieldName="amount"
                errors={itemErrors}
                register={itemRegister}
                type="number"
                required
                leftElement={
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                  >
                    $
                  </InputLeftElement>
                }
              />
            </Flex>
          </Flex>
          <ModalFooter>
            <Button type="submit" colorScheme="teal" mr={3}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default InvoiceItemForm

export type { TItem }
