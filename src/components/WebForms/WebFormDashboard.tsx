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
  const [draggedWidgets, setDraggedWidgets] = useState([]);
  const [droppedWidgets, setDroppedWidgets] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [colors, setColors] = useState({
    formBackgroundColor: DEFAULT_BACKGROUND_COLOR,
    formForegroundColor: DEFAULT_FORM_FOREGROUND_COLOR,
    formLabelColor: DEFAULT_LABEL_COLOR,
    widgetColor: DEFAULT_WIDGET_COLOR
  });
  const [widgetSettings, setWidgetSettings] = useState(null);


  const onWidgetDrag= (widget) => {
    setDraggedWidgets(prev => [...prev, widget]);
  } 

  const onColorChange = (key, colorHex) => {
    setColors(prev => ({
      ...prev,
      [key]: colorHex
    }));
  }

  const onDeviceChange = (mobile:boolean) => {
    setIsMobile(mobile);
  }

  const onWidgetSettingsChange = (newSettings) => {
    // Map widget setting into the format understood by the popup
    const widgetSettings = Object.fromEntries(
      newSettings.map(s => [s.key, s.value])
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
            <div className='droppable-container' style={{backgroundColor: colors.formBackgroundColor}}>
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
              </div>
              <p className='text-center mt-2'>
               ⚡ Powered by Swata
              </p>
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

  function handleDragEnd(event) {
    const {active, over} = event;

    if (!active || !over) return;
    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
    setDroppedWidgets(prev => [
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