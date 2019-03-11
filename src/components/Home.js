import React from 'react';
import axios from 'axios';
import translate from 'moji-translate';
import {all , extractEmoji} from 'extract-emoji';

export default class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      recipe : null
    }
  }

  componentDidMount() {
    this.generateRecipe();
  }

  generateRecipe = () => {
    const config = {
      headers: {"Access-Control-Allow-Origin": "*"}
    }
    axios.get("https://ramsai.herokuapp.com/predict", config)
          .then(response => {this.setState({recipe: response.data.prediction}); window.scrollTo(0, 0);})
          .catch(error => console.log(error) );
  }
  capitalizeFirstLetter = (string) =>  string.charAt(0).toUpperCase() + string.slice(1);


  renderRecipe = recipe => {
    var steps = recipe.steps.map((step, index) => ({id: index, content: this.capitalizeFirstLetter(step.toLowerCase())}));
    var ingredients = recipe.ingredients.map((ingredient, index) => ({id: index, ingredient: this.capitalizeFirstLetter(ingredient.toLowerCase()) + ' ' + extractEmoji(translate.translate(ingredient)).join('')}));
    
    return (
      <div className="flex-item">
            <div className="flex-item-inner">
                <div className="flex-item-inner-content">
                    <div className="card has-text-centered is-wide">
                        <div className="card-content">
                            <div className="media">
                                <div className="media-content">
                                    <p className="title has-text-centered">Recipe</p>
                                    <hr />
                                </div>
                            </div>
                            <div className="content">
                                <h2 className="subtitle has-text-centered">Ingredients</h2>
                                <div className="panel list-group has-text-left">
                                {ingredients.map(ingredient => (<p className="panel-block list-group-item is-rounded is-warning" key={ingredient.id}>▪️ {ingredient.ingredient}</p>))}
                                </div>
                                <hr />
                                <h2 className="subtitle has-text-centered">Steps</h2>
                                <div className="panel list-group has-text-left">
                                  {steps.map(step => (<p className="panel-block list-group-item is-primary" key={step.id}>{(step.id + 1) + ". " + step.content}</p>))}
                                </div>
                            </div>
                        </div>
                        
                        <footer className="card-footer">
                            <div onClick={() => this.generateRecipe()} className="card-footer-item is-danger-bc">
                                <button className="button is-large is-danger">
                                    🤮👎
                                </button>
                            </div>
                            <div onClick={() => this.generateRecipe()} className="card-footer-item is-success-bc">
                              <button className="button  is-large is-success">
                                  🤤👍
                              </button>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    )
  }

  render() {
    const {recipe} = this.state
    return (
      <div className="container has-text-centered">
        <button className="button is-danger generate-button" onClick={this.generateRecipe}>Generate Recipe</button>
        <div className=" recipe-container">
          {recipe !== null && recipe !== undefined && this.renderRecipe(recipe) }
        </div>
      </div>
    );
  }
}
