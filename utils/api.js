import axios from 'axios';
import Papa from 'papaparse';

export const fetchProducts = async (googleSheetAPI) => {
  try {
    const response = await axios.get(googleSheetAPI);

    const result = Papa.parse(response.data, {
      header: true,
      transformHeader: header => header.toLowerCase().replace(/ /g, '_'), // convertimos encabezados a minúsculas y reemplazar espacios con guiones bajos
      transform: (value, header) => {
        if (header === 'price') {
          // Eliminar caracteres que no sean números, como símbolos de moneda o separadores
          const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
          return !isNaN(numericValue) ? numericValue : value; // Si es un número válido, devolverlo; de lo contrario, mantener el valor original
        }
        return value;
      },
    });

    return result.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
