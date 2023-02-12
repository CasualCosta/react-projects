import React, { useState, useContext } from 'react'
import sublinks from './data'

const AppContext = React.createContext()

export const AppProvider = ({children}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(true)
    const [page, setPage] = useState( {page: '', links: []})
    const [location, setLocation] = useState({})
    const openSubmenu = (text, coordinates) => {
        const page = sublinks.find((link) => link.page === text)
        setPage(page)
        setLocation(coordinates)
        setIsSubmenuOpen(true)
    }

    return (
        <AppContext.Provider
            value={{
                isSidebarOpen,
                isSubmenuOpen,
                page,
                location,
                setIsSidebarOpen,
                setIsSubmenuOpen,
                openSubmenu
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}