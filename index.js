
let urlKyivCurrent = "http://api.openweathermap.org/data/2.5/weather?id=703448&appid=bf35cac91880cb98375230fb443a116f";

let urlParmaCurrent = "http://api.openweathermap.org/data/2.5/weather?id=6540120&appid=4d7100652708bb54cdf7ac53f4989231";

let urlAmsterdamCurrent = "http://api.openweathermap.org/data/2.5/weather?id=2759794&appid=4d7100652708bb54cdf7ac53f4989231";



let urlKyivForecast = "http://api.openweathermap.org/data/2.5/forecast?id=703448&appid=bf35cac91880cb98375230fb443a116f";

let urlParmaForecast = "http://api.openweathermap.org/data/2.5/forecast?id=6540120&appid=4d7100652708bb54cdf7ac53f4989231";

let urlAmsterdamForecast = "http://api.openweathermap.org/data/2.5/forecast?id=2759794&appid=4d7100652708bb54cdf7ac53f4989231";

let date = new Date();//dt+000

class Weather {
    constructor(weatherUrl) {
        this.weatherUrl = weatherUrl;
    }

    curWeather() {
        let data = {};
        //используем XMLHttpRequest для того чтобы сделать синхронные запросы
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `${this.weatherUrl}&units=metric`, false);
        try {
            xhr.send();
        }
        catch (error) {
        }
        data = JSON.parse(xhr.responseText);

        xhr.open("GET", `${this.weatherUrl}`, false);
        try {
            xhr.send();
        }
        catch (error) {
        }
        data.main.kelvin = JSON.parse(xhr.responseText).main.temp;

        xhr.open("GET", `${this.weatherUrl}&units=imperial`, false);
        try {
            xhr.send();
        }
        catch (error) {
        }
        data.main.imperial = JSON.parse(xhr.responseText).main.temp;
        this.renderCurObj(data);
          
    }

    renderCurObj(obj) {
        
        let output = document.querySelector('#output');

        let mainDiv = document.createElement("div");
        mainDiv.setAttribute('id', `${obj.name}Weather`);

        let inDivForIndicators = document.createElement("div");
        inDivForIndicators.setAttribute('class', `inDivForIndicators`);
        
        let divForP1 = document.createElement("div");
        divForP1.setAttribute('class', `divForP1`);
        let divForIndicators = document.createElement("div");
        divForIndicators.setAttribute('class', `divForIndicators`);    
        let divForImage = document.createElement("div");
        divForImage.setAttribute('class', `divForImage`);
        let divDate = document.createElement("div");
        divDate.setAttribute('class', `divDate`);
        let p1 = document.createElement("p");   
        p1.setAttribute('class', `p1`);

        let divForBtn = document.createElement("div");
        
        let btnWeather = document.createElement("input");
        btnWeather.setAttribute('class', `btnWeather`);
        btnWeather.setAttribute('type', 'button');
        btnWeather.setAttribute('value', 'switch');
        btnWeather.setAttribute('id', `switchButton${obj.name}`);

        let radioInput = document.createElement('input');
        radioInput.setAttribute('type', 'radio');
        radioInput.setAttribute('name', 'name');
        radioInput.setAttribute('class', `radioInput`);

        let radioInput2 = document.createElement('input');
        radioInput2.setAttribute('type', 'radio');
        radioInput2.setAttribute('name', 'name');
        radioInput2.setAttribute('class', `radioInput`);

        let radioInput3 = document.createElement('input');
        radioInput3.setAttribute('type', 'radio');
        radioInput3.setAttribute('name', 'name');
        radioInput3.setAttribute('class', `radioInput`);

        let divRadioButton = document.createElement("div");
        divRadioButton.setAttribute('class', `divRadioButton`);
        let p2 = document.createElement("p");
        p2.setAttribute('class', `p2`);
        let p3 = document.createElement("p");
        p3.setAttribute('class', `p3`);
        let img = document.createElement("img");
        img.setAttribute('class', 'img');

        p1.innerHTML += obj.name;
        p2.innerHTML += obj.main.temp + "°C";
        p3.innerHTML += obj.weather[0].description;
        img.src += `https://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`;

        mainDiv.append(divForP1, divForIndicators, divForImage);

        divForBtn.append(btnWeather);
        divForP1.append(p1);
        divDate.append(date);
        divRadioButton.append(radioInput, radioInput2, radioInput3);
        inDivForIndicators.append(divRadioButton, p2, p3, divForBtn)
        divForIndicators.append(divDate, inDivForIndicators);
        divForImage.append(img);

        let mainForecastDiv=document.querySelector(`#${obj.name}Weather`)
        if (!mainForecastDiv) {
            output.append(mainDiv);
        } else {
            mainForecastDiv.innerHTML = '';
            mainForecastDiv.append(mainDiv);
            new Forecast();

            let Forecastsasd = new Forecast(eval(`url${obj.name}Current`), eval(`url${obj.name}Forecast`));
            Forecastsasd.forecastWeather(obj.name)
        }

        divRadioButton.addEventListener("click", function () {
            // console.log('divRadioButton')
            // if (e.target.type == "radio") {
            if (radioInput.checked) {
                p2.innerHTML = `${obj.main.temp}°C`
            }
            if (radioInput2.checked) {
                p2.innerHTML = `${obj.main.kelvin}К`
            }
            if (radioInput3.checked) {
                p2.innerHTML = `${obj.main.imperial}℉`
            }
        })
    }
}

