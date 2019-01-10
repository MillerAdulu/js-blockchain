import sha256 from 'sha256';

class Block {
    constructor(index, timestamp, data) {
        this.index = index; // Communicates where in the chain the block is located
        this.timestamp = timestamp; // Shows when the block was created
        this.data = data; // Info stored in the chain. In BTC, transaction data is stored here in form of a Merkle Tree
        this.previousHash = "0"; // Maintain the integrity of the chain
        this.hash = this.calculateHash(); // The hash of the current block
        this.nonce = 0; // 

    }

    calculateHash() {
        return sha256(this.index + this.previousHash + this.timestamp + this.data + this.nonce);
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, Date.now(), 'Genesis Block', '0');
    }

    latestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.index = this.latestBlock().index + 1;
        newBlock.previousHash = this.latestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    checkValidity() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];

            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) return false;

            if (currentBlock.previousHash !== previousBlock.hash) return false;
        }
        return true;
    }
}

let jsChain = new BlockChain();
jsChain.addBlock(new Block(Date.now(), {
    amount: 50
}));
jsChain.addBlock(new Block(Date.now(), {
    amount: 1000
}));

console.log(JSON.stringify(jsChain, null, 4))
console.log(`Is BlockChain valid? ${jsChain.checkValidity()}`)