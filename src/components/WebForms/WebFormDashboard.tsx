import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';

import {Droppable} from './Droppable';
import {Draggable} from './Draggable';

import './WebFormDashboard.scss';

export const WebFormDashboard = () => {
  const [parent, setParent] = useState(null);
  const [isDropped, setIsDropped] = useState(false);
  const [draggedWidgets, setDraggedWidgets] = useState([]);

  const onWidgetDrag= (widget) => {
    console.log(widget);
    setDraggedWidgets(prev => [...prev, widget]);
  } 

  return (
    <div className="WebFormDashboard">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="DragDropLayout">
          <div className="Draggable">
            <Draggable 
              handleDraggedWidgets={onWidgetDrag} 
            />
          </div>
          <div className="Droppable">
            <Droppable className="DroppableArea">
              Drop Here!
             </Droppable>
          </div>
        </div>
      </DndContext>
    </div>
  );

  function handleDragEnd(event) {
    const {over} = event;
    console.log("drag end")
    console.log(event)
    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
    setIsDropped(true)
  }
    
}