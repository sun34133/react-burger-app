import React from "react";

import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  console.log(props)
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igrdntkey => {
      return [...Array(props.ingredients[igrdntkey])].map((_, i) => {
        return <BurgerIngredient key={igrdntkey + i} type={igrdntkey} />;
      });
    })
    .reduce((arr, elem) => {
      return arr.concat(elem);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
