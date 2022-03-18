import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { useContacts } from "./ContactProvider"
import { useSocket } from "./SocketProvider"

const ConversationContext = createContext()

export function useConversations() {
  return useContext(ConversationContext)
}

export function ConversationProvider({ id, children }) {
  const { contacts } = useContacts()
  const [conversations, setConversations] = useLocalStorage("conversations", [])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const socket = useSocket()

  function createConversation(ids) {
    setConversations(prevConversations => {
      return [...prevConversations, { ids, messages: [] }]
    })
  }

  const addMessage = useCallback(
    ({ ids, text, sender }) => {
      setConversations(prevConversations => {
        let addToExistingConversation = false
        const newMessage = { sender, text }
        const newConversations = prevConversations.map(conversation => {
          if (matchRecipients(conversation.ids, ids)) {
            addToExistingConversation = true
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            }
          }
          return conversation
        })
        if (addToExistingConversation) {
          return newConversations
        } else {
          return [...prevConversations, { ids, messages: [newMessage] }]
        }
      })
    },
    [setConversations]
  )

  function matchRecipients(recipients, ids) {
    recipients.sort()
    ids.sort()
    return ids.every((id, index) => recipients[index] === id)
  }

  function sendMessage(ids, text) {
    socket.emit("send-message", { ids, text })
    addMessage({ ids, text, sender: id })
  }

  useEffect(() => {
    if (socket == null) return
    socket.on("receive-message", addMessage)
    return () => {
      socket.off("receive-message")
    }
  }, [socket, addMessage])

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.ids.map(id => {
      const contact = contacts.find(contact => contact.id === id)
      const name = (contact && contact.name) || id
      return { id, name }
    })

    const messages = conversation.messages.map(message => {
      const contact = contacts.find(contact => contact.id === message.sender)
      const name = (contact && contact.name) || message.sender
      const fromMe = id === message.sender
      return { ...message, senderName: name, fromMe }
    })

    const selected = index === selectedConversationIndex
    return { ...conversation, recipients, messages, selected }
  })

  const value = {
    conversations: formattedConversations,
    selectConversationIndex: setSelectedConversationIndex,
    selectedConversation: formattedConversations[selectedConversationIndex],
    createConversation,
    sendMessage,
  }

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  )
}
