import Sidebar from "./Sidebar"
import OpenConversation from "./OpenConversation"
import { useConversations } from "../contexts/ConversationProvider"

export default function Dashboard({ id }) {
  const { selectedConversation } = useConversations()
  return (
    <div className="d-flex text-break" style={{ height: "100vh" }}>
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  )
}
