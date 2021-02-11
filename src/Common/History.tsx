import { createBrowserHistory } from 'history';

let baseNameProd = '';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
  baseNameProd = '';
} else {
  baseNameProd = '/emeraldcity';
}

const customHistory = createBrowserHistory({
  basename: baseNameProd,
});

export default customHistory;
