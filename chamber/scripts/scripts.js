// date
const date = new Date()
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

const dayNames = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

const dayName = dayNames[date.getDay()]
const monthName = monthNames[date.getMonth()]

const completeDate = `${dayName}, ${day} ${monthName} ${year}`;
document.getElementById('header-date')
  .innerText = completeDate;

// last modified
const lastModified = new Date(document.lastModified);
const lastModifiedMonth = ('0' + lastModified.getMonth()).slice(-2);
const lastModifiedDay = ('0' + lastModified.getDay()).slice(-2);
const lastModifiedHour = ('0' + lastModified.getHours()).slice(-2);
const lastModifiedMinute = ('0' + lastModified.getMinutes()).slice(-2);
const lastModifiedSecond = ('0' + lastModified.getSeconds()).slice(-2);
const lastModifiedDate = 'Last modification: ' + lastModifiedDay +
  '/' + lastModifiedMonth + '/' + lastModified.getFullYear() +
  '/' + lastModifiedHour + ':' + lastModified.getMinutes() + ':' +
  lastModified.getSeconds();
  
document.getElementById('last-modified')
  .innerText = lastModifiedDate;