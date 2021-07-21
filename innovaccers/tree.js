function Node(data) {
  this.data = data;
  this.right = null;
  this.left = null;
}

function insertNode(root, data) {
  if (root === null) {
    root = new Node(data);
  } else if (data <= root.data) {
    root.left = insertNode(root.left, data);
  } else {
    root.right = insertNode(root.right, data);
  }
  return root;
}

function insertNodeLoop(root, data) {
  const newNode = new Node(data);
  if (root === null) {
    return newNode;
  }
  let temp = root;
  let beforeTemp = null;
  while (temp !== null) {
    beforeTemp = temp;
    if (data <= temp.data) {
      temp = temp.left;
    } else {
      temp = temp.right;
    }
  }
  if (data <= beforeTemp.data) {
    beforeTemp.left = newNode;
  } else {
    beforeTemp.right = newNode;
  }
  return root;
}

function searchNode(root, data) {
  if (root === null) return false;
  if (root.data == data) return true;
  if (data <= root.data) return searchNode(root.left, data);
  else return searchNode(root.right, data);
}

function searchNodeLoop(root, data) {
  let temp = root;
  while (temp !== null) {
    if (temp.data === data) {
      return true;
    }
    if (data <= temp.data) temp = temp.left;
    else temp = temp.right;
  }
  return false;
}

function findMinimum(root) {
  if (root === null) {
    throw 'Empty Tree';
  }
  if (root.left === null) {
    return root.data;
  }
  return findMinimum(root.left);
}

function findMinimumLoop(root) {
  if (root === null) {
    throw 'Empty Tree';
  }
  let temp = root;
  while (temp.left !== null) {
    temp = temp.left;
  }
  return temp.data;
}

function findMaximum(root) {
  if (root === null) {
    return false;
  }
  if (root.right === null) {
    return root.data;
  }
  return findMaximum(root.right);
}

function findMaximumLoop(root) {
  if (root === null) {
    throw 'Empty Tree';
  }
  let temp = root;
  while (temp.right !== null) {
    temp = temp.right;
  }
  return temp.data;
}

function getHeight(root) {
  if (root == null) return 0;
  const leftHeight = getHeight(root.left);
  const rightHight = getHeight(root.right);
  return Math.max(leftHeight, rightHight) + 1;
}

function BSTnode() {
  this.root = null;
  this.insert = function (data) {
    this.root = insertNode(this.root, data);
  };
  this.search = function (data) {
    return searchNode(this.root, data);
  };
  this.min = function () {
    return findMinimum(this.root);
  };
  this.max = function () {
    return findMaximum(this.root);
  };
  this.height = function () {
    return getHeight(this.root);
  };
}

// function testBST() {
const bst = new BSTnode();
bst.insert(15);
bst.insert(10);
bst.insert(20);
bst.insert(25);
bst.insert(8);
bst.insert(12);
bst.insert(18);
// }
