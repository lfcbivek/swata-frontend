import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';

import { Droppable } from '@/components/WebForms/Droppable';
import { Draggable } from '@/components/WebForms/Draggable';
import { FormSettings } from '@/components/WebForms/FormSettings';
import { DEFAULT_FORM_BACKGROUND_COLOR } from './constants';

import './WebFormDashboard.scss';

export const WebFormDashboard = () => {
  const [parent, setParent] = useState(null);
  const [draggedWidgets, setDraggedWidgets] = useState([]);
  const [droppedWidgets, setDroppedWidgets] = useState([]);
  const [formBackgroundColor, setFormBackgroundColor] = useState(DEFAULT_FORM_BACKGROUND_COLOR);

  const onWidgetDrag= (widget) => {
    setDraggedWidgets(prev => [...prev, widget]);
  } 

  const onBackgroundColorChange = (colorHex) => {
    setFormBackgroundColor(colorHex)
  }
  return (
    <div className="WebFormDashboard">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="DragDropLayout">
          
          <div className='canvas-container'>
            <div className='settings-section'>
                <FormSettings 
                />
            </div>
            <div className='droppable-container' style={{backgroundColor: formBackgroundColor}}>
              <div className="Droppable">
                <Droppable  
                  droppedWidgets={droppedWidgets}
                />
              </div>
            </div>
          </div>
          <div className="Draggable">
            <Draggable 
              handleDraggedWidgets={onWidgetDrag}
              handleBackgroundColorChange={onBackgroundColorChange}
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
        hasRequirements: true
      }
    ]
    );
  }
    
}