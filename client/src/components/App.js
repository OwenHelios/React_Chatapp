import useLocalStorage from "../hooks/useLocalStorage"
import Login from "./Login"
import Dashboard from "./Dashboard.js"
import { ContactProvider } from "../contexts/ContactProvider"
import { ConversationProvider } from "../contexts/ConversationProvider"
import { SocketProvider } from "../contexts/SocketProvider"

function App() {
  const [id, setId] = useLocalStorage("id")
  const dashboard = (
    <SocketProvider id={id}>
      <ContactProvider>
        <ConversationProvider id={id}>
          <Dashboard id={id} />
        </ConversationProvider>
      </ContactProvider>
    </SocketProvider>
  )
  return id ? dashboard : <Login onIdSubmit={setId} />
}

export default App
