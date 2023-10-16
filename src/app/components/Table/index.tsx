import {
  TableContainer,
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spinner,
  Flex,
} from '@chakra-ui/react'

import { TProps } from '@/app/components/Table/types'
import { ReactNode } from 'react'

const Table = <T extends { id: string | number }, K extends keyof T>({
  columns,
  data,
  isLoading = false,
}: TProps<T, K>) => {
  return (
    <TableContainer>
      <ChakraTable variant="simple">
        <Thead>
          <Tr>
            {columns.map(({ key, header }) => (
              <Th key={`${String(key)}-header`}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <Tr>
              <Td colSpan={columns.length}>
                <Flex justifyContent="center">
                  <Spinner size="xl" />
                </Flex>
              </Td>
            </Tr>
          ) : (
            data &&
            data.map((obj) => (
              <Tr key={obj.id}>
                {columns.map(({ key, render }) => (
                  <Td key={obj.id + String(key)}>
                    {render ? render(obj) : (obj[key] as ReactNode)}
                  </Td>
                ))}
              </Tr>
            ))
          )}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  )
}

export default Table
