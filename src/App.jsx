import { useEffect, useState } from 'react';
import './App.css';
export default function App()
{
  const[currency,setCurrency]=useState([]);
  const[fromValue, setFromValue]=useState();
  const[toValue, setToValue]=useState();
  const[fromCurrency,setFromCurrency]=useState();
  const[toCurrency, setToCurrency]=useState();
  const[message, setMessage]=useState();
 const convertCurrency=()=>{
      if(toCurrency==null || fromValue==''||toCurrency=='choose here'||isNaN(fromValue))
        {
          setToValue('')
        }
      
      else
      {
      fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`)
      .then(response=>response.json())
      .then(data=>{
         setToValue(fromValue*data[fromCurrency][toCurrency])
      })
  }
}
  useEffect(()=>{
   fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
   .then(response=>response.json())
   .then(data=>{setCurrency(data)})
  },[])    
 function isValid(value)
  {
   console.log(toCurrency) 
    if(value<0 || isNaN(value)|| value=='')
    {
      setMessage("please Enter a Valid Number")
      setToValue('')
     
      setFromValue('')
     
    }
    else if(value==null)
    {
      setMessage("Please Enter a Value")
      setToValue('')
      
      setFromValue('')
    }
  else if(fromCurrency==undefined||fromCurrency=='choose here')
  {
    setMessage("Please Choose 'from' Currency")
    setFromValue('')
    setToValue('')
  }
  else if(toCurrency=='choose here'&&fromValue!=null)
  {
    setToValue('')
      setMessage("Please Choose 'to' Currency")
      setFromValue('')
  }
   else  if(toCurrency==undefined||toCurrency=='choose here')
    {
      setToValue('')
      setMessage("Please Choose 'to' Currency")
      setFromValue('')
     
    }

  }

  return(
    <>

    <div className='main'>
        <h1 id='heading'>QuickConvert</h1>
      <div className='card'>
          <div className='from'>
               <select className='select'  onChange={(event)=>{setFromCurrency(event.target.value);setMessage('');}} >
                        <option> choose here</option>
                               {Object.entries(currency).map( ([Key,value])=>
                               <option key={Key} value={Key}>
                                {value}
                          </option>
                             )}
                 </select>
             <h3>From</h3>
            <input type='text' className='inp' value={fromValue} onChange={(event)=>{setFromValue(event.target.value); setMessage('');}}/>
          </div>
          <input type='button' id="btn" value='Convert Currency' onClick={()=>{isValid(fromValue);convertCurrency();}}></input>
        <div className='to'>
        <select className='select' onChange={(event)=>{
          setToCurrency(event.target.value); setMessage('');
        }}>
          <option> choose here</option>
          {Object.entries(currency).map(([Key,value])=>
          <option key={Key} value={Key}>
          {value}
          </option>
          )}
        </select>
        <h3 >To</h3>
        <input type='text'className='inp' value={toValue} /> 
          </div>
          <h3 id='message'>{message}</h3>
      </div>
     </div>
    </>
  )
}