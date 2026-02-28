import PropTypes from 'prop-types'
import {
  Heading,
  Tag,
  Text,
  Flex,
  Icon,
  Avatar
} from '@chakra-ui/react'
import {
  FaRegComment
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { postedAt } from '../utils/index'
import parse from 'html-react-parser'

export default function ThreadItem ({
  id,
  title,
  body,
  category,
  createdAt,
  user,
  upVotesBy,
  downVotesBy,
  totalComments,
  upVote,
  downVote,
  neutralizeVote,
  authUserId
}) {
  const navigate = useNavigate()

  const onThreadClick = () => {
    navigate(`/thread/${id}`)
  }

  const tagColor = {
    android: 'green',
    bitcoin: 'orange',
    programming: 'pink',
    technology: 'blue',
    redux: 'purple',
    test: 'red'
  }

  const getTagColor = (category) => {
    return tagColor[category.toLowerCase()] || 'gray'
  }

  return (
    <Flex
      gap={4}
      w='full'
      align='center'
      p={4}
      borderBottom='1px solid'
      borderColor='gray.200'
      _hover={{ bg: 'gray.50' }}
      transition='all 0.2s'
    >
      <Avatar name={user.name} src={user.avatar} size='md' />

      <Flex direction='column' flex={1} gap={1}>
        <Heading size='sm' color='teal.900' onClick={onThreadClick} cursor='pointer' _hover={{ textDecoration: 'underline' }}>
          <Text as='span' fontWeight='bold'>
            {user.name}:
          </Text>{' '}
          {title}
        </Heading>
        <Text fontSize='sm' color='gray.600' noOfLines={1}>
          {parse(body)}
        </Text>
        <Text fontSize='xs' color='gray.500' mt={1}>
          {postedAt(createdAt)}
        </Text>
      </Flex>

      <Flex align='center' gap={4}>
        <Tag
          size='md'
          variant='solid'
          colorScheme={getTagColor(category)}
          borderRadius='md'
          px={3}
        >
          {category}
        </Tag>
        <Flex align='center' gap={1} color='gray.600'>
          <Icon as={FaRegComment} />
          <Text fontSize='sm'>{totalComments}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
}

const threadsItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired
}

ThreadItem.propTypes = {
  ...threadsItemShape,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired
}

export { threadsItemShape }
