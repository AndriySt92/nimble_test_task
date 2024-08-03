import { Navigate, Route, Routes } from "react-router-dom"
import { ContactDetails, Home } from "./pages"
import { useAddContactMutation } from "./redux/contactApi"
import { ToastContainer } from "react-toastify"

export default function App() {
  return (
    <div className="container max-w-screen-xl min-w-[400px] my-12">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="contact/:id" element={<ContactDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer autoClose={5000} position={"top-right"} theme="dark" />
    </div>
  )
}
