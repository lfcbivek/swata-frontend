import {useState} from 'react';
import {useDraggable} from '@dnd-kit/core';
import { AVAILABLE_FORM_WIDGETS } from './constants';
import { Button } from '../ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { FormStyles } from './FormStyles';

import './Draggable.scss';

export function Draggable(props:any) {
  
  const { 
    handleColorChange,
  } = props;

  const [isOpen, setIsOpen] = useState({
    widgetCollapsible: false,
    styleCollapsible: false
  });

  const DraggableItem = ({id, children}:any) => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({id});
    const style = transform ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      cursor: "grab",
    } : undefined;

    return (
      <button
        id={id}
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="rounded-md font-mono text-sm hover:bg-muted transition widget-button"
      >
        {children}
      </button>
    );
  }

  
  return (
    <div className='Draggable flex w-full max-w-sm flex-col gap-6'>

      <Tabs defaultValue="widgets"  className='tab-list'>
        <TabsList className='justify-center items-center'>
          <TabsTrigger 
            value="widgets"
            className="
              data-[state=active]:bg-[#658C58]
              data-[state=active]:text-white 
              px-4 py-2
            "
          >
            Widgets
          </TabsTrigger>
          <TabsTrigger 
            value="styles"
            className="
              data-[state=active]:bg-[#658C58]
              data-[state=active]:text-white 
              px-4 py-2
            "
          >
            Styles
          </TabsTrigger>
        </TabsList>
        <div className='tab-contents'>
          <TabsContent value="widgets">
            <div className="widget-items">
              { AVAILABLE_FORM_WIDGETS.map(formWidget => (
                  <DraggableItem id={formWidget.id}>
                    {formWidget.draggableUI}
                  </DraggableItem>
                  )
                )
              }
            </div>
          </TabsContent>
          <TabsContent value="styles">
            <div className='style-container'>
              <div className='background-color'>
                <FormStyles 
                  handleColorChange={handleColorChange}
                />
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
          
    </div>
  );
}