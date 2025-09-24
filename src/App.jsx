import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from "./routes/index.jsx";
import {AlertProvider} from "./contexts/AlertContext.jsx";
import {AppProvider, useApp} from "./contexts/AppContext.jsx";

function App() {
    return (
        <AppProvider>
            <AuthProvider>
                <AlertProvider>
                    <InnerApp />
                </AlertProvider>
            </AuthProvider>
        </AppProvider>
    );
}

function InnerApp() {
    const { dadosUsuario, token, signOut } = useApp();

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <AppRoutes userToken={token} />
        </div>
    );
}


export default App;