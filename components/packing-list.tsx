"use client"

import type React from "react"

import { useState } from "react"
import {
  Check,
  Plus,
  Trash2,
  Shirt,
  Umbrella,
  Utensils,
  Smartphone,
  AmbulanceIcon as FirstAid,
  Briefcase,
  Link2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Update the PackingItem interface to include a url property
interface PackingItem {
  id: string
  name: string
  category: string
  packed: boolean
    url?: string
  }

interface PackingCategory {
  id: string
  name: string
  icon: React.ReactNode
  color: string
}

export function PackingList() {
  const [newItemName, setNewItemName] = useState("")
  const [newItemCategory, setNewItemCategory] = useState("clothing")

  // Add a new state for the item being edited
  const [editingItem, setEditingItem] = useState<PackingItem | null>(null)
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)
  const [itemUrl, setItemUrl] = useState("")

  const [categories] = useState<PackingCategory[]>([
    { id: "clothing", name: "Clothing", icon: <Shirt className="h-4 w-4" />, color: "bg-blue-100 text-blue-700" },
    {
      id: "toiletries",
      name: "Toiletries",
      icon: <FirstAid className="h-4 w-4" />,
      color: "bg-pink-100 text-pink-700",
    },
    {
      id: "accessories",
      name: "Accessories",
      icon: <Umbrella className="h-4 w-4" />,
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: "electronics",
      name: "Electronics",
      icon: <Smartphone className="h-4 w-4" />,
      color: "bg-green-100 text-green-700",
    },
    {
      id: "food",
      name: "Food & Drinks",
      icon: <Utensils className="h-4 w-4" />,
      color: "bg-orange-100 text-orange-700",
    },
    { id: "other", name: "Other", icon: <Briefcase className="h-4 w-4" />, color: "bg-gray-100 text-gray-700" },
  ])

  // Update the items array to include some example URLs
  const [items, setItems] = useState<PackingItem[]>([
    { id: "1", name: "T-shirts (5)", category: "clothing", packed: true },
    { id: "2", name: "Jeans", category: "clothing", packed: true },
    { id: "3", name: "Swimwear", category: "clothing", packed: false, url: "https://example.com/swimwear" },
    { id: "4", name: "Toothbrush", category: "toiletries", packed: true },
    { id: "5", name: "Shampoo", category: "toiletries", packed: false },
    { id: "6", name: "Sunscreen", category: "toiletries", packed: false, url: "https://example.com/sunscreen" },
    { id: "7", name: "Phone charger", category: "electronics", packed: true },
    { id: "8", name: "Camera", category: "electronics", packed: false, url: "https://example.com/camera" },
    { id: "9", name: "Sunglasses", category: "accessories", packed: true },
    { id: "10", name: "Hat", category: "accessories", packed: false },
    { id: "11", name: "Snacks", category: "food", packed: false },
    { id: "12", name: "Water bottle", category: "food", packed: false },
  ])

  // Add a function to open the link modal
  const openLinkModal = (item: PackingItem) => {
    setEditingItem(item)
    setItemUrl(item.url || "")
    setIsLinkModalOpen(true)
  }

  // Add a function to save the link
  const saveItemLink = () => {
    if (editingItem) {
      setItems(items.map((item) => (item.id === editingItem.id ? { ...item, url: itemUrl } : item)))
      setIsLinkModalOpen(false)
      setEditingItem(null)
    }
  }

  const addItem = () => {
    if (newItemName.trim()) {
      const newItem: PackingItem = {
        id: Date.now().toString(),
        name: newItemName.trim(),
        category: newItemCategory,
        packed: false,
      }
      setItems([...items, newItem])
      setNewItemName("")
    }
  }

  const toggleItemPacked = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item)))
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const getPackedCount = () => {
    return items.filter((item) => item.packed).length
  }

  const getTotalCount = () => {
    return items.length
  }

  const getProgressPercentage = () => {
    return getTotalCount() > 0 ? Math.round((getPackedCount() / getTotalCount()) * 100) : 0
  }

  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Briefcase className="mr-2 h-5 w-5 text-orange-500" />
          What's in my bag
        </CardTitle>
        <CardDescription>Keep track of everything you need to pack for your trip</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Packing progress</span>
            <span className="font-medium">
              {getPackedCount()}/{getTotalCount()} items packed
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-pink-500"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Add item..."
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addItem()
                }
              }}
            />
          </div>
          <select
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <Button onClick={addItem} disabled={!newItemName.trim()}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="packed">Packed</TabsTrigger>
            <TabsTrigger value="unpacked">Still Needed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 pt-4">
            {categories.map((category) => {
              const categoryItems = items.filter((item) => item.category === category.id)
              if (categoryItems.length === 0) return null

              return (
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center">
                    <Badge className={`${category.color} flex items-center gap-1`}>
                      {category.icon}
                      {category.name}
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    {categoryItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center">
                          <div
                            className={`flex h-5 w-5 items-center justify-center rounded border ${
                              item.packed ? "bg-orange-500 border-orange-500 text-white" : "border-gray-300"
                            } mr-2 cursor-pointer`}
                            onClick={() => toggleItemPacked(item.id)}
                          >
                            {item.packed && <Check className="h-3 w-3" />}
                          </div>
                          <div>
                            <span className={item.packed ? "line-through text-muted-foreground" : ""}>
                              {item.name}
                            </span>
                            {item.url && (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-xs text-blue-500 hover:underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                View product
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-blue-500"
                            onClick={() => openLinkModal(item)}
                          >
                            <Link2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </TabsContent>

          <TabsContent value="packed" className="space-y-4 pt-4">
            {categories.map((category) => {
              const categoryItems = items.filter((item) => item.category === category.id && item.packed)
              if (categoryItems.length === 0) return null

              return (
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center">
                    <Badge className={`${category.color} flex items-center gap-1`}>
                      {category.icon}
                      {category.name}
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    {categoryItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center">
                          <div
                            className="flex h-5 w-5 items-center justify-center rounded border bg-orange-500 border-orange-500 text-white mr-2 cursor-pointer"
                            onClick={() => toggleItemPacked(item.id)}
                          >
                            <Check className="h-3 w-3" />
                          </div>
                          <div>
                            <span className="line-through text-muted-foreground">
                              {item.name}
                            </span>
                            {item.url && (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-xs text-blue-500 hover:underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                View product
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-blue-500"
                            onClick={() => openLinkModal(item)}
                          >
                            <Link2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </TabsContent>

          <TabsContent value="unpacked" className="space-y-4 pt-4">
            {categories.map((category) => {
              const categoryItems = items.filter((item) => item.category === category.id && !item.packed)
              if (categoryItems.length === 0) return null

              return (
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center">
                    <Badge className={`${category.color} flex items-center gap-1`}>
                      {category.icon}
                      {category.name}
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    {categoryItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center">
                          <div
                            className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 mr-2 cursor-pointer"
                            onClick={() => toggleItemPacked(item.id)}
                          >
                            {item.packed && <Check className="h-3 w-3" />}
                          </div>
                          <div>
                            <span>
                              {item.name}
                            </span>
                            {item.url && (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-xs text-blue-500 hover:underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                View product
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-blue-500"
                            onClick={() => openLinkModal(item)}
                          >
                            <Link2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
    <Dialog open={isLinkModalOpen} onOpenChange={(open) => setIsLinkModalOpen(open)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Product Link</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="item-name">Item</Label>
            <Input id="item-name" value={editingItem?.name || ""} readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="item-url">Product URL</Label>
            <Input
              id="item-url"
              placeholder="https://example.com/product"
              value={itemUrl}
              onChange={(e) => setItemUrl(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Add a link to where this item can be purchased or viewed online
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsLinkModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={saveItemLink} className="btn-sunset">
            Save Link
          </Button>
        </DialogFooter>
        </DialogContent>
    </Dialog>
    </div>
  )
}

