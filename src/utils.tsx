export interface TreeNodeModel {
  id: number,
  parent: number|null,
  title: string,
  children: TreeNodeModel[],
};

export interface TreeNodePropsModel extends TreeNodeModel {
  updateTreeWithSublevel: (id: number, title:string) => void,
  updateTreeWithSibling: (id: number, title:string) => void,
  index: number,
};

export interface FlattenTree {
  [id: number]: TreeNodeModel
};

export const mapTreeFlat = (nodes:TreeNodeModel[]) => nodes.reduce((table:{}, node:TreeNodeModel):{} => {
  let t:{} = {
    ...table,
    [node.id]: {
      title: node.title,
      children: node.children,
      parent: node.parent,
      id: node.id,
    },
  };
  if (node.children) {
    t = { ...t, ...mapTreeFlat(node.children) };
  }
  return t;
}, {});

export const getTreePath = (table:FlattenTree, id:number):TreeNodeModel[] => {
  if (!table || !id) {
    return [];
  }

  let path:TreeNodeModel[] = [];
  let current:TreeNodeModel|null = table[id];
  while (current) {
    path = [current, ...path];
    if (current.parent) {
      current = table[current.parent];
    } else {
      current = null;
    }
  }

  return path;
};

export const findByParent = (table:FlattenTree, id:number):TreeNodeModel[] => {
  return Object.values(table).filter(node => node.parent === id);
};
