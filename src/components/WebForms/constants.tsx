import { 
    TextboxIcon, 
    EnvelopeIcon, 
    PasswordIcon, 
    NumberCircleEightIcon,
    FileIcon,
    CodeIcon,
    StarIcon
} from "@phosphor-icons/react/dist/ssr";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';
import InputText from "./widgets/InputText";
import EmailWidget from "./widgets/EmailWidget";


const draggbaleItemClass = "rounded-md border px-4 py-2 font-mono text-sm flex flex-row items-center gap-10";


export const DEFAULT_BACKGROUND_COLOR = "#D9CFC7";
export const DEFAULT_FORM_FOREGROUND_COLOR = "#FFFFFF";
export const DEFAULT_LABEL_COLOR = "#000000";
export const DEFAULT_WIDGET_COLOR = "FFFFFF";

export const DEFAULT_WIDGET_LABELS = {
    INPUT_TEXT: "Full Name",
    INPUT_EMAIL: "Email"
}


export const DEFAULT_SETTINGS = {
    INPUT_TEXT: [
        {
            key: "required",
            label: "Required",
            value: true,
            inputType: "checkbox"
        },
        {
            key: "maxLength",
            label: "Max Length",
            value: 100,
            inputType: "input-text",
        },
        {
            key: "label",
            label: "Form Label",
            value: DEFAULT_WIDGET_LABELS.INPUT_TEXT,
            inputType: "input-text"
        },
        {
            key: "disabled",
            label: "Disabled",
            value: false,
            inputType: "checkbox"
        },
        {
            key: "disabledValue",
            label: "Disabled Value",
            value: "",
            inputType: "input-text"
        },
    ],
    INPUT_EMAIL: [
        {
            key: "required",
            label: "Required",
            value: true,
            inputType: "checkbox"
        },
        {
            key: "maxLength",
            label: "Max Length",
            value: 100,
            inputType: "input-text",
        },
        {
            key: "label",
            label: "Form Label",
            value: DEFAULT_WIDGET_LABELS.INPUT_EMAIL,
            inputType: "input-text"
        },
        {
            key: "disabled",
            label: "Disabled",
            value: false,
            inputType: "checkbox"
        },
        {
            key: "disabledValue",
            label: "Disabled Value",
            value: "",
            inputType: "input-text"
        },

    ]
}

const inputTextSettings = DEFAULT_SETTINGS.INPUT_TEXT;
export const inputTextSettingsMap = Object.fromEntries(
    inputTextSettings.map(s => [s.key, s.value])
);

export const AVAILABLE_FORM_WIDGETS = [
    {
        id: "input-text-widget",
        defaultLabel: DEFAULT_WIDGET_LABELS.INPUT_TEXT,
        draggableUI: (
            <div className={`${draggbaleItemClass}`}>
                <TextboxIcon size={24} />
                <h2>Text</h2>
            </div>
        ),
        droppableUI: (setting, labelColor, widgetColor) => (
            <div className="flex flex-col gap-2">
              <InputText
                label={setting.label}
                // placeHolder={settings.placeholder}
                disabled={setting.disabled}
                maxLength={setting.maxLength}
                disabledValue={setting.disabledValue}
                labelColor={labelColor}
                style={{
                    // border: `1px solid ${borderColor}`,
                    backgroundColor: widgetColor,
                }}
              />
            </div>
        ),
    }, 
    {
        id: "input-email-widget",
        draggableUI: (
            <div className={`${draggbaleItemClass}`}>
                <EnvelopeIcon size={24} />
                <h2>Email</h2>
            </div>
        ),
        droppableUI: (setting) =>(
            <div className="flex flex-col gap-2">
                <EmailWidget
                    label={setting.label}
                    // placeHolder={settings.placeholder}
                    disabled={setting.disabled}
                    maxLength={setting.maxLength}
              />
            </div>
        )
    },
    {
        id: "input-password-widget",
        draggableUI: (
            <div className={`${draggbaleItemClass}`}>
                <PasswordIcon size={24} />
                <h2>Password</h2>
            </div>
        ),
        droppableUI: (
            <div className="flex flex-col gap-2">
                <Label>Password</Label>
                <Input type="password" />
            </div>
        )
    }, 
    {
        id: "input-number-widget",
        draggableUI: (
            <div className={`${draggbaleItemClass}`}>
                <NumberCircleEightIcon size={24} />
                <h2>Number</h2>
            </div>
        ),
        droppableUI: (
            <div className="flex flex-col gap-2">
                <Label>Number</Label>
                <Input type="number" />
            </div>
        )
    },
    {
        id: "input-file-widget",
        draggableUI: (
            <div className={`${draggbaleItemClass}`}>
                <FileIcon size={24} />
                <h2>File</h2>
            </div>
        ),
        droppableUI: (
            <div className="flex flex-col gap-2">
                <Label>File</Label>
                <Input type="file" />
            </div>
        )

    },
    {
        id: "input-otp-widget",
        draggableUI: (
            <div className={`${draggbaleItemClass}`}>
                <CodeIcon size={24} />
                <h2>OTP</h2>
            </div>
        ),
        droppableUI: (
            <div className="flex flex-col gap-2">
                <Label>OTP</Label>
                <InputOTP maxLength={6}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
            </div>
        )
    },
    {
        id: "star-rating-widget",
        draggableUI: (
            <div className={`${draggbaleItemClass}`}>
                <StarIcon size={24} />
                <h2>Rating</h2>
            </div>
        ),
        droppableUI: (
            <div className="flex flex-col gap-2">
                <Label>Rating</Label>
                <Rating defaultValue={0}>
                    {Array.from({ length: 5 }).map((_, index) => (
                    <RatingButton key={index} />
                    ))}
                </Rating>
            </div>
        )

    }
]