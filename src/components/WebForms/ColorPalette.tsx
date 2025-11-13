import { useState } from 'react';
import './ColorPalette.scss';
import { HexColorPicker } from "react-colorful";
import { DEFAULT_BACKGROUND_COLOR } from './constants';
import { EyedropperIcon } from '@phosphor-icons/react/dist/ssr';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

const colors = ["#D9CFC7", "#0046FF", "#BF092F", "#F5A623"];

function darkenColor(hex, amount = 25) {
    let col = hex.replace("#", "");
    let num = parseInt(col, 16);
  
    let r = (num >> 16) - amount;
    let g = ((num >> 8) & 0x00FF) - amount;
    let b = (num & 0x0000FF) - amount;
  
    r = Math.max(r, 0);
    g = Math.max(g, 0);
    b = Math.max(b, 0);
  
    const newColor =
      "#" +
      (r.toString(16).padStart(2, "0") +
        g.toString(16).padStart(2, "0") +
        b.toString(16).padStart(2, "0"));
  
    return newColor;
  }

export default function ColorPalette(props) {
    const {
        colorKey
    } = props;
    const [selectedColor, setSelectedColor] = useState(null);
    const [showColorPicker, setShowColorPicker] = useState(false);

    const onColorChange = (colorHex) => {
        setSelectedColor(colorHex);
        props.handleColorChange(colorKey, colorHex)
    }
    return (
        <div>
            <div className="colors flex flex-row gap-2">
                {colors.map((c, index) => (
                    <div
                        key={index}
                        className="color-square relative cursor-pointer"
                        style={{
                            backgroundColor: c,
                        }}
                        onClick={() => onColorChange(c)}
                    >
                        {selectedColor === c && (
                            <span className="check-mark">✔</span>
                        )}

                    </div>
                    
                ))}
                <Popover>
                    <PopoverTrigger>
                        <div
                            key='color-picker-div'
                            className="color-square relative cursor-pointer"
                            onClick={() => setShowColorPicker(true)}
                        >
                            <EyedropperIcon size={32} color="#2bb634" weight="fill" />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent
                        className="p-0 bg-transparent shadow-none border-none"
                        sideOffset={4}
                    >
                        <HexColorPicker color={DEFAULT_BACKGROUND_COLOR} onChange={onColorChange} />
                    </PopoverContent>
                </Popover>
                
            </div>
        </div>
        
    );
}
