import React from "react";
import {connect} from "react-redux";
import Favorites from "./Favorites";
import Main from "./Main";
import {MAIN_PG,FAVORITES_PG} from "../constants";

class App extends React.Component{
    render(){
        let elmToUse;
        switch (this.props.selectedPg){
            case MAIN_PG:
                elmToUse=<Main/>
                break;
            case FAVORITES_PG:
                elmToUse=<Favorites/>;
                break;
            default:
                elmToUse=<div>something not working. please report to the authorities (or administrator) the one with the less digits to dial :)</div>;
        }
        return (
            <div>{elmToUse}</div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        selectedPg:state.pageManager.pg,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
