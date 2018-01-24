import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class Main extends React.Component {
    constructor(props){
        super(props);
        this.rows=30;
        this.cols=50;
         this.state={
             generation:0,
             gridfull:Array(this.rows).fill().map(() => Array(this.cols).fill(false))
         }
    }

    render(){

        return(
        <div>

           <h1> Game of life </h1>


           <Grid
           gridfull={this.state.gridfull}
           rows={this.rows}
           cols={this.cols}
           selectbox={this.selectbox}
            />


           <h2> Generations:{this.state.generation}</h2>


            </div>

        );
    }
}
class Grid extends React.Component{
    render(){
        const width=(this.props.cols*14);
        var rowsarr=[];
        var boxclass="";
        for(var i=0;i<this.props.rows;i++){
            for(var j=0;j<this.props.cols;j++){
                let boxid=i+"_"+j;
                boxclass=this.props.gridfull[i][j]? "box on":"box off";
                rowsarr.push(
					<Box
						boxclass={boxclass}
						key={boxid}
						boxid={boxid}
						row={i}
						col={j}
						selectbox={this.props.selectbox}
					/>
				);

            }
        }

        return(
         <div className="grid" style={{width:width}}>
             {rowsarr}
             </div>

        );
    }
}
class Box extends React.Component{
    selectbox =()=>{
        this.props.selectbox(this.props.row,this.props.col);
    }
render(){

    return(
    <div
        className={this.props.boxclass}
        id={this.props.boxid}
        onClick={this.selectbox}
      />

    );
}

}

var approot=document.getElementById('appid');//CONNECT IT FIRST
ReactDOM.render(<Main/>,approot);
