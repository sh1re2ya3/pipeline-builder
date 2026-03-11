// draggableNode.js

export const DraggableNode = ({ type, label, description, collapsed }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="draggable-node"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      title={collapsed ? label : description}
      draggable
    >
      <span className="node-label">{label}</span>
      {!collapsed && (
        <span className="node-description-small">{description}</span>
      )}
    </div>
  );
};
  