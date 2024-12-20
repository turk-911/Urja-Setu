import { motion } from "framer-motion"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface SelectableCardProps {
  id: string
  content: string | { address: string; city: string; state: string }
  isSelected: boolean
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}

export function SelectableCard({ id, content, isSelected, onSelect, onDelete }: SelectableCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`relative cursor-pointer ${
          isSelected ? "border-primary" : "border-gray-200"
        }`}
        onClick={() => onSelect(id)}
      >
        <CardContent className="p-4">
          {typeof content === "string" ? (
            <p className="pr-8">{content}</p>
          ) : (
            <div className="pr-8">
              <p>{content.address}</p>
              <p>{content.city}, {content.state}</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(id)
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

