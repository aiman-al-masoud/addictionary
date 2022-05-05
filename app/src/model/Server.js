export default class Server{

    static instance = null

    /**
     * 
     * @returns {Server}
     */
    static get(){
        return Server.instance = Server.instance ?? new Server()
    }

    async postWord(word, meaning){
        return fetch("/post-word", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {entry: [word, meaning]} )
        })   
    }

    async getDictionary(){
        let res = await fetch("/get-dictionary")
        return res.json()
    }


}