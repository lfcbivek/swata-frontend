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
import { DEFAULT_SETTINGS } from "./constants"

export function RequirementsPopup(props) {
    const {
        open,
        onOpenChange,
        children,
        handleSettingsChange
    } = props;

    const [settings, setSettings] = useState(DEFAULT_SETTINGS.INPUT_TEXT);

    const handleSettingChange = (idx: number, value: string | boolean) => {
        // Update the settings
        const newSettings = settings.map((s, i) => (i === idx ? { ...s, value } : s))
        setSettings(newSettings);
        handleSettingsChange(newSettings);
    };
    return (
        <Popover open={open} onOpenChange={onOpenChange}>
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
                        {settings.map((setting, idx) => (
                            <div key={idx} className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor={`setting-${idx}`}>{setting.label}</Label>

                                {setting.inputType === "input-text" && (
                                    <Input
                                        id={`setting-${idx}`}
                                        value={setting.value}
                                        className="col-span-2 h-6"
                                        onChange={(e) => handleSettingChange(idx, e.target.value)}
                                    />
                                )}
                                {
                                    setting.inputType === "checkbox" && (
                                        <Checkbox
                                            checked={setting.value}
                                            onCheckedChange={(checked)=> handleSettingChange(idx, checked)}
                                        />
                                    )
                                }
                            </div>
                        ))}
                        <div className="flex justify-end">
                            <Button 
                                size="sm"
                                className="w-fit bg-[#1A2A4F] hover:bg-[#1D546C] text-white"
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
