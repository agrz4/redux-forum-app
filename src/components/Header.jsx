import { Flex, Heading, Link, Container, Box } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { MdForum } from 'react-icons/md'

export default function Header () {
  return (
    <Box
      as='header'
      position='fixed'
      top={0}
      w='100%'
      zIndex={200}
      bg='rgba(255, 255, 255, 0.8)'
      backdropFilter='blur(12px)'
      borderBottom='1px solid'
      borderColor='gray.200'
      boxShadow='sm'
    >
      <Container maxW='4xl'>
        <Flex h='4rem' align='center' justify='center'>
          <Link as={RouterLink} to='/' _hover={{ textDecoration: 'none' }}>
            <Flex align='center' gap={2}>
              <Box as={MdForum} size='32px' color='teal.500' />
              <Heading as='h1' fontSize='xl' color='gray.800' letterSpacing='tight'>
                Discussion Forum
              </Heading>
            </Flex>
          </Link>
        </Flex>
      </Container>
    </Box>
  )
}
