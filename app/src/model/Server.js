import S from "./Settings"



export default class Server {

    static instance = null

    /**
     * 
     * @returns {Server}
     */
    static get() {
        return Server.instance = Server.instance ?? new Server()
    }

    constructor() {
        this.checkKillerSwitchInterval = setInterval(() => {
            this.checkKillerSwitch()
        }, 2000);
    }

    async checkKillerSwitch() {
        let res = await fetch("is-killed")
        res = await res.json()
        console.log(res)

        if (res["killed"]) {
            window.clearInterval(this.checkKillerSwitchInterval)
            location.reload()
        }
    }

    async postWord(word, meaning) {
        return fetch("/post-word", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ entry: [word, meaning], dict_name: S.get().get(S.DICTIONARY_NAME) })
        })
    }

    async getDictionary() {
        let res = await fetch("/get-dictionary", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dict_name: S.get().get(S.DICTIONARY_NAME) })
        })
        return res.json()
    }

    async getAvailableDicts() {
        return (await fetch("/get-dictionaries-list")).json()
    }

    async createDictionary(dictName, dict = {}) {
        return fetch("/create-dictionary", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dict_name: dictName, dict: dict })
        })
    }

}