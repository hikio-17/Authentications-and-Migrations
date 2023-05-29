const calculateTotalDays = (rental_date, return_date) => {
  const rentalDate = new Date(rental_date);
  const returnDate = new Date(return_date);

  const diffInMiliSeconds = Math.abs(returnDate.getTime() - rentalDate.getTime());
  const diffInDays = Math.ceil(diffInMiliSeconds / (1000 * 60 * 60 * 24));
  return diffInDays;
};

module.exports = calculateTotalDays;