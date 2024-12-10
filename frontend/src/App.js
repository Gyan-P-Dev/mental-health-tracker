import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
    const [user, setUser] = useState(null);
    return (
        <div>
            {!user ? <Login onSuccess={setUser} /> : <Dashboard user={user} />}
        </div>
    );
};

export default App;
