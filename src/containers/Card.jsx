import { Flex, Text} from '@chakra-ui/react'
import { FaTimes } from 'react-icons/fa'

export default function Card({accName, accValue, onClick, doubleClick, isPaid}) {

  return (
       <Flex
          background='#C4C4C4'
          height='45px'
          maxHeight='max-content'
          mx='15px'
          my='10px'
          borderRadius='4px'
          border='1px solid rgba(0, 0, 0,  0.2)'
          boxShadow='3px 5px, 5px rgba(0, 0, 0,  0.2)'
          direction='column'
          px='15px'
          py='3px'

          position='relative'

          onDoubleClick={doubleClick}

        >

        <Text
          fontSize='14px'
          fontWeight={700}
          px='10px'
          textDecoration={isPaid ? "line-through red 2px" : ""}
        >
                {accName} 
        </Text>

        <Text
          fontSize='14px'
          fontWeight={700}
          px='10px'
          textDecoration={isPaid ? "line-through red 2px" : ""}
        >
                R$ {accValue}
        </Text>
        {/* a posição dessa div Flex e absoluta em relação a div flex RELATIVA(A PRINCIPAL) */}
        
        <Flex
          position='absolute'
          right='2'
          onClick={onClick} 
        >
          <FaTimes color='red' />
        </Flex>

    </Flex>
  
  )

}