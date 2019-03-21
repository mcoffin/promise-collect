class Either {
    constructor(value) {
        this.value = value;
    }

    get isLeft() {
        return (this instanceof Left);
    }

    get isRight() {
        return (this instanceof Right);
    }
}

class Left extends Either {
    constructor(value) {
        super(value);
    }
}

class Right extends Either {
    constructor(value) {
        super(value);
    }
}

exports.Either = Either;
exports.Left = Left;
exports.Right = Right;
