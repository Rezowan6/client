import { Navigate } from "react-router-dom"
import Button from "../../components/Button/Button"

const registerPage = () => {
  <Navigate to='/register' />
}
const Home = () => {
  return (
    <div>
      <h1>Welcome My App</h1>
      <Button type="button" text="Register" onclickHandle={registerPage} />
    </div>
  )
}

export default Home
