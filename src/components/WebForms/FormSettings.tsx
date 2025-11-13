import React, {useState} from 'react';
import { GlobeXIcon, DesktopIcon, DeviceMobileSpeakerIcon } from '@phosphor-icons/react';

import { Button } from "@/components/ui/button";

import './FormSettings.scss';

export const FormSettings = (props) => {
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
                <Button variant="default" size="sm">
                    <GlobeXIcon />
                    <span>Publish</span>
                </Button>
            </div>
            <div className='device-preview'>
                <div className='desktop'>
                    <DesktopIcon 
                        size={32} 
                        className='cursor-pointer'
                        onClick={() => onDeviceChange(false)}
                    />
                </div>
                <div className='mobile hidden md:block'>
                    <DeviceMobileSpeakerIcon 
                        size={32}
                        className='cursor-pointer'
                        onClick={() => onDeviceChange(true)}
                    />
                </div>
            </div>

        </div>
    )
}