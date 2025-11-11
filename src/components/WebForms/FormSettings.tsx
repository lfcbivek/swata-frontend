import React, {useState} from 'react';
import { GlobeXIcon } from '@phosphor-icons/react';

import { Button } from "@/components/ui/button";

import './FormSettings.scss';

export const FormSettings = () => {

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

        </div>
    )
}