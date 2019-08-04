/*
#1 - shayz - 03/08/2019 - the select+input jquery plugin replaces between value and label when 
    choosing elements, so this hack was necessary
*/
import React from "react";
import Header from "./Header";
import $ from 'jquery';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/autocomplete';

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchBoxInput:"",
            selectedCityKey:-1,
            selectedCity5DayForecast:{},
            selectedCityCurrentWeather:{},
            apiKey:"GcZqKb7KlD30uEszhdq98u8g958gwSGq",
        }
        this.chngSearchBoxContent=this.chngSearchBoxContent.bind(this);
        this.refreshWeatherData=this.refreshWeatherData.bind(this);
        this.setFavState=this.setFavState.bind(this);
        this.isSelectedCityInFav=this.isSelectedCityInFav.bind(this);
    }
    render(){
        return (
            <div id="eMainPg">
                <Header/>
                <main className="main">
                    <div id="eSearchBoxWrapper">
                        <div id="eFavBtn" className={this.isSelectedCityInFav() ? "on" : ""}onClick={this.setFavState}/>
                        <input id="eSearchBox" autoFocus onChange={this.chngSearchBoxContent} value={this.state.searchBoxInput}/>
                    </div>
                    <div id="eOutputWrapper">
                        <div id="eCurrentWeatherCaption">
                            {(this.state.selectedCityCurrentWeather[0] && this.state.selectedCityCurrentWeather[0].WeatherText) ? this.state.selectedCityCurrentWeather[0].WeatherText : "got some problems retrieving data from server.try refreshing the page"}
                        </div>
                        <div id="eFutureForecastWrapper">
                        {this.state.selectedCity5DayForecast.DailyForecasts && this.state.selectedCity5DayForecast.DailyForecasts.map((itm,indx)=>{
                                return (
                                    <div className="itm" key={indx}>
                                        <div className="caption">{((new Date(itm.Date)).getMonth()+1)+"/"+(new Date(itm.Date)).getDate()+"/"+(new Date(itm.Date)).getFullYear()}</div>
                                        <div className="content">{itm.Temperature.Minimum.Value+"F"+" - "+itm.Temperature.Maximum.Value+"F"}</div>
                                    </div>
                                )
                            })
                        }                            
                        </div>
                    </div>
                </main>
            </div>

        )
    }
    refreshWeatherData(sCityKey){
/*
        let jSelectedCity5DayForecast={},jSelectedCityCurrentWeather={};
        fetch("http://dataservice.accuweather.com/forecasts/v1/daily/5day/"+sCityKey+"?apikey="+this.state.apiKey)
        .then((sData)=>{
            return sData.json();
        })
        .then((jData)=>{
            console.log ("fetch 5 days forecast - "+JSON.stringify(jData));
            jSelectedCity5DayForecast=jData;
            return fetch("http://dataservice.accuweather.com/currentconditions/v1/"+sCityKey+"?apikey="+this.state.apiKey);
        })
        .then((sData)=>{
            return sData.json();
        })
        .then((jData)=>{
            console.log ("fetch current weather - "+JSON.stringify(jData));
            jSelectedCityCurrentWeather=jData;
        })
        .catch((err)=>{
            console.log("err in refreshWeatherData. err is"+err);
        })
        .finally(()=>{
            console.log ("did it 123");
            this.setState({
                selectedCity5DayForecast:jSelectedCity5DayForecast,
                selectedCityCurrentWeather:jSelectedCityCurrentWeather,
            });
        });
*/
        
        const sWeather5DaysForecast='{"Headline":{"EffectiveDate":"2019-08-04T07:00:00+09:00","EffectiveEpochDate":1564869600,"Severity":7,"Text":"Humid Sunday to Monday","Category":"humidity","EndDate":"2019-08-05T19:00:00+09:00","EndEpochDate":1564999200,"MobileLink":"http://m.accuweather.com/en/jp/tokyo/226396/extended-weather-forecast/226396?lang=en-us","Link":"http://www.accuweather.com/en/jp/tokyo/226396/daily-weather-forecast/226396?lang=en-us"},"DailyForecasts":[{"Date":"2019-08-03T07:00:00+09:00","EpochDate":1564783200,"Temperature":{"Minimum":{"Value":78,"Unit":"F","UnitType":18},"Maximum":{"Value":89,"Unit":"F","UnitType":18}},"Day":{"Icon":2,"IconPhrase":"Mostly sunny","HasPrecipitation":false},"Night":{"Icon":34,"IconPhrase":"Mostly clear","HasPrecipitation":false},"Sources":["AccuWeather"],"MobileLink":"http://m.accuweather.com/en/jp/tokyo/226396/daily-weather-forecast/226396?lang=en-us","Link":"http://www.accuweather.com/en/jp/tokyo/226396/daily-weather-forecast/226396?lang=en-us"},{"Date":"2019-08-04T07:00:00+09:00","EpochDate":1564869600,"Temperature":{"Minimum":{"Value":76,"Unit":"F","UnitType":18},"Maximum":{"Value":92,"Unit":"F","UnitType":18}},"Day":{"Icon":3,"IconPhrase":"Partly sunny","HasPrecipitation":false},"Night":{"Icon":35,"IconPhrase":"Partly cloudy","HasPrecipitation":false},"Sources":["AccuWeather"],"MobileLink":"http://m.accuweather.com/en/jp/tokyo/226396/daily-weather-forecast/226396?day=1&lang=en-us","Link":"http://www.accuweather.com/en/jp/tokyo/226396/daily-weather-forecast/226396?day=1&lang=en-us"},{"Date":"2019-08-05T07:00:00+09:00","EpochDate":1564956000,"Temperature":{"Minimum":{"Value":80,"Unit":"F","UnitType":18},"Maximum":{"Value":89,"Unit":"F","UnitType":18}},"Day":{"Icon":6,"IconPhrase":"Mostly cloudy","HasPrecipitation":false},"Night":{"Icon":35,"IconPhrase":"Partly cloudy","HasPrecipitation":false},"Sources":["AccuWeather"],"MobileLink":"http://m.accuweather.com/en/jp/tokyo/226396/daily-weather-forecast/226396?day=2&lang=en-us","Link":"http://www.accuweather.com/en/jp/tokyo/226396/daily-weather-forecast/226396?day=2&lang=en-us"},{"Date":"2019-08-06T07:00:00+09:00","EpochDate":1565042400,"Temperature":{"Minimum":{"Value":80,"Unit":"F","UnitType":18},"Maximum":{"Value":91,"Unit":"F","UnitType":18}},"Day":{"Icon":4,"IconPhrase":"Intermittent clouds","HasPrecipitation":false},"Night":{"Icon":34,"IconPhrase":"Mostly clear","HasPrecipitation":false},"Sources":["AccuWeather"],"MobileLink":"http://m.accuweather.com/en/jp/tokyo/226396/daily-weather-forecast/226396?day=3&lang=en-us","Link":"http://www.accuweather.com/en/jp/tokyo/226396/daily-weather-forecast/226396?day=3&lang=en-us"},{"Date":"2019-08-07T07:00:00+09:00","EpochDate":1565128800,"Temperature":{"Minimum":{"Value":79,"Unit":"F","UnitType":18},"Maximum":{"Value":89,"Unit":"F","UnitType":18}},"Day":{"Icon":3,"IconPhrase":"Partly sunny","HasPrecipitation":false},"Night":{"Icon":35,"IconPhrase":"Partly cloudy","HasPrecipitation":false},"Sources":["AccuWeather"],"MobileLink":"http://m.accuweather.com/en/jp/tokyo/226396/daily-weather-forecast/226396?day=4&lang=en-us","Link":"http://www.accuweather.com/en/jp/tokyo/226396/daily-weather-forecast/226396?day=4&lang=en-us"}]}';
        const sCurrentWeather='[{"LocalObservationDateTime":"2019-08-04T04:10:00+09:00","EpochTime":1564859400,"WeatherText":"Mostly clear","WeatherIcon":34,"HasPrecipitation":false,"PrecipitationType":null,"IsDayTime":false,"Temperature":{"Metric":{"Value":25.4,"Unit":"C","UnitType":17},"Imperial":{"Value":78,"Unit":"F","UnitType":18}},"MobileLink":"http://m.accuweather.com/en/jp/tokyo/226396/current-weather/226396?lang=en-us","Link":"http://www.accuweather.com/en/jp/tokyo/226396/current-weather/226396?lang=en-us"}]';
        this.setState({
            selectedCityKey:sCityKey,
            selectedCity5DayForecast:JSON.parse(sWeather5DaysForecast),
            selectedCityCurrentWeather:JSON.parse(sCurrentWeather),
        });
    }
    chngSearchBoxContent(e){
        const sInput=e.target.value;
        /*
        fetch("http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey="+this.state.apiKey+"&q="+sInput)
        .then((sData)=>{
            console.log (sData);
            return sData.json();
        })
        .then((jData)=>{
            console.log (JSON.stringify(jData));
            this.setState({
                searchBoxInput:sInput,
            });
        })
        .catch((err)=>{
            console.log("err in chngSearchBoxContent. err is"+err);
        });
        */
            const sLocations="[{\"Version\":1,\"Key\":\"226396\",\"Type\":\"City\",\"Rank\":10,\"LocalizedName\":\"Tokyo\",\"Country\":{\"ID\":\"JP\",\"LocalizedName\":\"Japan\"},\"AdministrativeArea\":{\"ID\":\"13\",\"LocalizedName\":\"Tokyo\"}},{\"Version\":1,\"Key\":\"106770\",\"Type\":\"City\",\"Rank\":11,\"LocalizedName\":\"Taiyuan\",\"Country\":{\"ID\":\"CN\",\"LocalizedName\":\"China\"},\"AdministrativeArea\":{\"ID\":\"SX\",\"LocalizedName\":\"Shanxi\"}},{\"Version\":1,\"Key\":\"106780\",\"Type\":\"City\",\"Rank\":11,\"LocalizedName\":\"Tianjin\",\"Country\":{\"ID\":\"CN\",\"LocalizedName\":\"China\"},\"AdministrativeArea\":{\"ID\":\"TJ\",\"LocalizedName\":\"Tianjin\"}},{\"Version\":1,\"Key\":\"58491\",\"Type\":\"City\",\"Rank\":13,\"LocalizedName\":\"Tongren\",\"Country\":{\"ID\":\"CN\",\"LocalizedName\":\"China\"},\"AdministrativeArea\":{\"ID\":\"GZ\",\"LocalizedName\":\"Guizhou\"}},{\"Version\":1,\"Key\":\"102324\",\"Type\":\"City\",\"Rank\":13,\"LocalizedName\":\"Tangshan\",\"Country\":{\"ID\":\"CN\",\"LocalizedName\":\"China\"},\"AdministrativeArea\":{\"ID\":\"HE\",\"LocalizedName\":\"Hebei\"}},{\"Version\":1,\"Key\":\"59573\",\"Type\":\"City\",\"Rank\":13,\"LocalizedName\":\"Taizhou\",\"Country\":{\"ID\":\"CN\",\"LocalizedName\":\"China\"},\"AdministrativeArea\":{\"ID\":\"JS\",\"LocalizedName\":\"Jiangsu\"}},{\"Version\":1,\"Key\":\"60198\",\"Type\":\"City\",\"Rank\":13,\"LocalizedName\":\"Tongliao\",\"Country\":{\"ID\":\"CN\",\"LocalizedName\":\"China\"},\"AdministrativeArea\":{\"ID\":\"NM\",\"LocalizedName\":\"Inner Mongolia\"}},{\"Version\":1,\"Key\":\"106571\",\"Type\":\"City\",\"Rank\":13,\"LocalizedName\":\"Tai'an\",\"Country\":{\"ID\":\"CN\",\"LocalizedName\":\"China\"},\"AdministrativeArea\":{\"ID\":\"SD\",\"LocalizedName\":\"Shandong\"}},{\"Version\":1,\"Key\":\"58055\",\"Type\":\"City\",\"Rank\":15,\"LocalizedName\":\"Tianshui\",\"Country\":{\"ID\":\"CN\",\"LocalizedName\":\"China\"},\"AdministrativeArea\":{\"ID\":\"GS\",\"LocalizedName\":\"Gansu\"}},{\"Version\":1,\"Key\":\"2333653\",\"Type\":\"City\",\"Rank\":15,\"LocalizedName\":\"Taizhou\",\"Country\":{\"ID\":\"CN\",\"LocalizedName\":\"China\"},\"AdministrativeArea\":{\"ID\":\"ZJ\",\"LocalizedName\":\"Zhejiang\"}}]";
            const jLocations=JSON.parse(sLocations);
            let arOptions=[];
            jLocations.forEach((jLocation)=>{
                    arOptions.push({label:jLocation.LocalizedName+", "+jLocation.Country.LocalizedName,value:jLocation.Key});
            });
            $( "#eSearchBox" ).autocomplete("option","source",arOptions);
            this.setState({
                searchBoxInput:sInput,
            });
    }
    isSelectedCityInFav(){
        let arFav=localStorage.getItem("fav") ? JSON.parse( localStorage.getItem("fav")) : []; 
        return this.state.selectedCityKey!==-1 && arFav.includes(this.state.selectedCityKey);
    }
    setFavState(e){
        e.target.classList.toggle("on");
        let arFav=localStorage.getItem("fav") ? JSON.parse( localStorage.getItem("fav")) : []; 
        if (e.target.classList.contains("on")){
            if (!this.isSelectedCityInFav())arFav.push(this.state.selectedCityKey);
        }
        else{
            if (this.isSelectedCityInFav())arFav.splice(arFav.indexOf(this.state.selectedCityKey),1);
        }
        localStorage.setItem("fav",JSON.stringify(arFav));
    }
    componentDidMount(){
          $( "#eSearchBox" ).autocomplete();
          $( "#eSearchBox" ).on( "autocompletefocus", ( event, ui )=> {//#1
            event.preventDefault();
            this.setState({
                searchBoxInput:ui.item.label,
            });
          });
          $( "#eSearchBox" ).on( "autocompleteselect", ( event, ui ) =>{//#1
            event.preventDefault();
            this.setState({
                searchBoxInput:ui.item.label,
            });
            this.refreshWeatherData(ui.item.value);
          });
    }    

}
export default Main;