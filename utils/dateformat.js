const addDate = (date) => {
    let dateString = date.ToString();
    const character = dateString.CharAt(dateString.length -1);

    if (character === "1" && dateString !== "11") {
        dateString = `${dateString}st`;
    } else if (character === "2" && dateString !== "12") {
        dateString = `${dateString}nd`;
    } else if (character === "3" && dateString !== "13"){
        dateString = `${dateString}rd`;
    } else {
        dateString = `${dateString}th`;
    }
    return dateString;
};

module.exports = ( timestamp,{monthLength = "short", dateSuffix = true} = {}
 ) => {
    const months = {
        0: monthLength === "short" ? "Jan" : "January",
        1: monthLength === "short" ? "Feb" : "Febuary",
        2: monthLength === "short" ? "Mar" : "March",
        3: monthLength === "short" ? "Apr" : "April",
        4: monthLength === "short" ? "May" : "May",
        5: monthLength === "short" ? "Jun" : "June",
        6: monthLength === "short" ? "Jul" : "July",
        7: monthLength === "short" ? "Aug" : "August",
        8: monthLength === "short" ? "Sep" : "September",
        9: monthLength === "short" ? "Oct" : "October",
        10: monthLength === "short" ? "Nov" : "November",
        11: monthLength === "short" ? "Dec" : "December",
    };
    const dates = new Date(timestamp);
    const formattedMonth = months[dates.getMonth()];

    const day = dateSuffix
    ? addDateSuffix(dates.getDate())
    : dates.getDate();

    const year = dates.getFullYear();
    let hour = dates.getHours() > 12
    ? Math.floor(dates.getHours() - 12)
    :dates.getHours();

    if (hour === 0) {
        hour = 12;
    }
    const minutes = (dates.getMinutes() < 10 ? "0" : "") + dates.getMinutes();
    const amVPm = dates.getHours()>= 12 ? "pm" : "am";
    const formatTimeStamp = `${formattedMonth} ${day}, ${year} at ${hour}:${minutes} ${amVPm}`;

    return formatTimeStamp;
 }