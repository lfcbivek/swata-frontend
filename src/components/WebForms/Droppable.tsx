import React, { useEffect, useState} from 'react';
import {useDroppable} from '@dnd-kit/core';

import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '../ui/button';

import { AVAILABLE_FORM_WIDGETS, inputTextSettingsMap } from './constants';
import { RequirementsPopup } from './RequirementsPopup';
import PhoneFrame from '@/common/PhoneFrame';

import './Droppable.scss';


const ContentScreen = (props) => {
  const {
    droppedWidgets,
    handleWidgetSettingsChange,
    widgetSettings,
    formForegroundColor,
    formLabelColor,
    widgetColor,
  } = props;

  const {isOver, setNodeRef} = useDroppable({
    id: 'form-drop-zone',
  });

  const [isRequirementPopUpOpen, setIsRequirementPopUpOpen] = useState(true);
  
  
  const onOpenChange = () => {
    setIsRequirementPopUpOpen(!isRequirementPopUpOpen);
  }
  return(
    <Card ref={setNodeRef} className='DroppableArea' style={{backgroundColor: formForegroundColor}}>
      <CardTitle className='text-center text-3xl header-section'>
        <img src="/terp.png" alt="Swata Logo" className="w-20 h-20 mr-4 inline-block align-center" />
        <span>Feedback Form</span>
      </CardTitle>
      <CardContent className="form-area">
        <div className="dropped-widget">
          {
            droppedWidgets.map((droppedWidget) => {
              const widget = AVAILABLE_FORM_WIDGETS.find(
                (w) => w.id === droppedWidget.id
              );
              const hasRequirements = droppedWidget.hasRequirements;
              if(!widget) return null;
              return (
                <div key={widget.id} onClick={() => hasRequirements && setIsRequirementPopUpOpen(true)} className={`${hasRequirements ? 'border-2 border-red-500 p-2' : ''} cursor-pointer`}>
                  {hasRequirements ? (
                    <RequirementsPopup
                      open={isRequirementPopUpOpen}
                      onOpenChange={onOpenChange}
                      handleSettingsChange={handleWidgetSettingsChange}
                    >
                      {/* This is now the popover trigger anchor — but doesn't handle opening */}
                      <div onClick={onOpenChange}>
                        {widget.droppableUI(widgetSettings ?? droppedWidget.widgetSettings, formLabelColor, widgetColor)}
                      </div>
                    </RequirementsPopup>
                  ) : (
                    widget.droppableUI(widgetSettings ?? droppedWidget.widgetSettings, formLabelColor, widgetColor)
                  )}
                </div>
              );
            }
          )}
        </div>
      </CardContent>
      <CardFooter className='mt-auto flex justify-center'>
        {droppedWidgets.length > 0 && (
          <Button className='submit-button'>Submit</Button>
        )}
      </CardFooter>
    </Card>
  )
}

export function Droppable(props) {
  
  const {
    isMobile
  } = props;
  
  
  return (
    <>
      { isMobile ? (
        <div className='align-center items-center'>
        <PhoneFrame>
          <ContentScreen 
            {...props}
          />
        </PhoneFrame>
        </div>
      ) : (
        <ContentScreen 
          {...props}
        />
      )
      }
    </>
  );
}