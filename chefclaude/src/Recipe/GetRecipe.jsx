import { useIngredients } from "../QuestionProvider/QuestionP";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"

function GetRecipe({formScrollRef}){
 const{recipeShown, loading, setLoading,setRecipeShown,setNewIngredients} = useIngredients();
 const handleClear = ()=>{
  setLoading(false);
  setRecipeShown(null);
  setNewIngredients([]);
 }
 if (formScrollRef?.current) {
      const topOffset = formScrollRef.current.offsetTop - 20; 
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  
    return(
    <>
    <section>
        {loading && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <p className="text-white text-2xl animate-pulse">
            🍳 Cooking your recipe...
          </p>
        </div>
      )}
        {!loading && recipeShown && (
        <div className="md:ml-[200px] pb-5">
             <h2 className="font-extrabold text-xl">Chef Claude Recommends:</h2>
             <article className="prose max-w-none">
                <p className="text-lg">Based on the ingredients you have available, I would suggest a simple and delicious recipe.</p>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {recipeShown}
              </ReactMarkdown>
                 </article> 
             <button className=" bg-orange-500 hover:bg-orange-600 text-white md:text-lg rounded-2xl font-semibold ml-[150px] md:ml-[600px] sm:ml-[300px] m-5 px-2 py-1 md:px-5 md:py-2 "
             onClick={handleClear}
             >Clear</button>
         </div>
        )}  
        </section>
    </>
    )
}
export default GetRecipe