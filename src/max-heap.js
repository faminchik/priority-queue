const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		this.insertNode(new Node(data, priority));
		this.shiftNodeUp(this.root);
	}

    insertNode(node) {
		if (this.root === null) {
			this.root = node;
			this.parentNodes.push(this.root);
        } else {
            var tmpNode = this.parentNodes[0].appendChild(new Node(node.data, node.priority));
            if (this.parentNodes[0].left !== null && this.parentNodes[0].right !== null){
			 	this.parentNodes.shift();
			 }
			this.parentNodes.push(tmpNode);
		}
    }

	pop() {
		if (this.root !== null) {
            this.shiftNodeUp(this.getNodeWithMaxPriority(this.root));
        }
		let rootSize = this.size();
		let detRoot = this.detachRoot();
		if (rootSize > 1) {
            this.restoreRootFromLastInsertedNode(detRoot);
            this.shiftNodeDown(this.root);
        }
		if (detRoot === null){
			return null;
		}
		return detRoot.data
	}

	getNodeWithMaxPriority(node) {
		function max2(a, b) {
			if (a === null && b === null) return null;
			if (a === null) return b;
			if (b === null) return a;
			if (a.priority > b.priority){
				return a;
			} else {
				return b;
			}
        }
        function max3(a, b, c) {
			return max2(a, max2(b, c));

        }
        if (node !== null) {
            return max3(node, this.getNodeWithMaxPriority(node.left), this.getNodeWithMaxPriority(node.right));
        }
        return null;
	}

	detachRoot() {
		let tmpRoot = this.root;
		//this.parentNodes.shift();
		this.root = null;
		return tmpRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		var LastInsertedNode = this.parentNodes[this.parentNodes.length - 1];
        var tmpParent = LastInsertedNode.parent; //it's wrong :(
		this.parentNodes.pop();
        LastInsertedNode.remove();
		if (detached.left !== null) {
            LastInsertedNode.appendChild(detached.left);
        }
        if (detached.right !== null) {
            LastInsertedNode.appendChild(detached.right);
        }
        if (this.sizeRec(LastInsertedNode) % 2 === 0 && this.sizeRec(LastInsertedNode) > 1 ) {
            if (this.sizeRec(LastInsertedNode) === 2) {
                this.parentNodes.unshift(LastInsertedNode);
            } else {
                this.parentNodes.unshift(tmpParent);
			}
		}
		if (this.sizeRec(LastInsertedNode) === 1){
            this.parentNodes[0] = LastInsertedNode;
		}
        this.root = LastInsertedNode;
	}


	size() {
        if (this.root === null){
            return 0;
        }
        return this.sizeRec(this.root);
	}
    sizeRec (node) {
        if (node.left === null && node.right === null){
            return 1;
        }
        let leftCount, rightCount;
        if (node.left !== null){
            leftCount = this.sizeRec(node.left);
        } else {
            leftCount = 0;
        }
        if (node.right !== null){
            rightCount = this.sizeRec(node.right);
        } else {
            rightCount = 0;
        }
        return leftCount + rightCount + 1;
    }

	isEmpty() {
		return this.size() === 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}


	shiftNodeUp(node) {
        var curSize = this.size();
		while (node.parent !== null) {
			if (node.priority > node.parent.priority) {
                var tmpNode = node.parent;
                if (this.parentNodes.indexOf(tmpNode) !== -1 && this.parentNodes.indexOf(node) !== -1 && curSize > 2) {
                	this.parentNodes[this.parentNodes.indexOf(tmpNode)] = node;
                    this.parentNodes[this.parentNodes.indexOf(node)] = tmpNode;
				} else {
                    if (this.parentNodes.indexOf(tmpNode) !== -1 && curSize > 2) {
                        this.parentNodes[this.parentNodes.indexOf(tmpNode)] = node;
                    }
                    if (this.parentNodes.indexOf(node) !== -1 && curSize > 2) {
                        this.parentNodes[this.parentNodes.indexOf(node)] = tmpNode;
                    }
                }
                node.swapWithParent();
                if (curSize <= 2) {
                	this.parentNodes.unshift(this.parentNodes[this.parentNodes.length - 1]);
                	this.parentNodes.pop();
				}

            } else {
				break;
			}
		}
		this.root = this.getRoot(node);
	}

	shiftNodeDown(node) {
		function largerOfChildren (nodeOne, nodeTwo) {
			if (nodeOne === null && nodeTwo === null) return null;
			if (nodeOne === null) return nodeTwo;
            if (nodeTwo === null) return nodeOne;
            if (nodeOne.priority > nodeTwo.priority) {
                return nodeOne;
            }
            if (nodeOne.priority < nodeTwo.priority) {
                return nodeTwo;
            }
        }
        var curSize = this.size();
        while (largerOfChildren(node.left, node.right) !== null) {
			var larger = largerOfChildren(node.left, node.right);
            if (node.priority < larger.priority){
                if (this.parentNodes.indexOf(larger) !== -1 && this.parentNodes.indexOf(node) !== -1 && curSize > 2) {
                    this.parentNodes[this.parentNodes.indexOf(larger)] = node;
                    this.parentNodes[this.parentNodes.indexOf(node)] = larger;
                } else {
                    if (this.parentNodes.indexOf(node) !== -1 && curSize > 2) {
                        this.parentNodes[this.parentNodes.indexOf(node)] = larger;
                    }
                    if (this.parentNodes.indexOf(larger) !== -1 && curSize > 2) {
                        this.parentNodes[this.parentNodes.indexOf(larger)] = node;
                    }
                }
                larger.swapWithParent();
                if (curSize <= 2) {
                    this.parentNodes.unshift(this.parentNodes[this.parentNodes.length - 1]);
                    this.parentNodes.pop();
                }
            } else {
                break;
            }
        }
        this.root =  this.getRoot(node);
	}


	getRoot(node) {
		if(node.parent !== null) {
            this.getRoot(node.parent);
        } else {
			this.root = node;
		}
		return this.root;
	}
}

module.exports = MaxHeap;


const h = new MaxHeap();
h.push(42, 15);
h.push(15, 14);
h.push(0, 16);
h.push(100, 100);
// var a = h.getNodeWithMaxPriority(h.root);
// var b = h.size();
// h.pop();
// b = h.size();
// h.pop();
// b = h.size();
// h.pop();
// b = h.size();
// h.pop();
// b = h.size();
// h.pop();
// b = h.size();
//
// h.push(0,3);
// h.push(1,20);
// //h.push(2,7);
// //h.push(3,5);
// h.shiftNodeDown(h.root);

// h.push(0,3);
// h.push(1,20);
// h.push(2,7);
// h.pop();

// const root = h.root;
// const left = h.root.left;
// const lastInsertedNode = h.root.right;
//
// const detached = h.detachRoot();
// h.restoreRootFromLastInsertedNode(detached);
//
// console.log(h.parentNodes.indexOf(root));
// console.log(h.parentNodes[0]);
// console.log(h.parentNodes[1]);
//
//
// var d = h.detachRoot();
//h.restoreRootFromLastInsertedNode(d);

//var a = h.size();
//h.shiftNodeUp(h.root.left.left);