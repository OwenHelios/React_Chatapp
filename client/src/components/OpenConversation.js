import { useState, useCallback } from "react"
import { InputGroup, Form, Button } from "react-bootstrap"
import { useConversations } from "../contexts/ConversationProvider"

export default function OpenConversation() {
  const [text, setText] = useState("")
  const { sendMessage, selectedConversation } = useConversations()
  function handleSubmit(e) {
    e.preventDefault()
    sendMessage(
      selectedConversation.recipients.map(recipient => recipient.id),
      text
    )
    setText("")
  }

  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              index === selectedConversation.messages.length - 1
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`d-flex flex-column my-1 ${
                  message.fromMe && "align-self-end"
                }`}
              >
                <div
                  className={`text-muted small ${message.fromMe && "text-end"}`}
                >
                  {message.fromMe ? "You" : message.senderName}
                </div>
                <div
                  className={`rounded px-2 py-1 ${
                    message.fromMe ? "bg-primary text-white" : "border"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="ms-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={e => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />
            <Button type="submit">Send</Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}
