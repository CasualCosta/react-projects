import React, {useState, useEffect} from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const {id} = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [cocktail, setCocktail] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    async function getCocktail() {
      try{
        const response = await fetch
          (`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        const data = await response.json()
        if(!data.drinks){
          setCocktail(null)
          return
        }
        const {
          strDrink: name,
          strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
        } = data.drinks[0]
        const ingredients = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        ]
        const newCocktail = {
          name,
          image,
          info,
          category,
          glass,
          instructions,
          ingredients,
        }
        setCocktail(newCocktail)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }
    getCocktail()
  }, [id])
  if(isLoading)
    return <Loading />

  if(!cocktail)
    return <h2 className='section-title'>no cocktail to display</h2>
    const {
      name,
      image,
      category,
      info,
      glass,
      instructions,
      ingredients,
    } = cocktail
    return (
      <section className='section cocktail-section'>
        <Link to='/' className='btn btn-primary'>
          back home
        </Link>
        <h2 className='section-title'>{name}</h2>
        <div className='drink'>
          <img src={image} alt={name}></img>
          <div className='drink-info'>
            <p>
              <span className='drink-data'>name :</span> {name}
            </p>
            <p>
              <span className='drink-data'>category :</span> {category}
            </p>
            <p>
              <span className='drink-data'>info :</span> {info}
            </p>
            <p>
              <span className='drink-data'>glass :</span> {glass}
            </p>
            <p>
              <span className='drink-data'>instructons :</span> {instructions}
            </p>
            <p>
              <span className='drink-data'>ingredients :</span>
              {ingredients.map((item, index) => {
                return item ? <span key={index}> {item}</span> : null
              })}
            </p>
          </div>
        </div>
      </section>
    )
}

export default SingleCocktail
