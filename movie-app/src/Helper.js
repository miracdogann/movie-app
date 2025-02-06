export const getAverage = (array) => {
    return array.length > 0
      ? array.reduce((sum, value) => sum + value, 0) / array.length
      : 0;
  };