import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SelectableCard } from "./selectable-cards"

interface DynamicInputListProps {
  items: { id: string; value: string }[]
  onItemsChange: (items: { id: string; value: string }[]) => void
  placeholder: string
}

export function DynamicInputList({ items, onItemsChange, placeholder }: DynamicInputListProps) {
  const [newItem, setNewItem] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const addItem = () => {
    if (newItem.trim()) {
      const newItems = [...items, { id: Date.now().toString(), value: newItem.trim() }]
      onItemsChange(newItems)
      setNewItem("")
    }
  }

  const deleteItem = (id: string) => {
    const newItems = items.filter((item) => item.id !== id)
    onItemsChange(newItems)
    if (selectedId === id) {
      setSelectedId(null)
    }
  }

  const selectItem = (id: string) => {
    setSelectedId(id === selectedId ? null : id)
    const newItems = items.map((item) => ({
      ...item,
      isSelected: item.id === id,
    }))
    onItemsChange(newItems)
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {items.map((item) => (
            <SelectableCard
              key={item.id}
              id={item.id}
              content={item.value}
              isSelected={item.id === selectedId}
              onSelect={selectItem}
              onDelete={deleteItem}
            />
          ))}
        </AnimatePresence>
      </div>
      <div className="flex space-x-2">
        <Input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder={placeholder}
        />
        <Button onClick={addItem}>
          <Plus className="mr-2 h-4 w-4" /> Add
        </Button>
      </div>
    </div>
  )
}

