import { useState } from 'react'
import { useEffect } from 'react';
import './App.css'

interface Quote {
  content: string,
  author: string,
  _id: string
}

export function App() {
  const [vis, setVis] = useState(true);
  const [rand, setRand] = useState<Quote>();
  const [quotes, setQuotes] = useState<Quote[]>();
  const [query, setQuery] = useState('');

  useEffect(()=> {
    fetch("https://usu-quotes-mimic.vercel.app/api/random")
      .then(res => {
        return res.json();
      })
      .then(res => {
        // console.log(res);
        setRand(res)
      });
  },[]);

  function getQuotes(query: string) {
    fetch(`https://usu-quotes-mimic.vercel.app/api/search?query=${query}`)
      .then(res => {
        return res.json();
      })
      .then(res => {
        setQuotes(res.results)
      }
    );
  }

  return (
    <div className="App">
      <div id='inp'>
        <input type="text" placeholder='Search quotes' onChange={e => setQuery(e.target.value)}/>
        <button onClick={() => {
          setVis(false);
          getQuotes(query);
          }}>search</button>
      </div>
      <div>
        {rand && (vis && <QuoteCard content={rand.content} _id= {rand._id} author= {rand.author}/>)}
      </div>
      
      <div>
        { quotes && quotes.map( (quote) => { return <QuoteCard key={quote._id} content={quote.content} _id= {quote._id} author= {quote.author}/>})}
      </div>
    </div>
  );
}

function QuoteCard(props: Quote) {
  return (
    <div className='quote'>
      <p>{props.content}</p>
      <div>
        <p>-"{props.author}"</p>
      </div>
    </div>
  );
}
