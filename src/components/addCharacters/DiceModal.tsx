import { useDraggable } from "@dnd-kit/core";

const DraggableDice = ({ value, index }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `draggable-dice-${index}`,
    });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="flex flex-col items-center mr-4 cursor-move"
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <span className="font-bold">Dado {index + 1}</span>
      <span>{value}</span>
    </div>
  );
};
