import { EventType } from "../shared/event-type";

figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
  if (msg.type === 'create-rectangles') {
    const nodes = [];

    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);

    // This is how figma responds back to the ui
    figma.ui.postMessage({
      type: 'create-rectangles',
      message: `Created ${msg.count} Rectangles`,
    });
  }

  if (msg.type === EventType.ListThemeColor) {
    const typeSet = new Set();
    const recursive = (node: BaseNode) => {
      if ('children' in node) {
        for (const child of node.children) {
          recursive(child);
        }

        if ('fills' in node && node.fills instanceof Array) {
          for (const paint of node.fills) {
            
          }
          console.log(node.type, node.fills, typeof node.fills, node.fills instanceof Array);
        }
      }
    };
    console.log("=== paint types ===", typeSet.size);
    
    console.log("=== figma.currentPage ===", figma.currentPage);

    recursive(figma.root);
    

    figma.ui.postMessage({
      type: EventType.ListThemeColor,
    });
  }

  figma.closePlugin();
};
