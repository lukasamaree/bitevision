import { Badge } from "@/components/ui/badge"

interface RecipeCardProps {
  title: string
  ingredients: string
  instructions: string
  score: number | string
  weight?: number | string
}

export function RecipeCard({ title, ingredients, instructions, score, weight }: RecipeCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-6 flex flex-col gap-3 border border-zinc-100 dark:border-zinc-800">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="flex flex-col items-end gap-1">
          {weight !== undefined && (
            <Badge variant="outline" className="mb-1">Weight: {weight}</Badge>
          )}
          <span className="text-xs text-orange-600 dark:text-orange-300 font-bold">
            Score: {typeof score === "number" ? score.toFixed(4) : score}
          </span>
        </div>
      </div>
      <div>
        <h4 className="font-medium text-zinc-700 dark:text-zinc-200 mb-1">Ingredients</h4>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 whitespace-pre-line">{ingredients}</p>
      </div>
      <div>
        <h4 className="font-medium text-zinc-700 dark:text-zinc-200 mb-1">Instructions</h4>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 whitespace-pre-line">{instructions}</p>
      </div>
    </div>
  )
}
