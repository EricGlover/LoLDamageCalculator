class Formatter {
    /**
     * @param {string} str
     */
    stripTags(str) {
        let clone = str;
        let reg = /(<([^>]+)>)/ig;
        return str.replace(reg, '');
    }

}

module.exports = Formatter;