import * as React from 'react';
import { TreeNodePropsModel } from './utils';
import './treenode.css';

const TreeNode: React.FC<TreeNodePropsModel> = ({
  children,
  id,
  index,
  title,
  updateTreeWithSublevel,
  updateTreeWithSibling,
}) => {
  const [showSublevelInput, setShowSublevelInput] = React.useState<boolean>(false);
  const [sublevelInputValue, setSublevelInputValue] = React.useState<string>('');
  const [showSiblingLevelInput, setShowSiblingLevelInput] = React.useState<boolean>(false);
  const [siblingLevelInputValue, setSiblingLevelInputValue] = React.useState<string>('');

  const handleKeyPressSublevel = (e:React.KeyboardEvent):void => {
    if (e.key !== 'Enter' || !sublevelInputValue.length) return;
    updateTreeWithSublevel(id, sublevelInputValue);
    setShowSublevelInput(false);
    setSublevelInputValue('');
  };

  const handleKeyPressSiblingLevel = (e:React.KeyboardEvent):void => {
    if (e.key !== 'Enter' || !siblingLevelInputValue.length) return;
    updateTreeWithSibling(id, siblingLevelInputValue);
    setShowSiblingLevelInput(false);
    setSiblingLevelInputValue('');
  };

  const handleChangeSublevel = (e:React.FormEvent<HTMLInputElement>):void => {
    setSublevelInputValue(e.currentTarget.value)
  }

  const handleChangeSiblingLevel = (e:React.FormEvent<HTMLInputElement>):void => {
    setSiblingLevelInputValue(e.currentTarget.value)
  }

  return (
    <li className="treenode">
      <span className="treenode-title">
        {title}
      </span>
      <button disabled={showSiblingLevelInput} type="button" onClick={() => setShowSublevelInput(true)}>
        Add sublevel
      </button>
      {!index && ( // Shown for the first element of the block
        <button disabled={showSublevelInput} type="button" onClick={() => setShowSiblingLevelInput(true)}>
          Add sibling
        </button>
      )}
      {showSublevelInput && (
        <div>
          <input placeholder="sublevel" type="text" onKeyPress={handleKeyPressSublevel} onChange={handleChangeSublevel}/>
          {!!sublevelInputValue.length && <label>*Press enter</label>}
        </div>
      )}
      {showSiblingLevelInput && (
        <div>
          <input placeholder="sibling" type="text" onKeyPress={handleKeyPressSiblingLevel} onChange={handleChangeSiblingLevel}/>
          {!!siblingLevelInputValue.length && <label>*Press enter</label>}
        </div>
      )}
      {children.map((c, i) => (
        <TreeNode
          {...c}
          index={i}
          key={c.id}
          updateTreeWithSublevel={updateTreeWithSublevel}
          updateTreeWithSibling={updateTreeWithSibling}
        />
      ))}
    </li>
  );
}

export default TreeNode;
