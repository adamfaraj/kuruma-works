import React, { useState } from 'react'
import { Auth } from 'aws-amplify';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './Home.css';

export default function Home({screenProps}) {
  const [carYears, setCarYears] = useState([]);

  const userEmail = Auth.currentSession()
    .then(data => {
      return data.getIdToken().payload.email;
    })

    let years = [];

    let Makes = [];
    let Models = [];
    const carAPI = 'https://www.carqueryapi.com/api/0.3/?callback=?&cmd=';

    /*
    fetch(`${carAPI}getYears`)
      .then(res => res.text())
      .then(res => res.slice(2, res.length - 2))
      .then(res => JSON.parse(res))
      .then(res => {
        for (var i = res.Years.min_year; i < parseInt(res.Years.max_year) + 1; i++) {
          years.push(
            {
              'label': `${i}`,
              'value': `${i}`
            }
          );
          // this.setState({
          //   carYears: [...Years].reverse()
          // })
        }
      });
      */

    const getYears = () => {
      const currentYear = new Date().getFullYear();
      const lastYear = 1941;
      for (var i = lastYear; i <= currentYear; i++) {
        years.push(i);
      }
      setCarYears(years);
    }

    getYears();

  return (
    <div className="home-container">
      <h1>Kuruma Works</h1>

      <FormControl>
        <InputLabel>Year</InputLabel>
        <Select
          value=''
          // onChange={handleChange}
        >
          {carYears.map((year,i) => (
            <MenuItem key={i} value={year}>{year}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
