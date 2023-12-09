// Select Dom Element
const clock = document.querySelector(".clock");
const ShamsiDateElement = document.querySelector(".date-Shamsi");
const MiladiDateElement = document.querySelector(".miladi-date");
const GhamariDateElement = document.querySelector(".ghamari-date");
//url
const timeUrl = "https://kaaryar0506reactblog.liara.run/current/time";

//formatted time
const getFormattedTime = (date) => {
  const hour = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hour}:${minutes}`;
};
//get time
const getTimes = async () => {
  const response = await fetch(timeUrl);
  const getTime = await response.json();
  const currentTime = new Date(getTime.current);
  const formattedTime = getFormattedTime(currentTime);
  const persianTime = convertToPersian(formattedTime);
  clock.innerHTML = `<span> ${persianTime}</span>`;
};
// convert digit to persian style
const convertToPersian = (number) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(number).replace(/\d/g, (digit) => persianDigits[digit]);
};
//get Shamsi Date
const getShamsiDates = async () => {
  const response = await fetch(timeUrl);
  const getShamsiDate = await response.json();
  const shamsiDateValue = getShamsiDate.shamsi;
  ShamsiDateElement.innerHTML = `<span> ${shamsiDateValue.dayInMonth} ${shamsiDateValue.month} </span>`;
};
//get miladi Date
const getMiladiDates = async () => {
  const response = await fetch(timeUrl);
  const MiladiDate = await response.json();
  const MiladiDateValue = MiladiDate.miladi;
  const miladiYearConvert = convertToPersian(MiladiDateValue.year);
  const miladiMonthDayConvert = convertToPersian(MiladiDateValue.dayInMonth);
  MiladiDateElement.innerHTML = `<span dir="ltr"> ${miladiYearConvert}/${MiladiDateValue.month.slice(
    0,
    3
  )}/${miladiMonthDayConvert}</span>`;
};
//get ghamari Date
const getGhamariDates = async () => {
  const response = await fetch(timeUrl);
  const GhamariDate = await response.json();
  const GhamariDateValue = GhamariDate.islamicHijri;
  const ghamariYearConvert = convertToPersian(GhamariDateValue.year);
  const ghamariMonthDayConvert = convertToPersian(GhamariDateValue.dayInMonth);
  GhamariDateElement.innerHTML = `<span dir="rtl">${ghamariMonthDayConvert}/${
    GhamariDateValue.month
  }/${ghamariYearConvert.slice(0, 4)}</span>`;
};
getGhamariDates();
getMiladiDates();
getShamsiDates();
getTimes();
