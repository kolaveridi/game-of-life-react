import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class Main extends React.Component {
    constructor(props){
        super(props);
        this.rows=30;
        this.cols=50;
        this.speed=100;
         this.state={
             generation:0,
             gridfull:Array(this.rows).fill().map(() => Array(this.cols).fill(false))
         }
    }

     selectbox=(row,col)=>{
         let gridcopy=arrayclone(this.state.gridfull);
         gridcopy[row][col]=!gridcopy[row][col];

         this.setState({
             gridfull:gridcopy
         })
     }
     seed=()=>{
         console.log("seed");
        let gridcopy=arrayclone(this.state.gridfull);
        for(let i=0;i<this.rows;i++){
            for(let j=0;j<this.cols;j++){
                if(Math.floor(Math.random()*4)===1){
                    console.log("random");
                    gridcopy[i][j]=true;
                }
            }
        }
        this.setState({
            gridfull:gridcopy
        });
       
     }
     playbutton =()=>{
        clearInterval(this.intervalId);
         this.intervalId=setInterval(this.play,this.speed);
     }
     slow=()=>{
         this.speed=1000;
         this.playbutton();
     }
     fast=()=>{
         this.speed=10;
         this.playbutton();
     }
     clear =()=>{
         // make a grid again all having false and then change the state of grid to this 
         let twodarray=Array(this.rows).fill().map(() => Array(this.cols).fill(false));
         this.setState({
             gridfull:twodarray,
             generation:0
         });
   }
     play = () => {
         console.log("play ");
		let g = this.state.gridfull;
		let g2 = arrayclone(this.state.gridfull);

		for (let i = 0; i < this.rows; i++) {
		  for (let j = 0; j < this.cols; j++) {
            let count = 0;
            console.log("count is"+count);
		    if (i > 0) if (g[i - 1][j]) count++;
		    if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
		    if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
		    if (j < this.cols - 1) if (g[i][j + 1]) count++;
		    if (j > 0) if (g[i][j - 1]) count++;
		    if (i < this.rows - 1) if (g[i + 1][j]) count++;
		    if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
		    if (i < this.rows - 1 && this.cols - 1) if (g[i + 1][j + 1]) count++;
            if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
            
		    if (!g[i][j] && count === 3) g2[i][j] = true;
		  }
		}
		this.setState({
		  gridfull: g2,
		  generation: this.state.generation + 1
		});

	}

     componentDidMount(){
         this.seed();
         this.playbutton();
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
            <Buttons 
            slow={this.slow}
           fast={this.fast}
           clear={this.clear}
           seed={this.seed}
            />

           <h2> Generations:{this.state.generation}</h2>


            </div>

        );
    }
}
class Buttons extends React.Component{
    render(){
        return(


           <div className="center">
            <button classNmae="btn" onClick={this.props.slow}>Slow</button>
            <button className="btn" onClick={this.props.fast}>Fast</button>
            <button className="btn" onClick={this.props.clear}>Clear</button>
            <button className="btn" onClick={this.props.seed}>Seed </button>
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
function arrayclone(arr) {
        return JSON.parse(JSON.stringify(arr));
}
var approot=document.getElementById('appid');//CONNECT IT FIRST
ReactDOM.render(<Main/>,approot);
