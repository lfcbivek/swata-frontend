import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const EmailWidget = (props) => {
    const {
        label,
        required,
        // placeholder,
        disabled,
        maxLength
    } = props;

    return (
        <div className="flex flex-col gap-2">
            <Label>{label} {required && <span>(*)</span>}</Label>
            <Input 
                type="email" 
                required={!!required}
                // placeholder={placeholder} 
                disabled={disabled}
                maxLength={maxLength}
            />
        </div>
    )
}

export default EmailWidget;