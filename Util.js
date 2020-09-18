class Util {
    static async loadFullChampionDetails() {
        const championData = [];
        const basePath = "./data/champions";
        const dir = await fs.promises.opendir(basePath);
        for await (const dirent of dir) {
            if(dirent.isFile()) {
                console.log(`reading ${dirent.name}`);
                let data = fs.readFileSync(basePath + `/${dirent.name}`);
                let obj = JSON.parse(data);
                championData.push(Object.values(obj.data)[0]);
            }
        }
        let championMap = new Map();
        championData.map(data => {
            let champion = Champion.makeFromObj(data);
            championMap.set(champion.name, champion);
        })
        return championMap;
    }
    static toNumberArr(str) {
        return str.split("/").map(str => Number.parseInt(str.trim()));
    }

    static async getChampionNames() {
        return (await loadFullChampionDetails()).map(c => c.name);
    }
}

module.exports = Util;