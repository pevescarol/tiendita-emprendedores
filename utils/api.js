import axios from 'axios';
import Papa from 'papaparse';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vTokatoKs5heh_nCu0wi4Z-urC7YCNKQyRoxEudCuwBINGMp3_5cZOmZBIZr-GdbZaeIoUlHyM09MD_/pub?gid=0&single=true&output=csv'
    );

    const result = Papa.parse(response.data, {
      header: true,
      transformHeader: header => header.toLowerCase().replace(/ /g, '_'), // convertimos encabezados a minúsculas y reemplazar espacios con guiones bajos
    });

    return result.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
