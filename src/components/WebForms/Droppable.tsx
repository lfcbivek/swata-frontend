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


const ContentScreen = (props:any) => {
  const {
    droppedWidgets,
    handleWidgetSettingsChange,
    widgetSettings,
    formForegroundColor,
    formLabelColor,
    widgetColor,
    handlePopupChange
  } = props;

  const {isOver, setNodeRef} = useDroppable({
    id: 'form-drop-zone',
  });

  const [isRequirementPopUpOpen, setIsRequirementPopUpOpen] = useState(true);
  
  
  const onOpenChange = (widget) => {
    // Update the settings
    const newSettings = {
      ...widget,
      showWidgetSettings: !widget.showWidgetSettings
  }
    handleWidgetSettingsChange(widget.widgetId, newSettings);
  }
  
  
  return(
    <Card ref={setNodeRef} className='DroppableArea' style={{backgroundColor: formForegroundColor}}>
      <CardTitle className='text-center text-3xl header-section'>
        <img src="/terp.png" alt="Swata Logo" className="w-20 h-20 mr-4 inline-block align-center" />
        <span style={{color: formLabelColor}}>Feedback Form</span>
      </CardTitle>
      <CardContent className="form-area">
        <div className="dropped-widget">
          {
            droppedWidgets.map((droppedWidget:any) => {
              const widget = AVAILABLE_FORM_WIDGETS.find(
                (w) => w.id === droppedWidget.id
              );
              const showWidgetSettings = droppedWidget.showWidgetSettings;
              if(!widget) return null;
              return (
                <div 
                  key={widget.widgetId}  
                  className={`${showWidgetSettings ? 'border-2 border-red-500 p-2' : ''} cursor-pointer hover:border-2 hover:border-red-500 hover:p-2`}
                  onClick={() => handlePopupChange(droppedWidget.widgetId, !showWidgetSettings)}
                >
                  {showWidgetSettings ? (
                    <RequirementsPopup
                      open={isRequirementPopUpOpen}
                      onOpenChange={() => onOpenChange(droppedWidget)}
                      handleWidgetSettingsChange={handleWidgetSettingsChange}
                      handleWidgetSettingsClose={handlePopupChange}
                      widgetId={droppedWidget.widgetId}
                      currentSettings={droppedWidget.widgetSettings}
                      requirementsDefinitions={droppedWidget.requirementsDefinitions}
                    >
                      <div
                        onClick={(e) => e.stopPropagation()}
                      >
                        { typeof widget.droppableUI === "function" && widget.droppableUI(widgetSettings ?? droppedWidget.widgetSettings, formLabelColor, widgetColor)}
                      </div>
                    </RequirementsPopup>
                  ) : (
                    typeof widget.droppableUI === "function" && widget.droppableUI(widgetSettings ?? droppedWidget.widgetSettings, formLabelColor, widgetColor)
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

export function Droppable(props:any) {
  
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