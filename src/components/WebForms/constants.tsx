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


const draggbaleItemClass = "rounded-md border px-4 py-2 font-mono text-sm flex flex-row items-center gap-10"


export const DEFAULT_FORM_BACKGROUND_COLOR = "#D9CFC7";

export const DEFAULT_WIDGET_LABELS = {
    INPUT_TEXT: "Full Name"
}


export const DEFAULT_RULES = {
    INPUT_TEXT: [{
        required: false,
        maxLength: 100,
        
    }]
}
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
        droppableUI: (
            <div className="flex flex-col gap-2">
                <Label>{DEFAULT_WIDGET_LABELS.INPUT_TEXT}</Label>
                <Input type="text" />
            </div>
        )
    }, 
    {
        id: "input-email-widget",
        draggableUI: (
            <div className={`${draggbaleItemClass}`}>
                <EnvelopeIcon size={24} />
                <h2>Email</h2>
            </div>
        ),
        droppableUI: (
            <div className="flex flex-col gap-2">
                <Label>Email</Label>
                <Input type="email" />
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