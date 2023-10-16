import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Text,
  Image,
} from '@chakra-ui/react'
import { signOut } from 'next-auth/react'
import { GrMenu } from 'react-icons/gr'
import { FiLogOut } from 'react-icons/fi'
import { BsChevronDown } from 'react-icons/bs'
import { usePathname } from 'next/navigation'

const Header = ({ onOpen }: { onOpen: () => void }) => {
  const pathname = usePathname()

  const getTitle = () => {
    if (pathname.includes('invoices')) {
      return 'Dashboard'
    }

    if (pathname.includes('clients')) {
      return 'Clients'
    }

    return 'Dashboard'
  }

  return (
    <Flex
      justifyContent="space-between"
      height="64px"
      px={4}
      pt={2}
      alignItems="center"
    >
      <Flex>
        <Show below="md">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<GrMenu />}
              onClick={onOpen}
            />
          </Menu>
        </Show>
        <Text fontSize={26} fontWeight={600} ml={2}>
          {getTitle()}
        </Text>
      </Flex>
      <Flex justifyContent="center">
        <Image
          boxSize="2rem"
          borderRadius="full"
          src="https://placekitten.com/100/100"
          alt="Fluffybuns the destroyer"
        />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<BsChevronDown />}
            background="none"
          />
          <MenuList>
            <MenuItem
              icon={<FiLogOut />}
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}

export default Header
