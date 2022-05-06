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
            body: JSON.stringify( { dict_name: S.get().get(S.DICTIONARY_NAME) }  )
        })
        return res.json()
    }

    async getAvailableDicts() {
        return (await fetch("/get-dictionaries-list")).json()
    }

    async createDictionary(dictName, dict={}){
        return fetch("/create-dictionary", {
            method: "POST", 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { dict_name: dictName, dict : dict}  )
        })
    }

}