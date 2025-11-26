import React, {useState} from 'react';
import { GlobeXIcon, DesktopIcon, DeviceMobileSpeakerIcon } from '@phosphor-icons/react';
import { 
    Tooltip,
    TooltipTrigger,
    TooltipContent
} from '@/components/ui/tooltip';

import { Button } from "@/components/ui/button";

import './FormSettings.scss';

export const FormSettings = (props:any) => {
    const {
        handleDeviceChange
    } = props;

    const onDeviceChange = (isMobile:boolean) => {
        props.handleDeviceChange(isMobile)
    }

    return (
        <div className='FormSettings'>
            <div className='preview-publish'>
                <Button variant="outline" size="sm">
                    <GlobeXIcon />
                    <span>Preview</span>
                </Button>
                <Button variant="default" size="sm" style={{backgroundColor: "#658C58"}}>
                    <GlobeXIcon />
                    <span>Publish</span>
                </Button>
            </div>
            <div className='device-preview'>
                <div className='desktop'>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DesktopIcon 
                                size={32} 
                                className='cursor-pointer'
                                onClick={() => onDeviceChange(false)}
                            />
                        </TooltipTrigger>
                        <TooltipContent side='bottom'>
                            Desktop
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div className='mobile hidden md:block'>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DeviceMobileSpeakerIcon 
                                size={32}
                                className='cursor-pointer'
                                onClick={() => onDeviceChange(true)}
                            />
                        </TooltipTrigger>
                        <TooltipContent side='bottom'>
                            Mobile
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>

        </div>
    )
}