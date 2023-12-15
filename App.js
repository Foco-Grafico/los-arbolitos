import { Route } from './src/app/components/route'
import Home from './src/app/home'
import Login from './src/app/pages/login'

export default function App () {
  return (
    <>
      <Route name='home'>
        <Home />
      </Route>
      <Route name='login'>
        <Login />
      </Route>
    </>
  )
}
