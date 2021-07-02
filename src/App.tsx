import { Home } from './Pages/Home/Home';
import { NewRoom } from './Pages/NewRoom/NewRoom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthContextProvider } from './Contexts/AuthContext';
import { Room } from './Pages/Room/Room';

function App() {
  
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/room/new" component={NewRoom} />
          <Route path="/room/:id" component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
