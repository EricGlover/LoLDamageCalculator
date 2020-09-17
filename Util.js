class Util {
    static toNumberArr(str) {
        return str.split("/").map(str => Number.parseInt(str.trim()));
    }
}