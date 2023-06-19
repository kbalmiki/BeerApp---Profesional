import { ChangeEvent, useEffect, useState } from 'react';
import { fetchData } from './utils';
import { Beer } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Paper, TextField, Link } from '@mui/material';
import styles from './Home.module.css';

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<Beer>>([]);
  const [filterText, setFilterText] = useState<string>('');
  const filteredItems: Beer[] = beerList.filter(item => item.name.toLowerCase().includes(filterText.toLowerCase()));
  useEffect(() => {
    const storedFavorites = localStorage.getItem('savedList');
    if (storedFavorites) {
      setSavedList(JSON.parse(storedFavorites));
    }
  }, []);

// Add or remove item from favorites
const toggleFavorite = (item: Beer) => {
  const updatedFavorites = savedList.includes(item)
    ? savedList.filter((id) => id !== item)
    : [...savedList, item];
    setSavedList(updatedFavorites);
    localStorage.setItem('savedList', JSON.stringify(updatedFavorites));
};

const removeAllFromSaved = () =>{
  setSavedList([]);
}

const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
  setFilterText(event.target.value);
};
  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer} >
              <div className={styles.listHeader}>
                <TextField label='Filter...' variant='outlined' value={filterText} onChange={handleFilterChange}/>
                <Button variant='contained' >Reload list</Button>
              </div>
              <ul className={styles.list}>
                {filteredItems.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox onChange={()=> toggleFavorite(beer)} />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button variant='contained' size='small' onClick={()=> removeAllFromSaved()}>
                  Remove all items
                </Button>
              </div>
              <ul className={styles.list}>
                {savedList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
                {!savedList.length && <p>No saved items</p>}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
