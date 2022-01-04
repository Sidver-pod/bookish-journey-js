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
            console.log(`NOT FOUND!`);
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
};

let tree = new bst;
let node_1 = new node(1);
tree.insert(node_1);

tree.insert(new node(2));
tree.insert(new node(3));
tree.insert(new node(4));
tree.insert(new node(5));
tree.insert(new node(6));
tree.insert(new node(7));
tree.insert(new node(8));
tree.insert(new node(9));
tree.insert(new node(10));

tree.search(9);
tree.search(11);
