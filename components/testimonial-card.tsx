import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

interface TestimonialCardProps {
  name: string
  position: string
  image: string
  rating: number
  testimonial: string
}

export default function TestimonialCard({ name, position, image, rating, testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-slate-500">{position}</p>
          </div>
        </div>
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-slate-300"}`} />
          ))}
        </div>
        <p className="text-slate-600 italic">"{testimonial}"</p>
      </CardContent>
    </Card>
  )
}

