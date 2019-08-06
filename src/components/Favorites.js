import React from "react";
import Header from "./Header";
import {isStrInJson,getFormattedDateAndTimeFromDateStr} from "../helper";
import {API_KEY} from "../constants";

class Favorites extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <Header/>
                <div id="eFavCitiesWrapper">
                    {this.state && this.state.favCitiesData && this.state.favCitiesData.map((oData,iIndx)=>{
                        return (
                            <div className="itm" key={iIndx}>
                                <div className="caption">{oData.city}</div>
                                <div className="content">{oData.currentDateAndTime}</div>
                                <div className="content">{oData.weatherInText}</div>
                                <div className="content">{oData.weatherInDegrees+"F"}</div>
                            </div>
                        )
                    })}
                </div>                    
            </div>
        )
    }
    componentDidMount_test(){
        const sCitiesWeatherData='[{"city":"Tokyo, Japan","currentDateAndTime":"8/5/2019 19:10:0","weatherInText":"Mostly clear","weatherInDegrees":83},{"city":"Tangshan, China","currentDateAndTime":"8/5/2019 19:18:0","weatherInText":"Cloudy","weatherInDegrees":75}]';
        this.setState({
            favCitiesData:JSON.parse(sCitiesWeatherData),
        })
}
    componentDidMount(){
        const sFavs=localStorage.getItem("fav");
        if (sFavs && isStrInJson(sFavs)){
            const arFavs=JSON.parse(sFavs);
            let arCitiesPromises=[];
            arFavs.forEach((oFav,iIndx) => {
                if (!isNaN(oFav.cityKey) && parseFloat(oFav.cityKey)>0){
                    arCitiesPromises.push(fetch("https://dataservice.accuweather.com/currentconditions/v1/"+oFav.cityKey+"?apikey="+API_KEY)); 
                }
            });
            Promise.all(arCitiesPromises)
            .then ((arCitiesData)=>{
                let arCitiesDataAsJson=[];
                arCitiesData.forEach((sCityCurrentWeatherData)=>{
                    arCitiesDataAsJson.push(sCityCurrentWeatherData.json());
                });
                return Promise.all(arCitiesDataAsJson);
            })
            .then((arCitiesDataAsJson)=>{
                const arCitiesData=arCitiesDataAsJson.map((jCityData,ii)=>{
                    return {
                        city:arFavs[ii].cityName,/*in promise.all the order of returned promises is reserved */
                        currentDateAndTime:getFormattedDateAndTimeFromDateStr(jCityData[0].LocalObservationDateTime),
                        weatherInText:jCityData[0].WeatherText,
                        weatherInDegrees:jCityData[0].Temperature.Imperial.Value,
                    }    
                });
                this.setState({
                    favCitiesData:arCitiesData,
                })
            })
            .catch((err)=>{
                console.log ("got an error when trying to load favorites data from end point. err is -"+err);
            });

        }
    }
}
export default Favorites;