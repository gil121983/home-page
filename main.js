let cityName = "Kfar Saba";
let countryName = "Israel";
const apikey = key;
let hour;
let fakeHour = 0;
const userName = 'Gil';

function greet(userName, hour) {
    if (hour >= 5 && hour <= 14)
        document.querySelector('.greetings').innerHTML = `Good Morning ${userName}!`
    else if (hour >= 15 && hour <= 19)
        document.querySelector('.greetings').innerHTML = `Good Afternoon ${userName}!`
    else if (hour >= 20 && hour <= 23)
        document.querySelector('.greetings').innerHTML = `Good Evening ${userName}!`
    else
        document.querySelector('.greetings').innerHTML = `Good Night ${userName}!`

}

function showTime() {
    let currentTime = new Date()
    hour = currentTime.getHours();
    let min = (currentTime.getMinutes() < 10 ? '0' : '') + currentTime.getMinutes()
    document.querySelector('.clock').innerHTML = `${hour}:${min}`

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let dayName = days[currentTime.getDay()]
    let dayOfMonth = currentTime.getDate()
    let monthName = monthNames[currentTime.getMonth()]
    document.querySelector('.dayNdate').innerHTML = `${dayName} ${dayOfMonth} ${monthName}`;
    setTimeout(() => showTime(), 1000);
};

function weatherStyle(data) {
    if (data.clouds.all >= 20)
        document.querySelector('.clouds2').setAttribute('style', 'visibility:visible')

    if (data.clouds.all >= 40)
        document.querySelector('.clouds').setAttribute('style', 'visibility:visible')

    if (data.rain)
        document.querySelector('.rain').setAttribute('style','visibility:visible')

    if (data.snow)
        document.querySelector('.snow').setAttribute('style','visibility:visible')



}

function fetchWeather(city, country, apikey) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apikey}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            document.querySelector(".current-city").innerHTML = data.name;
            let temp = parseInt(data.main.temp / 17.2)
            document.querySelector(".temp").innerHTML = `${temp}°C`;
            console.log(data)
            weatherStyle(data)
        });
};

function setColorByHour(hour) {
    // let hour = new Date().getHours();
    // console.log(hour,"daylight FX updated");
    let rgb;
    let grad;

    if (hour === 5) {
        rgb = "200,112,0";
        grad = 55;
    } else if (hour === 6) {
        rgb = "225,225,0";
        grad = 40;
    } else if (hour === 7) {
        rgb = "225,225,30";
        grad = 30;
    } else if (hour === 8) {
        rgb = "225,225,0";
        grad = 20;
    } else if (hour === 9) {
        rgb = "225,225,0";
        grad = 10;
    } else if (hour === 10) {
        rgb = "225,225,28";
        grad = 10;
    } else if (hour === 11) {
        rgb = "225,225,28";
        grad = 20;
    } else if (hour === 12) {
        rgb = "225,225,56";
        grad = 20;
    } else if (hour === 13) {
        rgb = "225,225,112";
        grad = 20;
    } else if (hour === 14) {
        rgb = "225,225,168";
        grad = 20;
    } else if (hour === 15) {
        rgb = "225,225,225";
        grad = 20;
    } else if (hour === 16) {
        rgb = "225,200,112";
        grad = 30;
    } else if (hour === 17) {
        rgb = "225,175,56";
        grad = 40;
    } else if (hour === 18) {
        rgb = "225,150,0";
        grad = 50;
    } else if (hour === 19) {
        rgb = "112,50,0";
        grad = 60;
    } else {
        rgb = "0,0,0";
        grad = 70;
    }
    let daylightColor = `linear-gradient(180deg,rgb(${rgb}),${grad}%,transparent)`;
    document.querySelector('.dayLightScreen').setAttribute('style', `background:${daylightColor}`)
    setTimeout(() => setColorByHour(), 600000);
}


fetchWeather(cityName, countryName, apikey)
showTime()
testClock()

function testClock() {
    if (fakeHour === 24) {
        fakeHour = 0;
    }
    setTimeout(() => {
        setColorByHour(fakeHour)
        greet(userName, fakeHour)
        fakeHour++
        testClock()
    }, 5000);
}

