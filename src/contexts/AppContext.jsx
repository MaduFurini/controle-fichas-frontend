import {createContext, useContext, useState} from "react";

export const useApp = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('useContext must be used within an AppProvider');
    }

    return context;
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const isLargeScreen = window.innerWidth > 1200;

    const [currentTitle, setCurrentTitle] = useState("Dashboard");

    const [drawerOpen, setDrawerOpen] = useState(
        localStorage.getItem("@Sacramentum:drawerOpen") === "false"
        ? false
        : isLargeScreen
    );

    const [userData, setUserData] = useState(
        localStorage.getItem("@Sacramentum:userData")
        ? JSON.parse(localStorage.getItem("@Sacramentum:userData"))
        : {}
    );

    const saveMenuStateToLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    const getMenuStateFromLocalStorage = (key, defaultValue) => {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : defaultValue;
    };

    function getCommunityIdSession() {
        return parseInt(localStorage.getItem("@Sacramentum:communityIdSelected")) || null;
    }

    function setCommunityIdSession(communityId) {
        localStorage.setItem("@Sacramentum:communityIdSelected", communityId);
    }

    function handleToggleDrawer() {
        setDrawerOpen(!drawerOpen);
        saveMenuStateToLocalStorage("@Sacramentum:drawerOpen", !drawerOpen);
    }

    function handleCloseDrawer() {
        setDrawerOpen(false);
        saveMenuStateToLocalStorage("@Sacramentum:drawerOpen", false);
    }

    function updateDadosUsuarioLocalStorage(dados) {
        const userData = JSON.parse(localStorage.getItem("@Sacramentum:userData"));
        const newUserData = { ...userData, ...dados };
        localStorage.setItem("@Sacramentum:userData", JSON.stringify(newUserData));
        setUserData(newUserData);
    }

    const setTitle = (title) => {
        setCurrentTitle(title);
    };

    return (
        <AppContext.Provider value={{
            drawerOpen: drawerOpen,
            setDrawerOpen: setDrawerOpen,
            token: userData.token,
            userData: userData,
            setUserData: setUserData,
            handleToggleDrawer: handleToggleDrawer,
            handleCloseDrawer: handleCloseDrawer,
            updateDadosUsuarioLocalStorage,
            setCommunityIdSession,
            getCommunityIdSession,
            getMenuStateFromLocalStorage,
            setTitle
        }}>
            {children}
        </AppContext.Provider>
    )
}