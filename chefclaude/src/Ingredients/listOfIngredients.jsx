import { useIngredients } from "../QuestionProvider/QuestionP";

function IngredientsList(props) {
  const{recipeShown,setRecipeShown,newIngredients, setLoading} = useIngredients();

  async function getRecipe() {
  setLoading(true);
  try {
    const response = await fetch("/api/getRecipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistralai/mistral-small-3.2-24b-instruct:free",
        messages: [
          {
            role: "user",
            content: `feeling hungry! using these ${newIngredients} ingredients suggest me a recipe with the process and sequence in order of making that recipe.
            just give the recipe don't ask for any questions like need any variations etc`,
          },
        ],
      }),
    });

    if (!response.ok) throw new Error("Error in getting the recipe");

    const data = await response.json();
    const recipeMarkdown = data.choices[0].message.content;
    setRecipeShown(recipeMarkdown);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}

  return (
    <section className="p-4">
      <h2 className="font-bold text-xl mb-3">Ingredients on hand:</h2>

      
      <ul className="space-y-2">
        {props.items.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 rounded-lg px-3 py-2 shadow-sm"
          >
            <span className="text-gray-800">{item}</span>
            <button
              onClick={() => props.onRemove(index)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      {props.items.length > 3 && (
        <div
          ref={props.scroll}
          className="mt-6 bg-gray-300 flex rounded-2xl shadow-lg p-6 border gap-4"
        >
            <div className="flex flex-col" >
          <h3 className="text-lg font-semibold text-gray-800">
            Ready for a recipe?
          </h3>
          <p className="text-gray-800 mt-2">
            Generate a recipe from the list of above ingredients.
          </p>
          </div>
          <button
            onClick={getRecipe}
            className=" mt-4 p-1 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition"
          >
            Get a recipe
          </button>
        </div>
      )}
    </section>
  );
}
export default IngredientsList;
