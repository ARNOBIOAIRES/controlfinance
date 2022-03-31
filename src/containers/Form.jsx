import { Text,
   Flex,
   FormControl,
   Input,
   FormLabel,
   Button,
   Checkbox
  } from '@chakra-ui/react'

const Form = ({
    accountName,
    accountValue, 
    isPaid,
    setAccName,
    setAccValue,
    setIsPaid,
    handleSubmit
  }) => {

  return (
    <Flex
        px='15px'
        py='10px'
        flexDirection='column'
        border='1px solid rgba(0,0,0,0.3)'
        mx='15px'
        mt='15px'
        gridGap='15px'
    >
      <Text
       fontFamily='Open Sans'
       fontSize='20px'
       fontWeight={700}
       textAlign='center'
      
      >
          Adiciona nova conta
      </Text>

      <FormControl
        id='nomeDaConta'
      >
        <FormLabel>Nome da conta</FormLabel>
          <Input
          value={accountName}
          onChange={event => setAccName(event.target.value)}
          ></Input>
       </FormControl>

       <FormControl id='valorDaConta'>
        
        <FormLabel>Valor da conta</FormLabel>
        <Input
          type='number'
          value={accountValue}
          onChange={event => setAccValue(event.target.value)}

        ></Input>
       </FormControl>

      <Checkbox
        value={isPaid}
        onChange={event => setIsPaid(event.target.checked)}
        > Pagou ?</Checkbox>

      <Button
          height='40px'
          background="#9fd7ff"
          onClick={handleSubmit}

          >ADICIONAR</Button>

    </Flex> 


  )
}

export default Form