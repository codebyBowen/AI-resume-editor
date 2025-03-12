'use client'

import { DndContext, DragEndEvent } from "@dnd-kit/core";

export default function DndProvider({ children }: { children: React.ReactNode }) {
  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;
    
    if (over) {
      // Handle the drop event here
      console.log(`Draggable ${active.id} was dropped over droppable ${over.id}`);
    }
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      // Optional configurations:
      // collisionDetection={closestCenter}
      // modifiers={[restrictToWindowEdges]}
      // sensors={[useSensor(PointerSensor)]}
    >
      {children}
    </DndContext>
  );
}