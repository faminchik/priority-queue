const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize || 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.size() < this.maxSize) {
            this.heap.push(data, priority);
        } else {
			throw new TypeError();
		}
	}

	shift() {
        if (this.isEmpty()) {
        	throw new TypeError();
        }
		return this.heap.pop();
	}

	size() {
		return this.heap.size();
	}


	isEmpty() {
		return this.size() === 0;
	}
}

module.exports = PriorityQueue;

