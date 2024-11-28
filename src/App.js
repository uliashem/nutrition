import './App.css';
import { useEffect, useState } from 'react';
import video from './ingredients.mp4';
import MyNutritionComponent from './MyNutritionComponent';
import LoaderPage from './Loader/LoaderPage';
import Swal from 'sweetalert2';


function App() {
  const MY_ID = "44480b1d";
  const MY_KEY = "87c1f6a96f11f6552896d7c36ec92cf7";

  const [mySearch, setMySearch] = useState("");
  const [myNutrition, setMyNutrition] = useState("");
  const [wordSubmitted, setWordSubmitted] = useState("");
  const [stateLoader, setStateLoader] = useState(false);

  const handleAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter ingredients correctly. For example, 1 cup of rice, 1 banana",
    });
  }

  const myNutritionSearch = (e) => {
    setMySearch(e.target.value);
  }


  const getNutrition = async (ingr) => {
    setStateLoader(true);

    const response = await fetch(`https://api.edamam.com/api/nutrition-details?app_id=${MY_ID}&app_key=${MY_KEY}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingr: ingr })
    })

    if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setMyNutrition(data);
    } else {
      setStateLoader(false);
      handleAlert();
    }
  }

  useEffect(() => {
    if (wordSubmitted !== "") {
      let ingr = (wordSubmitted.split(/(?=\d)/))||(wordSubmitted.split(/[,,;,\n,\r]/));

      console.log(ingr);
      getNutrition(ingr);
    }
  
  }, [wordSubmitted])

  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  return (
    <div>

      <div className='container container1'>
        <video autoPlay muted loop>
          <source src={video} type='video/mp4'/>      
        </video>
        {stateLoader&&<LoaderPage />}
        <h1>Nutrition Analysis</h1>
      </div>

      <form onSubmit={finalSearch}>

        <div className='container container1'>
          <input className='search'
            placeholder="Search..."
            onChange={myNutritionSearch}
            value={mySearch}
          />
        </div>

        <div className='container container1'>
          <button type="submit">Search</button>
        </div>
        
      </form>

      <div className='container1 container2'>
        {myNutrition && Object.values(myNutrition.totalNutrients).map(({ label, quantity, unit }, index) =>
          <MyNutritionComponent key={index}
            label={label}
            quantity={quantity}
            unit={unit}
            />
            )}
      </div>
     
    </div>

  );

}

export default App;
