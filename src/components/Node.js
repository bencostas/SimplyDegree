import React, { useState, Fragment, useContext, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import Modal from "@mui/material/Modal";
import EditNode from "./EditNode";
import AddNode from "./AddNode";
import { CourseContext } from "../utils/context";
import { setDoc, doc } from "firebase/firestore";

const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};
const onNodeContextMenu = (event, node) => {
  event.preventDefault();
  console.log("context menu:", node);
};

const Node = () => {
  const [open, setOpen] = useState(false);
  const [openedNode, setOpenedNode] = useState({});
  const { nodes, setNodes, edges, setEdges } = useContext(CourseContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [gNodes, setGNodes, onNodesChange] = useNodesState(nodes);
  const [gEdges, setGEdges, onEdgesChange] = useEdgesState(edges);
  const onConnect = (params) => {
    console.log(`Edge: ${JSON.stringify(params)}`);
    setGEdges((eds) => addEdge(params, eds));
  };

  useEffect(() => {
    setGNodes(nodes);
  }, [nodes]);

  const onNodeDoubleClick = (event, node) => {
    handleOpen();
    setOpenedNode(node);
  };

  return (
    <Fragment>
      <ReactFlow
        nodes={gNodes}
        edges={gEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onLoad={onLoad}
        style={{ width: "100%", height: "60vh" }}
        connectionLineStyle={{ stroke: "#ddd", strokeWidth: 2 }}
        connectionLineType="bezier"
        snapToGrid={true}
        snapGrid={[16, 16]}
        onNodeDoubleClick={onNodeDoubleClick}
        onNodeContextMenu={onNodeContextMenu}
      >
        <Background color="#888" gap={16} />
        <MiniMap
          nodeColor={(n) => {
            if (n.type === "input") return "blue";

            return "#FFCC00";
          }}
        />
        <Controls />
      </ReactFlow>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditNode node={openedNode} />
      </Modal>
      <Modal open={false}>
        <AddNode />
      </Modal>
    </Fragment>
  );
};

export default Node;
