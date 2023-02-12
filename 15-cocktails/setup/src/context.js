import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('a')
  const [cocktails, setCocktails] = useState([])

  const fetchDrinks = useCallback( async () => {
    setIsLoading(true)
    try{
      const request = await fetch(`${url}${searchTerm}`)
      const data = await request.json()
      const {drinks} = data
      if(!drinks){
        setCocktails([])
        return
      }
      const newCocktails = drinks.map((item) => {
        const {
          idDrink,
          strDrink,
          strDrinkThumb,
          strAlcoholic,
          strGlass
        } = item

        return {
          id: idDrink,
          name: strDrink,
          img: strDrinkThumb,
          info: strAlcoholic,
          glass: strGlass
        }
      })
      setCocktails(newCocktails)
      setIsLoading(false)
    } catch(error){
      console.log(error)
      setIsLoading(false)
    }
  })

  useEffect(() => {
    fetchDrinks()
  }, [searchTerm])

  return <AppContext.Provider value={{
    isLoading,
    searchTerm,
    cocktails,
    setSearchTerm,
  }}
  >{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
