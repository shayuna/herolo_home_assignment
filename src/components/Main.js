/*
#1 - shayz - 03/08/2019 - the select+input jquery plugin replaces between value and label when 
    choosing elements, so this hack was necessary
*/
import React from "react";
import Header from "./Header";
import $ from 'jquery';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/autocomplete';
import {getFormattedDateFromDateStr} from "../helper";

class Main extends React.Component{
    constructor(props){
//        localStorage.clear();
        super(props);
        this.state={
            searchBoxInput:"",
            selectedCityKey:-1,
            selectedCityName:"",
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
                                        <div className="caption">{getFormattedDateFromDateStr(itm.Date)}</div>
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
    refreshWeatherData(sCityKey,sCityName){
        let jSelectedCity5DayForecast={},jSelectedCityCurrentWeather={};
        fetch("http://dataservice.accuweather.com/forecasts/v1/daily/5day/"+sCityKey+"?apikey="+this.state.apiKey)
        .then((sData)=>{
            return sData.json();
        })
        .then((jData)=>{
            jSelectedCity5DayForecast=jData;
            return fetch("http://dataservice.accuweather.com/currentconditions/v1/"+sCityKey+"?apikey="+this.state.apiKey);
        })
        .then((sData)=>{
            return sData.json();
        })
        .then((jData)=>{
            jSelectedCityCurrentWeather=jData;
        })
        .catch((err)=>{
            console.log("err in refreshWeatherData. err is"+err);
        })
        .finally(()=>{
            this.setState({
                selectedCityKey:sCityKey,
                selectedCityName:sCityName,
                selectedCity5DayForecast:jSelectedCity5DayForecast,
                selectedCityCurrentWeather:jSelectedCityCurrentWeather,
            });
        });
    }
    chngSearchBoxContent(e){
        const sInput=e.target.value;
        fetch("http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey="+this.state.apiKey+"&q="+sInput)
        .then((sLocations)=>{
            return sLocations.json();
        })
        .then((jLocations)=>{
            let arOptions=[];
            jLocations.forEach((jLocation)=>{
                    arOptions.push({label:jLocation.LocalizedName+", "+jLocation.Country.LocalizedName,value:jLocation.Key});
            });
            $( "#eSearchBox" ).autocomplete("option","source",arOptions);
  
            this.setState({
                searchBoxInput:sInput,
            });
        })
        .catch((err)=>{
            console.log("err in chngSearchBoxContent. err is"+err);
        });
    }
    isSelectedCityInFav(){
        let arFav=localStorage.getItem("fav") ? JSON.parse( localStorage.getItem("fav")) : []; 
        return this.state.selectedCityKey!==-1 && arFav.map((oFav)=>oFav.cityKey).includes(this.state.selectedCityKey);
    }
    setFavState(e){
        e.target.classList.toggle("on");
        let arFav=localStorage.getItem("fav") ? JSON.parse( localStorage.getItem("fav")) : []; 
        if (e.target.classList.contains("on")){
            if (!this.isSelectedCityInFav())arFav.push({cityKey:this.state.selectedCityKey,cityName:this.state.selectedCityName});
        }
        else{
            if (this.isSelectedCityInFav())arFav.splice(arFav.map((oFav)=>oFav.cityKey).indexOf(this.state.selectedCityKey),1);
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
            this.refreshWeatherData(ui.item.value,ui.item.label);
          });
          this.refreshWeatherData(215854,"Tel Aviv, Israel");
    }    

}
export default Main;