import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../contexts/ContactProvider";
import { useConversations } from "../contexts/ConversationProvider";

export default function NewConversationModal({ closeModal }) {
  const { contacts } = useContacts();
  const { createConversation } = useConversations();
  const [selectedContactIds, setSelectedContactIds] = useState([]);

  function handleCheckboxChange(id) {
    setSelectedContactIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((prevId) => prevId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    createConversation(selectedContactIds);
    closeModal();
  }
  return (
    <>
      <Modal.Header closeButton>Start Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
}
