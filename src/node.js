class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.left = null;
		this.right = null;
		this.parent = null;
	}

	appendChild(node) {
		if (this.left === null){
            node.parent = this;
			this.left = node;
            return this.left;
		}
		else if (this.right === null){
            node.parent = this;
			this.right = node;
            return this.right;
		}
	}

	removeChild(node) {
		if (this.left === node){
			this.left = null;
			node.parent = null;
		} else if (this.right === node) {
            this.right = null;
            node.parent = null;
        } else {
            throw new TypeError();
        }
        return this;
	}

	remove() {
		if (this.parent !== null) {
            this.parent.removeChild(this);
        }
        return this;
	}

	swapWithParent() {
        if (this.parent !== null) {
        	let tmpNode = this.parent.removeChild(this);
        	if (tmpNode.parent !== null) {
                var tmpParent = tmpNode.parent.removeChild(tmpNode);
            }
            if (this.left !== null) {
                var tmpThisLeft = this.left.remove();
            }
            if (this.right !== null) {
                var tmpThisRight = this.right.remove();
            }
        	if (tmpNode.right !== null){
        		let tmpRight = tmpNode.right.remove();
				if (tmpThisLeft) {
                    tmpNode.appendChild(tmpThisLeft);
				}
				if (tmpThisRight) {
                    tmpNode.appendChild(tmpThisRight);
				}
                this.appendChild(tmpNode);
                this.appendChild(tmpRight);
			}
            else if (tmpNode.left !== null){
                let tmpLeft = tmpNode.left.remove();
                if (tmpThisLeft) {
                    tmpNode.appendChild(tmpThisLeft);
                }
                if (tmpThisRight) {
                    tmpNode.appendChild(tmpThisRight);
                }
                this.appendChild(tmpLeft);
                this.appendChild(tmpNode);
            } else {
                this.appendChild(tmpNode);
			}
			if (tmpParent){
            	tmpParent.appendChild(this);
			}
        }
	}
}

module.exports = Node;
