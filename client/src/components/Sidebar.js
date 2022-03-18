import { useState } from "react"
import { Tab, Nav, Button, Modal } from "react-bootstrap"
import Conversations from "./Conversations"
import Contacts from "./Contacts"
import NewConversationModal from "./NewConversationModal"
import NewContactModal from "./NewContactModal"

export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState("conversations")

  const [modalOpen, setModalOpen] = useState(false)
  function closeModal() {
    setModalOpen(false)
  }

  return (
    <div
      style={{ width: "234px" }}
      className="d-flex flex-column flex-shrink-0"
    >
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey="conversations">Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="contacts">Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-end overflow-auto flex-grow-1">
          <Tab.Pane eventKey="conversations">
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey="contacts">
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div
          className="p-2 border-end border-top small"
          style={{ wordBreak: "break-all" }}
        >
          Your ID: <span className="text-muted">{id}</span>
        </div>
        <Button className="rounded-0" onClick={() => setModalOpen(true)}>
          New {activeKey === "conversations" ? "Conversation" : "Contact"}
        </Button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {activeKey === "conversations" ? (
          <NewConversationModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  )
}
