import React, { useState, useContext } from 'react'

const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const setModal = (bool) => setIsModalOpen(bool)
    const setSidebar = (bool) => setIsSidebarOpen(bool)
    return (
        <AppContext.Provider 
            value={{
                isModalOpen,
                isSidebarOpen,
                setModal,
                setSidebar
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider }