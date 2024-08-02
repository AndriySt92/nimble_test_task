import { Home } from "./pages";
import { useAddContactMutation } from "./redux/contactApi"
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <div className="container max-w-screen-xl min-w-[400px] my-12">
      <Home />
      <ToastContainer
        autoClose={5000}
        position={'top-right'}
        theme="dark"
      />
    </div>
  )
}
