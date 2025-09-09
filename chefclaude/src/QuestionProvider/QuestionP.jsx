import { createContext, useContext, useState } from "react";

const IngredientsContext = createContext();

export function IngredientsProvider({ children }) {
   // const initialItems = ["tomato", "potato", "Onions", "water"]
  const [newIngredients, setNewIngredients] = useState([]);
  const [recipeShown, setRecipeShown] = useState("");
  const[loading, setLoading] = useState(false);


  return (
    <IngredientsContext.Provider
      value={{ newIngredients, setNewIngredients, recipeShown, setRecipeShown, loading, setLoading}}
    >
      {children}
    </IngredientsContext.Provider>
  );
}

export function useIngredients() {
  return useContext(IngredientsContext);
}
