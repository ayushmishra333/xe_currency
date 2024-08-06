import { Box, Container, Grid, Link, Typography } from '@mui/material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import InputAmount from './components/InputAmount'
import SelectCountry from './components/SelectCountry'
import SwitchCurrency from './components/SwitchCurrency'
import { CurrencyContext } from './context/CurrencyContext'


function App() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
  } = useContext(CurrencyContext);
  const [resultCurrency, setResultCurrency] = useState(0);
  const codeFromCurrency = fromCurrency.split(" ")[1];
  const codeToCurrency = toCurrency.split(" ")[1];
  
  useEffect(() => {
    if(firstAmount) {
      axios("https://api.freecurrencyapi.com/v1/latest", {
        params: {
          apikey: "fca_live_HfvNVcAnx3E53hWIhDtX5edNBspIYuiWPSz1QfKK",
          base_currency: codeFromCurrency,
          currencies: codeToCurrency
        }
      })
        .then(response => setResultCurrency(response.data.data[codeToCurrency]))
        .catch(error => console.log(error))
    }
  }, [firstAmount, fromCurrency, toCurrency])

  const boxStyles = {
    background: "rgba(255, 255, 255, 0.5)",
    textAlign: "center",
    color: "#333",
    minHeight: "20rem",
    borderRadius: 10,
    padding: "4rem 2rem",
    boxShadow: "10px 10px 20px -3px rgba(0,0,0,0.5)",
    position: "relative"
  }

  return (
    <Container maxWidth="md" sx={boxStyles}>
      <Typography variant='h4' sx={{ marginBottom: "2rem", fontWeight: "bold", color: "rgba(0, 0, 0, 0.5)"}}>Stay Ahead with Accurate Conversions</Typography>
      <Grid container spacing={2}>
        <InputAmount />
        <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From" />
        <SwitchCurrency />
        <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
      </Grid>

      {firstAmount ? (
        <Box sx={{ textAlign: "left", marginTop: "1rem"}}>
          <Typography variant='h6' sx={{ color: "rgba(0, 0, 0, 0.5)"}}>{firstAmount} {fromCurrency} =</Typography>
          <Typography variant='h4' sx={{ marginTop: "5px", fontWeight: "bold", color: "rgba(255, 0, 0, 0.5)"}}>{(resultCurrency * firstAmount).toFixed(2)} {toCurrency}</Typography>
        </Box>
      ) : ""}
      <Typography fontSize="10px" sx={{ position: "absolute", bottom: "1rem", right: "1rem", color: "rgba(0, 0, 0, 0.5)" }}>
        <Link target="_blank" rel="noopener" href="https://github.com/ayushmishra333" sx={{ color: "rgba(0, 0, 0, 0.8)" }}>Fork this on Github</Link>
      </Typography>
    </Container>
  )
}

export default App


