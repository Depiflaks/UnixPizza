class StateController {
    constructor() {
        this._current = null;
        this.transitions = {
            "loginName": {
                name: "loginName",
                next: "loginPassword",
            },
            "loginPassword": {
                name: "loginPassword",
                next: null,
            }
        }

    }

    clean() {
        this._current = null;
    }

    next() {
        if (this.current) this._current = this.transitions[this._current.next]
    }

    current() {
        return (this._current) ? this._current.name : null
    }
}

export { StateController }