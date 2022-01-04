//binary search tree
class node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class bst {
    constructor() {
        this.root = null; //initially empty
    }

    insert(newNode) {
        //tree is empty!
        if(this.root == null) {
            this.root = newNode;
        }
        //tree is not empty
        else {
            let curr_n = this.root;

            //loops until it reaches NULL!
            while(curr_n) {
                //checks RIGHT
                if(newNode.value > curr_n.value) {
                    //inserting!
                    if(curr_n.right == null) {
                        curr_n.right = newNode;
                        return;
                    }
                    //moves right
                    else {
                        curr_n = curr_n.right; //update
                    }
                }
                //checks LEFT
                else {
                    //inserting!
                    if(curr_n.left == null) {
                        curr_n.left = newNode;
                        return;
                    }
                    //moves left
                    else {
                        curr_n = curr_n.left; //update
                    }
                }
            }
        }
    }

    search(findEle) {
        //tree is empty!
        if(this.root == null) {
            console.log(`Tree does not exist.`);
        }
        //tree is not empty!
        else {
            let curr_n = this.root;

            //loops until it reaches NULL!
            while(curr_n) {
                //FOUND! Search complete.
                if(findEle == curr_n.value) {
                    console.log(`FOUND ${findEle}!`);
                    return;
                }
                //moves right
                else if(findEle > curr_n.value) {
                    curr_n = curr_n.right; //update
                }
                //moves left
                else {
                    curr_n = curr_n.left; //update
                }
            }
        }

        console.log(`${findEle} does not exist in the tree!`);
    }

    preorder_iterative(curr_n) {
        let nodeStack = [];
        nodeStack.push(curr_n);

        while(nodeStack.length > 0) {
            let lastIndex = nodeStack.length - 1;
            let node = nodeStack[lastIndex];
            
            nodeStack.pop();

            console.log(node.value);

            if(node.right != null) {
                nodeStack.push(node.right);
            }
            
            if(node.left != null) {
                nodeStack.push(node.left);
            }
        }
    }

    preorder_recursive(curr_n) {
        if(curr_n == null) {
            return;
        }
        
        console.log(`${curr_n.value}`);
        this.preorder_recursive(curr_n.left);
        this.preorder_recursive(curr_n.right);
    }

    display() {
        if(this.root == null) {
            console.log(`Tree does not exist.`);
        }
        else {
            //recursive
            console.log(`inorder (recursive):`);
            this.preorder_recursive(this.root);

            //iterative
            console.log(`inorder (iterative):`);
            this.preorder_iterative(this.root);
        }
    }
};

let tree = new bst;
let node_1 = new node(5);
tree.insert(node_1);

tree.insert(new node(1));
tree.insert(new node(2));
tree.insert(new node(3));
tree.insert(new node(0));
tree.insert(new node(4));

tree.insert(new node(6));
tree.insert(new node(7));
tree.insert(new node(8));
tree.insert(new node(9));
tree.insert(new node(10));

tree.search(9);
tree.search(11);
tree.display();

/*
   5
 1   6
0 2   7
   3   8
    4   9
         10

inorder traversal : 5 1 0 2 3 4 6 7 8 9 10
*/
