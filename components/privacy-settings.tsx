"use client"

import { Globe, Lock, Users } from "lucide-react"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export function PrivacySettings() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Visibility</Label>
        <RadioGroup defaultValue="private">
          <div className="flex items-center space-x-2 rounded-md border p-3">
            <RadioGroupItem value="private" id="private" />
            <Label htmlFor="private" className="flex items-center">
              <Lock className="mr-2 h-4 w-4" />
              <div>
                <p className="font-medium">Private</p>
                <p className="text-sm text-muted-foreground">Only visible to people you invite</p>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-3">
            <RadioGroupItem value="friends" id="friends" />
            <Label htmlFor="friends" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              <div>
                <p className="font-medium">Friends</p>
                <p className="text-sm text-muted-foreground">Visible to your friends and people you invite</p>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-3">
            <RadioGroupItem value="public" id="public" />
            <Label htmlFor="public" className="flex items-center">
              <Globe className="mr-2 h-4 w-4" />
              <div>
                <p className="font-medium">Public</p>
                <p className="text-sm text-muted-foreground">Visible to everyone, including in discovery feed</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Privacy Options</h3>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="hide-address">Hide exact address</Label>
            <p className="text-sm text-muted-foreground">Show only general area instead of exact location</p>
          </div>
          <Switch id="hide-address" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="hide-flight">Hide flight details</Label>
            <p className="text-sm text-muted-foreground">Keep flight numbers and times private</p>
          </div>
          <Switch id="hide-flight" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="hide-guest">Hide guest list</Label>
            <p className="text-sm text-muted-foreground">Don't show who's attending to other guests</p>
          </div>
          <Switch id="hide-guest" />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="allow-share">Allow sharing</Label>
            <p className="text-sm text-muted-foreground">Let guests share this event/trip with others</p>
          </div>
          <Switch id="allow-share" defaultChecked />
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label>Discovery Feed Settings</Label>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="show-discovery">Show in discovery feed</Label>
            <p className="text-sm text-muted-foreground">Allow your event/trip to appear in others' discovery feed</p>
          </div>
          <Switch id="show-discovery" />
        </div>
      </div>
    </div>
  )
}

