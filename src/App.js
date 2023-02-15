import React, { useEffect, useState } from 'react';
import './App.css';
import TrackerApi from './api.js';

// interface Company {
//   handle:string,
//   career_link:string,
//   last_visited:string
// }

function App() {
  const [companies, setCompanies] = useState([]);

  useEffect(function getAllCompanies() {
      console.log("inside JoblyApp useEffect");

      async function getCompanies() {
        const results = await TrackerApi.getCompanies();
        console.log(results)
        setCompanies(results);
      }
      getCompanies()

    }, []);

  console.log('outside use effects',companies);
  return (
    <div className="App">
      <h1>Tracker</h1>
      <ul>
  {companies.map((company) => (
    <li key={company.handle}>{company.handle}, <a href={company.career_page}>{company.career_page}</a></li>
  ))}
</ul>


    </div>
  );
}

export default App;
