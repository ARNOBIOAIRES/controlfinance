import Header from "../containers/Header"
import Form from "../containers/Form"
import Card from "../containers/Card"
import {useState, useEffect} from 'react'
import { useToast} from '@chakra-ui/react'
import { supabase } from '../services/supabaseCliente'
import { Text, Flex } from '@chakra-ui/react'

 
export default function Home() {
  const [ formIsOpen, setFormIsOpen ] = useState(true)
  const [ accountName, setAccontName ] = useState('')
  const [ accountValue, setAccontValue ] = useState(0)
  const [ isPaid, setIsPaid ] = useState(false)
  const toast = useToast()
  const [data, setData] = useState(null)
  const [totalValueToPay, setTotalValueToPay] = useState(0)

    const toggleFormOpen = () => {
      setFormIsOpen(!formIsOpen)
    }

    const handleSubmit = async () => {
      if (accountName ===  '' || !accountName) 
      toast({
        title: 'Nome da conta não pode ser vazio.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })

      if (accountValue ===  '' || !accountValue) 
      toast({
        title: 'O valor da conta não pode ser vazio.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })

      //se passsar daqui, deu certo

      try {
        const { data: finances, error } = await supabase
          .from('finances')
          .insert([
    { accountName, accountValue, isPaid },
  ]).single()

    setData([ ...data, finances])

 toast({
      title: 'Conta cadastrada com sucesso.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    }) 

    setAccontName('')
    setAccontValue(0)
    setIsPaid(false)

      } catch (error) {
        console.error(error)
        toast({
          title: 'Ops deu erro na criação da conta.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }




    }

    const fetchAllData = async () => {
      try {
        let { data: finances, error } = await supabase
        .from('finances')
        .select('*')
        setData(finances)

      } catch (error) {
        console.log(error)
      }
    }

    const deleteFinanceData = async (idQuery) => {
      try {
           const { data: deletedItem, error } = await supabase
          .from('finances')
          .delete()
          .eq('id', idQuery)
          .single()
          console.log(deletedItem)
          const newData = data.filter(item => item.id !== deletedItem.id )
          
        setData(newData)
          toast({
            title: 'Conta DELETADA com sucesso',
            status: 'error',
            duration: 5000,
            isClosable: true,
          })

      } catch (error) {
        console.error(error)
      }
    }

    const toggleStateOfAccount = async (idQuery, isPaid) => {
      try {
          const { data: updatedItem, error } = await supabase
          .from('finances')
          .update({ isPaid: !isPaid })
          .eq('id', idQuery)
          .single()

          toast({
            title: 'Conta atualizada com sucesso.',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })


          const newData = data.map(item =>  {
            if (item.id == idQuery) {
              return { ...item, isPaid: !item.isPaid }
              }
            return item
            })
            setData(newData)
          //console.log(updatedItem)
      } catch (error ){
        console.error(error)

      }
    }

  useEffect(() => {
    fetchAllData()
  }, [])

  useEffect(() => {
    if (data) {
      const totalAccountValue = data.reduce((acc, cur) => acc += cur.accountValue, 0)
      setTotalValueToPay(totalAccountValue)
    }
  }, [data])
 
  return (
    <>
      <Header
        toggleFormOpen={toggleFormOpen}
        formIsOpen={formIsOpen}
        />
      {
        formIsOpen && <Form
        accountName={accountName}
        accountValue={accountValue}
        isPaid={isPaid}
        setAccName={setAccontName}
        setAccValue={setAccontValue}
        setIsPaid={setIsPaid}
        handleSubmit={handleSubmit}
       />}

        <Flex 
          mx='10px'
          my='15px'>

          <Text> Valor a pagar R$: {totalValueToPay}</Text>
        </Flex>
         

       {
         data && data.map(acc => (
           <Card
            key={acc.id}
            accName={acc.accountName}
            accValue={acc.accountValue}
            onClick={() => deleteFinanceData(acc.id)}
            doubleClick={() => toggleStateOfAccount(acc.id, acc.isPaid )}
            isPaid={acc.isPaid}
            
           />
         ))
       }
  </>
  
  )
}