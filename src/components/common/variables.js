
 const access = {
    username: "Usuario de acceso encriptada nivel DIOS",
    password: "Clave de acceso encriptada nivel DIOS"
};
const imgbburl = "https://api.imgbb.com/1/upload";
// const serverURL = "https://emilyomni.herokuapp.com";
const serverURL = "http://localhost:3000";
const clientURL = "http://localhost:3001";
const formatAmount = (amount, country) => {
    let formatter;
    if (country == "VE") {
        formatter = new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'VES',

            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
        });
    }
    if (country == "US") {
        formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
        });
    }
    return formatter.format(amount);
};
export default {
    access,
    serverURL,
    clientURL,
    imgbburl,
    formatAmount
}
