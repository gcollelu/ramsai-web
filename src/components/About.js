import React from 'react';
import logo from '../assets/logo.png';
import steps from '../assets/steps.png';
import ingredients from '../assets/ingredients.png';
import loss from '../assets/loss.png';
import gan from '../assets/gan.png';

export default () => (
  <section className="section">
    <div className="container">

      <div className="content">
        <h1 align="center">
          <br />
            <a href="https://ramsai.now.sh"><img src={logo} alt="Ramsai" width="100" /></a>
          <br />
        </h1>
        <h4 align="center">A React webapp to serve our generated recipes. </h4>

        <p align="center">
          <a href="https://forthebadge.com">
            <img src="https://forthebadge.com/images/badges/made-with-javascript.svg" />
          </a>
          <a href="https://forthebadge.com">
            <img src="https://forthebadge.com/images/badges/built-with-love.svg" />
          </a>
        </p>
        <br />
        <p align="center">
          <a href="https://saythanks.io/to/gcollelu">
            <img src="https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg" />
          </a>
        </p>
        <p align="center">
          <a href="#why-recipes">Why Recipes</a> •
          <a href="#the-data">The Data</a> •
          <a href="#the-features">The Features</a> •
          <a href="#the-model">The Model</a> •
          <a href="#conclusions">Conclusions</a>
        </p>

        <h2 id="why-recipes">Why Recipes</h2>

        <p>Recipes reflect the most simple and basic substructure of an algorithm, as they contain procedural knowledge. Recipes also have several features, which makes them a great target for a convolutional and deconvolutional neural network for feature extraction. Lastly, recipes can be expressed with text, which is known to be much lighter than other sources of data such as images or videos. This will allow us to process large amounts of data with a limited amount of time and resources.</p>

        <h2 id="the-data">The Data</h2>

        <ul>
          <li>We used a public dataset from <a href="https://archive.org/details/recipes-en-201706">Archive</a>, which included ~225,000 recipes. </li>

          <li>The data includes:  “Ingredients”, “Steps”, “Rating”, “HTML” and “Crawling Code” .</li>

          <li>After removing duplicates and recipes with less than 3 steps and more than 15 ingredients, there are ~83,000 recipes in our data set.</li>

          <li>We then split the steps into single sentences and with the help of NLTK we linked each ingredient to the step in which it was used.</li>

          <li>After further filtering the data by removing anything that had less than 2 ingredients or steps and anything with more than 15 ingredients or more than 20 steps, we were left with ~76,000 recipe with the following distributions.</li>
        </ul>

        <div className="columns is-vcentered">
          <div className="column">
            <img src={steps} alt="steps" width="250" />
          </div>
          <div className="column">
            <img src={ingredients} alt="ingredients" width="250" />
          </div>
        </div>

        <h2 id="the-features">The Features</h2>

        <ul>
          <li><p><strong>Ingredients</strong>: ingredients specified quantity, unit and ingredient name in one single string. We parsed those with a RegEx to only keep the ingredient name. These turned out to be about ~86,000 unique ingredients.</p></li>

          <li><p><strong>Steps</strong> : in the original dataset, each step included multiple sentences. There were ~453,000 unique steps.</p></li>

          <li><p><strong>Cuisine type</strong> : the original dataset did not include cuisine type, however, we used a third-party model to predict the cuisine type based on the ingredients and populated our data with the generated predictions. </p></li>

          <li><p><strong>Rating</strong> : the ratings range from 1 to 5 and corresponded to the recipe's rating.</p></li>
        </ul>

        <h2 id="the-model">The Model</h2>

        <p>Our Generative Adversarial Network (<strong>GAN</strong>) was used to generate ingredients and steps. </p>

        <ul>
          <li>We encoded the recipes using one-hot-encoding in a 452,000x86,000 sparse matrix, the columns of which corresponded the steps and the rows to the ingredients.</li>

          <li>We did not realize, that in order to train the model with such matrix, it would have to be converted to a dense matrix, leading to the equivalent  of trying to generate images with  ~36 gigapixel quality. </li>

          <li>We then decided to further encode the sparse matrices in 15x20 matrices. We did so by encoding each recipe in the following way :</li>

          <li>A recipe has a set of (ingredient, step the ingredient is used in, step position) triplets</li>

          <li>We collapsed the triplets into single number by concatenating the three numbers</li>

          <li>In doing so, we were aware we would be prioritizing some features over other, in our case, the ingredients </li>
        </ul>

        <h1 align="center">
          <br />
          <img src={gan} alt="gan" width="300" />
          <br />
        </h1>

        <h2 id="conclusions">Conclusions</h2>

        <ul>
          <li>We were able to generate an entire recipe.</li>

          <li>One achievement of our GAN is that it does learn the right amount of steps and ingredients that go into a recipe.</li>

          <li>The way we encoded recipe however, led to loss of information about the step-ingredient relationship, resulting in steps that are not using the ingredients listed.</li>
        </ul>

        <h4 id="after1000epochs">After 1000 Epochs</h4>

        <p align="center">
          <img src={loss} alt="loss" width="300" />
        </p>

        <h4 id="future-improvements">Future Improvements</h4>

        <ul>
          <li>Making a hashtable of <code>map[ingredient_id] = [all steps_id it has been seen in]</code></li>

          <li>If step_id is not in the list for the ingredient, we add a penalty </li>

          <li>Most accuracy would come from separating ingredients, steps, and step position.</li>
        </ul>
      </div>
    </div>
  </section>
  );
  