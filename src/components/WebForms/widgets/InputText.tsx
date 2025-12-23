import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const InputText = (props:any) => {
    const {
        label,
        required,
        // placeholder,
        disabled,
        maxLength,
        disabledValue,
        style,
        labelColor
    } = props;

    return (
        <div className="flex flex-col gap-2">
            <Label 
                style={{
                    color: labelColor,
                }}
            >
                {label} {required && <span>(*)</span>}
            </Label>
            {!disabled && 
                <Input 
                    type="text" 
                    style={style}
                    required={!!required}
                    // placeholder={placeholder} 
                    disabled={disabled}
                    maxLength={maxLength}
                />
            }
            {
                disabled && 
                <Input 
                    type="text"
                    style={style}
                    required={!!required}
                    // placeholder={placeholder} 
                    disabled={disabled}
                    maxLength={maxLength}
                    value={disabledValue}
                />
            }
            
        </div>
    )
}

export default InputText;