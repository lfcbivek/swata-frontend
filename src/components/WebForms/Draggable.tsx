import {useState} from 'react';
import {useDraggable} from '@dnd-kit/core';
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { CaretDoubleDown, Textbox, Envelope, CaretDoubleUp, Password, NumberCircleEight } from "@phosphor-icons/react";

export function Draggable(props) {
  

  const [isOpen, setIsOpen] = useState(false);

  const DraggableItem = ({id, children}) => {
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
        className="rounded-md font-mono text-sm hover:bg-muted transition"
      >
        {children}
      </button>
    );
  }

  
  return (
    <div>
      <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-[350px] flex-col gap-2"
      >
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="text-sm font-semibold">
          Widgets
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            {isOpen ? <CaretDoubleUp /> : <CaretDoubleDown /> }
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <DraggableItem id="input-widget">
          <div className="rounded-md border px-4 py-2 font-mono text-sm flex flex-row items-center gap-10">
            <Textbox size={36} />
            Input Text
          </div>
        </DraggableItem>

        <DraggableItem id="email-widget">
          <div className="rounded-md border px-4 py-2 font-mono text-sm flex flex-row items-center gap-10">
            <Envelope size={36} />
            Email
          </div>
        </DraggableItem>

        <DraggableItem id="password-widget">
          <div className="rounded-md border px-4 py-2 font-mono text-sm flex flex-row items-center gap-10">
            <Password size={36} />
            Password
          </div>
        </DraggableItem>

        <DraggableItem id="number-widget">
          <div className="rounded-md border px-4 py-2 font-mono text-sm flex flex-row items-center gap-10">
            <NumberCircleEight size={36} />
            Number Input
          </div>
        </DraggableItem>
        
      </CollapsibleContent>
    </Collapsible>
    </div>
  );
}