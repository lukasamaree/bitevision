'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { FileDropzone } from "@/components/ui/FileDropzone"
import { RecipeCard } from "@/components/ui/RecipeCard"
import { Glow } from "@/components/ui/glow"
import { Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"


export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [description, setDescription] = useState("")
  const [numRecipes, setNumRecipes] = useState(5)
  const [recipes, setRecipes] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = (file: File, url: string) => {
    setFile(file)
    setSelectedImage(url)
  }

  const handleSubmit = async () => {
    if (!file && !description) {
      setError("Please upload an image or enter a description.")
      return
    }
    setLoading(true)
    setError(null)
    setRecipes([])

    try {
      const formData = new FormData()
      if (file) {
        formData.append("image", file)
      }
      if (description) {
        formData.append("description", description)
      }
      formData.append("num_recipes", numRecipes.toString())

      for (const [key, value] of formData.entries()) {
        console.log("FormData key:", key, "value:", value);
      }

      const apiResponse = await fetch('/api/match', {
        method: "POST",
        body: formData,
      })

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json()
        throw new Error(errorData.error || `Server error: ${apiResponse.status}`)
      }

      const data = await apiResponse.json()
      if (data.error) throw new Error(data.error)
      if (!data.recipes || data.recipes.length === 0) {
        setError("No recipes found that match your image and description.")
        return
      }

      setRecipes(data.recipes)
    } catch (error: any) {
      setError(error.message || "Failed to get recipes. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10 px-4 relative overflow-hidden">
      <Glow variant="center" className="pointer-events-none opacity-60 blur-2xl z-0" />
      <div className="max-w-4xl mx-auto relative z-10">
        <h1
          className="text-5xl md:text-6xl font-black text-center mb-10 text-zinc-900 dark:text-zinc-100 tracking-tight drop-shadow-2xl"
          style={{
            textShadow: "0 4px 24px rgba(0,0,0,0.18), 0 1.5px 0 #fff"
          }}
        >
          BiteVision
        </h1>
        <Card className="mb-12 p-8 shadow-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-0">
          <CardContent className="p-0">
            <form
              onSubmit={e => { e.preventDefault(); handleSubmit() }}
              className="flex flex-col gap-8 md:flex-row md:gap-12"
            >
              {/* Left: Description & Slider */}
              <div className="flex-1 flex flex-col gap-8">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-2">
                    Food Description <span className="text-orange-600">*</span>
                  </label>
                  <Input
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Describe the food in detail (e.g., 'A rich, moist chocolate cake with a creamy ganache frosting')"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-2">
                    Number of Recipes to Recommend
                  </label>
                  <Slider
                    min={1}
                    max={10}
                    value={[numRecipes]}
                    onValueChange={([v]) => setNumRecipes(v)}
                  />
                  <div className="text-center text-sm text-orange-600 dark:text-orange-300 mt-1">
                    {numRecipes} recipes
                  </div>
                </div>
              </div>
              {/* Right: File Upload */}
              <div className="flex-1 flex flex-col gap-4">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-2">
                  Upload Food Image <span className="text-orange-600">*</span>
                </label>
                <FileDropzone onFile={handleFile} previewUrl={selectedImage} />
              </div>
            </form>
            <Button
              onClick={handleSubmit}
              disabled={(!file && !description) || loading}
              className="w-full mt-8 flex items-center justify-center gap-2"
              type="submit"
            >
              {loading && <Loader2 className="animate-spin w-4 h-4" />}
              {loading ? "Finding Recipes..." : "Find Similar Recipes"}
            </Button>
            {error && (
              <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-400 p-4 mt-8 rounded">
                <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>
        {recipes.length > 0 && (
          <div className="grid gap-6 animate-fade-in-up">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Found {recipes.length} Similar Recipes
            </h2>
            {recipes.map((recipe, idx) => (
              <RecipeCard key={idx} {...recipe} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