let KyivWeather = new Weather(urlKyivCurrent);
let ParmaWeather = new Weather(urlParmaCurrent);
let AmsterdamWeather = new Weather(urlAmsterdamCurrent);

KyivWeather.curWeather()
ParmaWeather.curWeather()
AmsterdamWeather.curWeather()


class Forecast extends Weather {
    constructor(weatherUrl, url) {
        super(weatherUrl)
        this.url = url;
    }

    forecastWeather(city) {
        const qwe = () => {
            let data = {};
            let xhr = new XMLHttpRequest();

            xhr.open("GET", `${this.url}&units=metric`, false);
            xhr.send();
            
            data = JSON.parse(xhr.responseText);

            xhr.open("GET", `${this.url}`, false);
            xhr.send();
            data.list.forEach((element, index) => {
                element.main.kelvin = JSON.parse(xhr.responseText).list[index].main.temp
            });

            xhr.open("GET", `${this.url}&units=imperial`, false);
            xhr.send();
            data.list.forEach((element, index) => {
                element.main.imperial = JSON.parse(xhr.responseText).list[index].main.temp;
            })
            this.renderForecastObj(data);

        }

        document.querySelector(`#switchButton${city}`).addEventListener("click", qwe);
    }

    renderForecastObj(obj) {
        let mainForecastDiv=document.querySelector(`#${obj.city.name}Weather`)
        
        let divForForecastBtn = document.createElement("div");
        divForForecastBtn.setAttribute("class", "divForForecastBtn")
        let btnWeather = document.querySelector(`#switchButton${obj.city.name}`);
        btnWeather.setAttribute("class", "btnForecastWeather")
        let p4 = document.createElement("p");
        p4.classList.add('parCity')
        let table = document.createElement("table")

        mainForecastDiv.innerHTML = "";
       
        divForForecastBtn.append(p4, btnWeather)
        mainForecastDiv.append(divForForecastBtn);
        p4.innerHTML += obj.city.name;
        for (let i = 0; i < obj.list.length; i++) {
            let tr = document.createElement("tr");
            let td = document.createElement("td");

            const elem = obj.list[i];
            let pattern = /[0][0]:[0][0]:[0][0]/;
            if (pattern.test(elem.dt_txt) == true) {
                let string = `<img class="imgForecast" src="https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png">`;

                let radioFirst = document.createElement("input");
                radioFirst.classList.add('first');
                radioFirst.type = "radio";
                radioFirst.name = `switch${i}`;
                radioFirst.setAttribute("data-val", `${elem.main.temp}°C`);
                radioFirst.setAttribute("class", "radioBtn");

                let radioSecond = document.createElement("input");
                radioSecond.classList.add('second');
                radioSecond.type = "radio";
                radioSecond.name = `switch${i}`;
                radioSecond.setAttribute("data-val", `${obj.list[i].main.kelvin}К`);
                radioSecond.setAttribute("class", "radioBtn");

                let radioThird = document.createElement("input");
                radioThird.classList.add('third');
                radioThird.type = "radio";
                radioThird.name = `switch${i}`;
                radioThird.setAttribute("data-val", `${obj.list[i].main.imperial}℉`);
                radioThird.setAttribute("class", "radioBtn");

                td.append(radioFirst, radioSecond, radioThird);
                tr.append(td);
                tr.insertAdjacentHTML("beforeend", `<td>${elem.main.temp}°C</td>`);
                tr.insertAdjacentHTML("beforeend", `<td>${elem.weather[0].description}</td>`);
                tr.insertAdjacentHTML("beforeend", `<td>${string}</td>`);
                table.append(tr);
                mainForecastDiv.append(table);
            }
        }

        table.addEventListener('click', function (e) {
            if (e.target.type === 'radio') {
                e.target.closest('tr').children[1].innerHTML = e.target.getAttribute('data-val');
            }
        })

        btnWeather.addEventListener('click', this.curWeather.bind(this)); 
        
    }
    
}

let KyivForecast = new Forecast(urlKyivCurrent, urlKyivForecast);
let ParmaForecast = new Forecast(urlParmaCurrent, urlParmaForecast);
let AmsterdamForecast = new Forecast(urlAmsterdamCurrent, urlAmsterdamForecast);
KyivForecast.forecastWeather('Kyiv')
ParmaForecast.forecastWeather('Parma')
AmsterdamForecast.forecastWeather('Amsterdam')
