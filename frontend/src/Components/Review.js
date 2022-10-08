import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


const products = [
  {
    name: 'Product 1',
    desc: 'Cheese Burger',
    price: '$12.99',
  },
  {
    name: 'Product 2',
    desc: 'Ice Cream',
    price: '$12.99',
  },
  {
    name: 'Product 3',
    desc: 'Pizza',
    price: '$12.99',
  },
  
  { name: 'Shipping', desc: '', price: 'Free' },
];


export default function Review() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $38.97
          </Typography>
        </ListItem>
      </List>
          
            
           
            
    </React.Fragment>
  );
}