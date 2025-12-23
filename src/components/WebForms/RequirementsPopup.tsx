import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function RequirementsPopup(props:any) {
    const {
        open,
        children,
        handleWidgetSettingsChange,
        widgetId,
        currentSettings,
        requirementsDefinitions,
        handleWidgetSettingsClose
    } = props;

    const onSettingsChange = (key: string, value: string | boolean) => {
        console.log("hereee")
        // Update the settings
        const newSettings = {
            ...currentSettings,
            [key]: value
        }
        handleWidgetSettingsChange(widgetId, newSettings);
    };

    const onSettingsSave = () => {
        handleWidgetSettingsClose(widgetId, false);
    }
    return (
        <div onClick={(e) => e.stopPropagation()}>
        <Popover open={open}>
            <PopoverTrigger asChild>
                {/* Invisible trigger to satisfy Radix requirement */}
                <PopoverTrigger asChild>
                    {children}
                </PopoverTrigger>
            </PopoverTrigger>
            <PopoverContent side="right" align="center" className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="leading-none font-medium">Widget Settings</h4>
                        <p className="text-muted-foreground text-sm">
                            Set the settings for the widgets.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        {requirementsDefinitions.map((definition, idx) => (
                            <div key={idx} className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor={`setting-${idx}`}>{definition.label}</Label>

                                {definition.inputType === "input-text" && (
                                    <Input
                                        id={`setting-${idx}`}
                                        value={String(currentSettings[definition.key])}
                                        className="col-span-2 h-6"
                                        onChange={(e) => onSettingsChange(definition.key, e.target.value)}
                                    />
                                )}
                                {
                                    definition.inputType === "checkbox" && (
                                        <Checkbox
                                            checked={!!currentSettings[definition.key]}
                                            onCheckedChange={(checked)=> onSettingsChange(definition.key, checked)}
                                        />
                                    )
                                }
                            </div>
                        ))}
                        <div className="flex justify-end">
                            <Button 
                                size="sm"
                                className="w-fit bg-[#1A2A4F] hover:bg-[#1D546C] text-white"
                                onClick={onSettingsSave}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
        </div>
    )
}
