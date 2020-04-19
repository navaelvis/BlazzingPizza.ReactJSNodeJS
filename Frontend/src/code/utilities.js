const Utilities = {
    ApllyCurrencyFormat: function (amount) {
        return parseFloat(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
}
export default Utilities;