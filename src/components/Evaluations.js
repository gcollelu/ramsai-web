import React from 'react';
import {
    XYPlot,
    XAxis, // Shows the values on x axis
    YAxis, // Shows the values on y axis
    VerticalBarSeries,
    LabelSeries
} from 'react-vis';
import { ScaleLoader } from 'react-spinners';
import { css } from '@emotion/core';
import * as db from '../db';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export default class Evaluations extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      votes: null,
      upVotes: null,
      downVotes: null,
      noVotes: null
    }
  }

  componentDidMount() {
    var updateVotes = votes => this.setState({votes}, 
        () => {
            // console.log(this.state.votes);
            this.setState({
                upVotes: this.state.votes.filter(recipe => recipe.vote !== undefined && recipe.vote === true),
                downVotes: this.state.votes.filter(recipe => recipe.vote !== undefined && recipe.vote === false),
                noVotes: this.state.votes.filter(recipe => recipe.vote === undefined || recipe.vote === null)
            }, () => this.setState({loading: false}))
    });
    db.getVotes(updateVotes);
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  renderHistogram = () => {
    const upVotes = {"y" : this.state.upVotes.length, "x": "🤤👍"};
    const downVotes = {"y" : this.state.noVotes.length, "x": "🤔❓"};
    const noVotes = {"y" : this.state.downVotes.length, "x": "🤮👎"};;
    const data = [downVotes, noVotes, upVotes];  
    const chartWidth = 600;
    const chartHeight = 300;
    const chartDomain = [0, chartHeight];
    return (
        <XYPlot 
        xType="ordinal" 
        margin={{left: 50, right: 50, top:50, bottom: 50}}
        width={chartWidth} 
        height={chartHeight} 
        yDomain={chartDomain}
        >
        <XAxis />
        <YAxis />
        <VerticalBarSeries
            data={data}
        />
        <LabelSeries
            data={data.map(obj => {
                return { ...obj, label: obj.y.toString() }
            })}
            labelAnchorX="middle"
            labelAnchorY="text-after-edge"
        />
    </XYPlot>
);

  }

  fetchUpVotes = () => {

    if (this.unsubscribe) this.unsubscribe();

    this.unsubscribe = db.getVotes(true, (upVotes) => {
      this.setState({ upVotes }, console.log(this.state.upVotes));
    });
  }


  render() {
    const {recipe} = this.state
    return (
        <div className="container has-text-centered">
          <div className='sweet-loading'>
            <ScaleLoader
              css={override}
              sizeUnit={"px"}
              size={150}
              color={'#FF3860'}
              loading={this.state.loading}
            />
          </div>
          <div className=" recipe-container">
            {!this.state.loading && this.renderHistogram()}
          </div>
        </div>
    );
  }
}
