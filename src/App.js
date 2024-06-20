
import './App.css';
import { useEffect, useState } from 'react';
import LoaderPage from './Loader/LoaderPage';
import Nutrition from './Nutrition';
import image from './icons8.png';
import Swal from 'sweetalert2';
import gsap from "gsap";


function App() {

const [mySearch, setMySearch] = useState ();
const [wordSubmitted, setWordSubmitted] = useState('');
const [myNutrition, setMyNutrition] = useState ();
const [stateLoader, setStateLoader] = useState(false);


const MY_ID = 'f03c9881';
const MY_KEY = 'fbaf27612b410239189e915c907793aa';
const MY_URL = 'https://api.edamam.com/api/nutrition-details'; 

const fetchData = async(ingr) => {
  setStateLoader(true);

  const response = await fetch (`${MY_URL}?app_id=${MY_ID}&app_key=${MY_KEY}`, {
    method: 'POST',
    headers:  {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ingr:ingr})
  })

      const handleAlert = () => {

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingredients entered incorrectly!",
        footer: "Try again!"
      });
    };

  if(response.ok) {
    setStateLoader(false);
    const data = await response.json();
    setMyNutrition(data);
  } else {
    setStateLoader(false);
    handleAlert(true)

  }
}


  const myRecipeSearch = (e) => {
    setMySearch(e.target.value)
  }

  const finalSearch = e => {
    e.preventDefault();
    setWordSubmitted(mySearch);

  }


  useEffect(() => {
    if (wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  }, [wordSubmitted])

  
  useEffect(() => {
    const ctx = gsap.context (() => {
      gsap.from('h1', {rotation: 360, opacity: 0, duration: 3.0, delay: 2.0,  repeat: 5});
    })
    return() => ctx.revert()
}, [])
  


  return (
    <div className='MainContainer'>
       {stateLoader && <LoaderPage />}
       <div className='box'>
        <h1>Nutrition analysis</h1>
       </div>
       <form onSubmit={finalSearch}>
          <div className='container'> 
            <input className='search' 
            placeholder='Search...'
            onChange = {myRecipeSearch} />
          </div>
          <div>
            <button>
              <img src={image} alt='icon' width='20px'/>
            </button>
          </div>
      </form>
      <div className='smallContainer'>
        <div className='containerAnalysis'>
        {
          myNutrition && <p>{myNutrition.calories} kcal</p>
        }

{
          myNutrition && Object.values(myNutrition.totalNutrients)
            .map(({ label, quantity, unit }) =>
              <Nutrition
                label={label}
                quantity={quantity}
                unit={unit}
              />
            )
        }
          </div>
        </div>
    </div>
  );
}

export default App;
