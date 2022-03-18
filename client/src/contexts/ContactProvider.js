import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactContext = createContext()

export function useContacts() {
  return useContext(ContactContext)
}

export function ContactProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage('contacts', [])

  function createContact(id, name){
   setContacts(prevContacts => {
     return [...contacts, { id, name }]
   }) 
  }

  return (
    <ContactContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactContext.Provider>
  )
}
