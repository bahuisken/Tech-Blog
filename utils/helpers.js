module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  
  get_borderBg: () => {
    const randomNum = Math.random();
    let borderBg = "primary";

    if (randomNum > 0.7) {
      borderBg = "secondary";
    } else if (randomNum > 0.4) {
      borderBg = "info";
    }
    return `<div class="card border-${borderBg} mb-3">
    <div class="card-header text-white bg-${borderBg}">`
  },
};
