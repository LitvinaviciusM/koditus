import * as React from 'react';
import TreeNode from './treenode';
import {
  TreeNodeModel,
  findByParent,
  mapTreeFlat,
  getTreePath,
} from './utils';

const initialTree:TreeNodeModel[] = [
  {
    id: 1,
    title: 'The most important folder',
    children: [
      {
        id: 2,
        title: 'Less important folder',
        children: [
          {
            id: 3,
            title: 'Hidden folder',
            children: [],
            parent: 2,
          }
        ],
        parent: 1,
      }
    ],
    parent: null,
  },
  {
    id: 4,
    title: 'Small folder',
    children: [],
    parent: null,
  },
  {
    id: 5,
    title: 'Medium folder',
    children: [],
    parent: null,
  },
];

const Tree: React.FC = () => {
  const [nodes, setNodes] = React.useState<TreeNodeModel[]>(initialTree);

  const updateTreeWithSibling = (siblingId:number, title:string):void => {
    // const flatten = mapTreeFlat(nodes);
    // const path = getTreePath(flatten, siblingId);
    // const bottom = 
    // const updated = nodes;
    // const idxs = [];
    // let current;

    // while (path.length) {
    //   const pathNode = path.shift();
    //   if (idxs.length)
    //   const idx = updated
    // }
    // let current;

    // while (path.length) {
    //   const node = path.shift();

    //   const scanLevel = (updated) => {
    //     const idx = nodes.findIndex(n => n.id === node.id);
    //   };

      
    //   if (idx !== -1) {
    //     updated.push({
    //       id: flatten.length,
    //       title,
    //       children: [],
    //       parent: node.parent,
    //     })
    //   } else {

    //   }
    // }
  }

  const updateTreeWithSublevel = (parentId:number, title:string):void => {
    const flatten = mapTreeFlat(nodes);
    const path = getTreePath(flatten, parentId);
    console.log('path:', path);
    // Start building new node bottom -> top
    let updatedNode:TreeNodeModel|any = path.pop();
    // Inject sublevel
    updatedNode.children.push({
      id: Object.entries(flatten).length,
      title,
      children: [],
      parent: updatedNode.id,
    });

    while (path.length) {
      const aboveUpdatedNode:TreeNodeModel|any = path.pop();
      const siblings = findByParent(flatten, aboveUpdatedNode.id);
      updatedNode = { ...aboveUpdatedNode, children: [...siblings] }
    }

    // for (let i = 0; i++; i < nodes.length) {
    //   const { id, children } = nodes[i];
    //   if (id === parentId) {
    //     // TODO:
    //     break;
    //   }
    //   if (!children.length) {
    //     continue;
    //   }
    // }
  }

  return (
    <ul>
      {nodes.map((n, i) => (
        <TreeNode
          {...n}
          key={n.id}
          index={i}
          updateTreeWithSublevel={updateTreeWithSublevel}
          updateTreeWithSibling={updateTreeWithSibling}
        />
      ))}
    </ul>
  );
}

export default Tree;
