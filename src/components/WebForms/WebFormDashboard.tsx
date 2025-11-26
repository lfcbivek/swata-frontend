import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';

import { Droppable } from '@/components/WebForms/Droppable';
import { Draggable } from '@/components/WebForms/Draggable';
import { FormSettings } from '@/components/WebForms/FormSettings';
import { DEFAULT_BACKGROUND_COLOR, 
  DEFAULT_FORM_FOREGROUND_COLOR,
  DEFAULT_LABEL_COLOR,
  DEFAULT_WIDGET_COLOR,
  inputTextSettingsMap 
} from './constants';

import './WebFormDashboard.scss';

export const WebFormDashboard = () => {
  const [parent, setParent] = useState(null);
  const [draggedWidgets, setDraggedWidgets] = useState<any>([]);
  const [droppedWidgets, setDroppedWidgets] = useState<any>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [colors, setColors] = useState({
    formBackgroundColor: DEFAULT_BACKGROUND_COLOR,
    formForegroundColor: DEFAULT_FORM_FOREGROUND_COLOR,
    formLabelColor: DEFAULT_LABEL_COLOR,
    widgetColor: DEFAULT_WIDGET_COLOR
  });
  const [widgetSettings, setWidgetSettings] = useState<any>(null);


  const onWidgetDrag= (widget:any) => {
    setDraggedWidgets((prev:any) => [...prev, widget]);
  } 

  const onColorChange = (key:string, colorHex:string) => {
    setColors(prev => ({
      ...prev,
      [key]: colorHex
    }));
  }

  const onDeviceChange = (mobile:boolean) => {
    setIsMobile(mobile);
  }

  const onWidgetSettingsChange = (newSettings:any) => {
    // Map widget setting into the format understood by the popup
    const widgetSettings = Object.fromEntries(
      newSettings.map((s:any) => [s.key, s.value])
    );
    setWidgetSettings(widgetSettings)
  }

  return (
    <div className="WebFormDashboard">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="DragDropLayout">
          
          <div className='canvas-container'>
            <div className='settings-section'>
                <FormSettings
                  handleDeviceChange={onDeviceChange}
                />
            </div>
            <div className='droppable-wrapper'>
              <div className='droppable-container' style={{backgroundColor: !isMobile ? colors.formBackgroundColor : DEFAULT_BACKGROUND_COLOR}}>
                <div className="Droppable">
                  <Droppable  
                    droppedWidgets={droppedWidgets}
                    handleWidgetSettingsChange={onWidgetSettingsChange}
                    widgetSettings={widgetSettings}
                    formForegroundColor={colors.formForegroundColor}
                    formLabelColor={colors.formLabelColor}
                    widgetColor={colors.widgetColor}
                    isMobile={isMobile}
                  />
                  <div className="absolute left-25 bottom-10 bg-[#d6132a] rounded-xl shadow px-4 py-1">
                    <p className="text-center text-sm text-white">⚡ Powered by Swata</p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          <div className="Draggable">
            <Draggable 
              handleDraggedWidgets={onWidgetDrag}
              handleColorChange={(key:string, color:string) => onColorChange(key, color)}
            />
          </div>
        </div>
      </DndContext>
    </div>
  );

  function handleDragEnd(event:any) {
    const {active, over} = event;

    if (!active || !over) return;
    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
    setDroppedWidgets((prev:any) => [
      ...prev, 
      { 
        ...active,
        // When the widgets are first dragged, this makes sure that the users are able to change the settings
        hasRequirements: true,
        widgetSettings: inputTextSettingsMap
      }
    ]
    );
  }
    
}