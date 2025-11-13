import { ReactFlow, Background, Controls, useNodesState, useEdgesState, type Node, } from '@xyflow/react';
import { ActionNode, AddButtonNode } from './workflow/Node';
import '@xyflow/react/dist/style.css';
import { useCallback, useMemo, useState, useEffect } from 'react';
import React from "react";
import { type AvailableIntegration } from '@/common/utils';

interface NodeProps<T = any> {

}

type NodeTypes = {
    [nodeType: string]: React.ComponentType<NodeProps<any>>
}

const nodeTypes: NodeTypes = {
    addButton: AddButtonNode,
    actionNode: ActionNode,
};

const WorkflowContainer = () => {
    
    const [nodes, setNodes, onNodesChange] = useNodesState();
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const nextPosition = React.useCallback((existing: Node[]) => {
        const maxY = existing ? Math.max(...existing.map(n => n.position.y)) : 100;
        return { x: 380, y: maxY + 120 }; // simple stacking layout
    }, []);

    const handleAddButtonClick = useCallback((selectedNode: AvailableIntegration) => {
        const id = `${selectedNode.integration}-${selectedNode.type}-${Date.now()}`;
    
        const newNode: Node = {
            id,
            type: "actionNode",
            position: nextPosition(nodes),
            data: {
              label: selectedNode.label,
              icon: selectedNode.icon,
              opType: selectedNode.type,
              integration: selectedNode.integration,
            },
          };
        setNodes((nds) => nds.concat(newNode));
    }, [setNodes]);

    useEffect(() => {
        setNodes([
          {
            id: "add-1",
            type: "addButton",
            position: { x: 500, y: 400 },
            data: { onAdd: handleAddButtonClick }, // pass handler via data
          },
        ]);
      }, [setNodes, handleAddButtonClick]);
    
    
    
    return(
        <div style={{ height: '100dvh', width: '100dvw'}}>
            <ReactFlow 
                nodes={nodes}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    )
}

export default WorkflowContainer;