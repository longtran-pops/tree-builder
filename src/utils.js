export function updateTree(tree, value, newValue, key = 'id', reverse = false) {
  const stack = [tree];
  while (stack.length) {
    const node = stack[reverse ? 'pop' : 'shift']();
    if (node[key] === value) {
      node.value = newValue;
      return tree;
    }
    node.children && stack.push(...node.children);
  }
  return null;
}
