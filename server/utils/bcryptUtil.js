const bcrypt = require("bcrypt");

exports.createHash = async (string) => {
    try {
        return await bcrypt.hash(string, 10);
    } catch (e) {
        throw Error("There was an Error Hashing");
    }
}

exports.compareHashString = async (hash, comparedHash) => {
    try {
        const same = await bcrypt.compare(hash, comparedHash);
        return same;
    } catch (err) {
        throw Error("Problem during comparing");
    }
}