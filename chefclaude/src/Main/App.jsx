import { useEffect, useRef,} from "react"
import GetRecipe from '../Recipe/GetRecipe'
import IngredientsList from "../Ingredients/listOfIngredients"
import { useIngredients } from "../QuestionProvider/QuestionP";

export default function ChefClaude() {
  const{newIngredients,setNewIngredients, recipeShown} = useIngredients();
  const recipescroll = useRef(null);
  const formRef = useRef(null)
  

  useEffect(() => {
    if (recipeShown !== "" && recipescroll.current !== null) {
      recipescroll.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [recipeShown]);
 
  function handlesubmit(event) {
  event.preventDefault();
  const formEl = event.currentTarget;
  const formData = new FormData(formEl);
  const NewformData = formData.get("ingredient")?.trim();

  if (
    NewformData &&
    !newIngredients.some(
      ing => ing.toLowerCase() === NewformData.toLowerCase()
    )
  ) {
    setNewIngredients(prev => [...prev, NewformData]);
  }

  formEl.reset();
}

  const ingredientitems = newIngredients

  const removeIngredient = (index) => {
    setNewIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-yellow-50 via-orange-100 to-red-100 flex flex-col items-center p-5">
        <h1 className="text-5xl font-extrabold text-gray-900 flex items-center gap-3 mb-6 tracking-tight drop-shadow-sm">
          👨‍🍳 <span className="text-orange-600">Chef Claude</span>
        </h1>

        <p className="max-w-2xl text-center text-gray-700 mb-7 text-lg leading-relaxed">
          Hey there! 🥗 Feeling hungry but not sure what to cook? <br />
          Just tell <span className="font-semibold text-orange-600">Chef Claude</span> the ingredients 
          you have on hand, and we’ll whip up tasty recipe ideas in seconds. <br />
          No stress, no waste — just delicious meals made from what’s already in your kitchen. 🍳✨
        </p>

        <form
          className="flex gap-3 w-full max-w-xl bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-5 border border-orange-100 mb-3"
          onSubmit={handlesubmit}
          
        >
          <input
            type="text"
            placeholder="🍃 Add an ingredient (e.g. Oregano)"
            aria-label="add ingredient"
            name="ingredient"
            className="flex-1 p-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-orange-400 outline-none text-gray-700 placeholder-gray-400"
          />
          <button
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2 rounded-2xl font-semibold hover:scale-105 transform transition shadow-md"
          >
            + Add
          </button>
        </form>
        {ingredientitems.length > 0 && (
          <div className="w-full max-w-xl mt-5 animate-fadeIn">
            <IngredientsList
              scroll={recipescroll}
              items={ingredientitems}
              onRemove={removeIngredient}
            />
          </div>
        )}
      </main>
      <section className="min-h-screen  bg-gradient-to-b from-red-100 via-orange-100 to-yellow-50 ">
          <div className="animate-slideUp">
            <GetRecipe  formScrollRef={formRef}/>
          </div>
        </section>
    </>
  )
}
