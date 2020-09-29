module.exports = {
    get body() {
        return this._body;
    },

    set body(data) {
        this._body = data;
    },

    get status() {
        return this.res.statusCode;
    },

    set status(statusCode) {
        if (typeof statusCode !== 'number'){
            throw new Error('Something is wrong!');
        } 

        this.res.statusCode = statusCode;
    }
};