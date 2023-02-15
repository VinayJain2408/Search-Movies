import React, { useState } from 'react'
import axios from 'axios'
import './Movies.css'
function Home() {
    let [InputValue ,setInputValue] = useState('')
    let [moviesArray , setMoviesArray] = useState([])
    let movies_path = 'https://image.tmdb.org/t/p/original'
    // let movies_defalt = 'https://image.tmdb.org/t/p/original/sjf3xjuofCtDhZghJRzXlTiEjJe.jpg'
    let movies_defalt = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"

    function InputChange(e){
      setInputValue(e.target.value)
    }


    function SubmitTab(e){
        e.preventDefault()
     async function fetchData() {
      const response = await axios.get('https://api.themoviedb.org/3/search/movie?api_key=251ac7a461ba588030cfa89b0cd75329&language=en-US&query=' + InputValue+ '&page=1&include_adult=false')
      console.log(response.data.results)
      // setProduct(response.data)

      setMoviesArray(response.data.results)
      setInputValue('')
    }

    fetchData()
  }
  return (
    <div className='big'>
    <div className='box'> 
        <form onSubmit={SubmitTab}>
            <input 
            type='text'
            placeholder='Enter movie name'
            value={InputValue}
            onChange={InputChange}>
            </input>
            <button type='submit'>Search</button>
           
        </form>
        </div>
        <div className='Movies_flex'>
          
          {
            moviesArray.map((movies ,index)=>{
              return(
                <div key={index} className="Movies_box">
                <img src={ (movies.poster_path === null) ? movies_defalt : movies_path + movies.poster_path
                  } />
                <h3>{movies.title}</h3>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

export default Home