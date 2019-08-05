import React from "react";
import {connect} from "react-redux";
import {MAIN_PG,FAVORITES_PG} from "../constants";
import {setPage} from "../redux/actions/pageManagerAct";

class Header extends React.Component{
    render(){
        return(
            <div className="Hdr">
                <h1 className="caption">weather for a sweater</h1>
                <span className={this.props.selectedPg===MAIN_PG ? "on btn" : "btn"} onClick={()=>{this.props.setPage(MAIN_PG)}}>Main</span>
                <span className={this.props.selectedPg===FAVORITES_PG ? "on btn" : "btn"} onClick={()=>{this.props.setPage(FAVORITES_PG)}}>Favorites</span>
            </div>
        )

    }

}

const mapStateToProps = (state)=>{
    return {
        selectedPg:state.pageManager.pg,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        setPage:(sPg)=>{dispatch(setPage(sPg))},
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);