import { Flex, Button, Image } from '@chakra-ui/react'


 export default function Header() {

  return (
    <Flex
        background='#403535'
        height='60px'
        px="25px"
        align='center'
        justify='space-between'
    >
        <Image
          src='/logo.svg'
          alt='logotipo'
          width='123px'
          height='34px'
        />

        <Button
          height='30px'
          background="#9fd7ff"
          >
            ADICIONAR
        </Button>
        
      </Flex>
  )

}