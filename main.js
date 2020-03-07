const apikey = key;
let cityName = "";
let hour;
let fakeHour = 0;
let userName = "";
let testState = "OFF"

init(openSettingDialog)

function init(callbackSettings) {
    createSettingsBtn()
    return (cityName) ? render() : callbackSettings();
}

function render() {
    fetchWeather(cityName, apikey)
    showTime()
    if (testState === "ON")
        testClock()
    else
        setColorByHour(hour)
}

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
    let hour = currentTime.getHours();
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
    greet(userName,hour)
    setTimeout(() => showTime(), 1000);
};

function weatherStyle(data) {
    if (data.clouds.all >= 20)
        document.querySelector('.clouds2').setAttribute('style', 'visibility:visible')

    if (data.clouds.all >= 40)
        document.querySelector('.clouds').setAttribute('style', 'visibility:visible')

    if (data.rain)
        document.querySelector('.rain').setAttribute('style', 'visibility:visible')

    if (data.snow)
        document.querySelector('.snow').setAttribute('style', 'visibility:visible')



}

function fetchWeather(city, apikey, ) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
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

function testClock() {
    if (fakeHour === 24) {
        fakeHour = 0;
    }
    setTimeout(() => {
        if(testState==="ON"){
        setColorByHour(fakeHour)
        greet(userName, fakeHour)
        console.log("test ON - " + fakeHour);
        fakeHour++
        testClock()
        }
    }, 2000);

}

function createSettingsBtn() {
    const setBtnElement = document.createElement('i')
    setBtnElement.id = "cog-btn";
    setBtnElement.style = "font-size:50px";
    setBtnElement.className = "cog-icon fa";
    setBtnElement.innerHTML = "&#xf013"
    setBtnElement.onclick = () => {
        setBtnElement.innerHTML = ""
        setBtnElement.className = "fa fa-gear fa-spin";
        openSettingDialog()
    }
    document.querySelector('.cog-icon').appendChild(setBtnElement)

}




function openSettingDialog() {
    const dialogBox = document.querySelector('.dialog-box')
    dialogBox.setAttribute('style', 'height:600px')

    const dialogElement = document.createElement('div')
    dialogElement.className = "dialog-element";
    dialogElement.setAttribute('style', 'height:600px')
    dialogElement.innerHTML = 'SETTINGS';

    const userNameTitle = document.createElement('p')
    userNameTitle.innerHTML = 'USER NAME';

    const nameInputElement = document.createElement('input')
    nameInputElement.placeholder = `${userName}`
    nameInputElement.className = 'text-input';

    const cityNameTitle = document.createElement('p')
    cityNameTitle.innerHTML = 'LOCATION';

    const cityInputElement = document.createElement('input')
    cityInputElement.className = 'text-input';
    if (cityName)
    cityInputElement.placeholder = `${cityName},`;
    else
    cityInputElement.placeholder = 'City Name, State (opt), Country (opt)'

    const imgTitle = document.createElement('p')
    imgTitle.innerHTML = 'CHANGE COVER';

    const imgInputElement = document.createElement('input')
    imgInputElement.placeholder = `Enter cover image URL`
    imgInputElement.className = 'text-input';



    const switchBox = document.createElement('div')
    switchBox.className = 'switch-box';

    const testTitle = document.createElement('p')
    testTitle.innerHTML = 'TESTER'

    const testSwitchContainer = document.createElement('div')
    testSwitchContainer.className = 'test-switch-container'
    const testSwitchElement = document.createElement('div')
    testSwitchElement.className = 'test-switch'
    if (testState === "ON") {
        testSwitchElement.setAttribute('style', 'left:25px')
        testSwitchContainer.setAttribute('style', ' background:yellowgreen')
    } else {
        testSwitchElement.setAttribute('style', 'left:0px')
        testSwitchContainer.setAttribute('style', ' background:rgb(40,40,40)')
    }
    testSwitchContainer.onclick = () => {
        if (testState === "OFF") {
            testSwitchElement.setAttribute('style', 'left:25px')
            testSwitchContainer.setAttribute('style', ' background:yellowgreen')
            testState = "ON";
        } else {
            testSwitchElement.setAttribute('style', 'left:0px')
            testState = "OFF";
            testSwitchContainer.setAttribute('style', ' background:rgb(40,40,40)')
        }
    }
    testSwitchContainer.appendChild(testSwitchElement)

    switchBox.appendChild(testTitle)
    switchBox.appendChild(testSwitchContainer)

    const btnLine = document.createElement('div')
    btnLine.className = 'btn-line'

    const saveBtn = document.createElement('button')
    saveBtn.innerHTML = 'SAVE';
    saveBtn.onclick = () => {
        userName = (nameInputElement.value) ? nameInputElement.value : nameInputElement.placeholder;
        cityName = (cityInputElement.value) ? cityInputElement.value : cityInputElement.placeholder;
        let imgURL = imgInputElement.value;
        if(imgInputElement.value)
        document.querySelector('body').setAttribute('style',`background:url(${imgURL});background-size:cover; background-position:center;`)
        closeDialog()
        render()
    }

    const cancelBtn = document.createElement('button')
    cancelBtn.innerHTML = 'CANCEL';
    cancelBtn.onclick = () => { closeDialog() }

    btnLine.appendChild(cancelBtn)
    btnLine.appendChild(saveBtn)

    dialogElement.appendChild(userNameTitle)
    dialogElement.appendChild(nameInputElement)
    dialogElement.appendChild(cityNameTitle)
    dialogElement.appendChild(cityInputElement)
    dialogElement.appendChild(imgTitle)
    dialogElement.appendChild(imgInputElement)
    dialogElement.appendChild(switchBox)
    dialogElement.appendChild(btnLine)
    dialogBox.appendChild(dialogElement)

}

function closeDialog() {
    if (cityName) {
        const setBtnElement = document.querySelector('#cog-btn')
        setBtnElement.style = "font-size:50px";
        setBtnElement.className = "cog-icon fa";
        setBtnElement.innerHTML = "&#xf013";

        document.querySelector('.dialog-element').setAttribute('style', 'height:0')
        document.querySelector('.dialog-box').setAttribute('style', 'visibility:hidden')
    }
}
