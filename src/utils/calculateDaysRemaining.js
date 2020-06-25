export const calculateDaysRemaining = (dateOne, dateTwo) => {
  console.log(dateOne, dateTwo * 1000);
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(dateOne);
  const secondDate = new Date(dateTwo * 1000);

    console.log(firstDate, secondDate);


  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

  return diffDays;
};
