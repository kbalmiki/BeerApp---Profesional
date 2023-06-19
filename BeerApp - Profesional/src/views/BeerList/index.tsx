import { ChangeEvent, useEffect, useState } from 'react';
import { Beer } from '../../types';
import { fetchData } from './utils';
import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText, TextField } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';



const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [filterText, setFilterText] = useState<string>('');

    // Pagination logic and filter
    const indexOfLastItem: number = currentPage * itemsPerPage;
    const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
    const filteredItems: Beer[] = beerList.filter(item => item.name.toLowerCase().includes(filterText.toLowerCase()));
    const currentItems: Beer[] = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages: number = Math.ceil(beerList.length / itemsPerPage);

  
    // Handle page change
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value);
    };
  
    // Handle filter change
    const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
      setFilterText(event.target.value);
      setCurrentPage(1); // Reset to first page when changing filter
    };

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
        <TextField id="outlined-search" label="Filter by name" type="search" value={filterText} onChange={handleFilterChange} />
          <List>
            {currentItems.map((beer) => (
              <ListItemButton key={beer.id} onClick={onBeerClick.bind(this, beer.id)}>
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={beer.name} secondary={beer.brewery_type} />
              </ListItemButton>
            ))}
          </List>
          <div>
        {/* Pagination component */}
        {filteredItems.length > itemsPerPage && (
          <Pagination
          count={totalPages}  color="primary"
          onChange={handleChange}
          />
        )}
      </div>
        </main>
      </section>
    </article>
  );
};

export default BeerList;
