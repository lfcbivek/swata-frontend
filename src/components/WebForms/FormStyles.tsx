import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import ColorPalette from "./ColorPalette";  

import { useState } from "react";

export const FormStyles = (props) => {

    const {
        handleBackgroundColorChange
    } = props;

    const [isOpen, setIsOpen] = useState({
        'colors': false
    })
    const onOpenChange = (id) => {
        setIsOpen(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    }

    return (
        <div className="FormStyles">
            <Collapsible
                open={isOpen['colors']}
                onOpenChange={() => onOpenChange('colors')}
                className="flex w-[350px] flex-col gap-2"
            >
                <div className="flex items-center justify-between rounded-md border px-4 py-2 font-mono text-sm">
                    <h2>
                        Colors and Background
                    </h2>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                            {!isOpen['colors'] ? <ChevronDown /> : <ChevronUp />}
                            
                            <span className="sr-only">Toggle</span>
                        </Button>
                    </CollapsibleTrigger>

                </div>
                <CollapsibleContent className="mt-5 flex flex-col gap-4">
                    <div className="color-content flex flex-col gap-4">
                        <h2>Primary Color</h2>
                        <ColorPalette />
                    </div>
                    <div className="color-content flex flex-col gap-4">
                        <h2>Form Color</h2>
                        <ColorPalette />
                    </div>
                    <div className="color-content flex flex-col gap-4">
                        <h2>Background Color</h2>
                        <ColorPalette 
                            handleColorChange={handleBackgroundColorChange}
                        />
                    </div>
                </CollapsibleContent>

            </Collapsible>
        </div>
    )
}