export default class Translator{

    constructor(dictionary){
        this.dictionary = dictionary
    }

    /**
     * 
     * @param {string} text 
     */
    translate(text){

        Object.entries(this.dictionary).forEach((entry)=>{
            let idionym = entry[0]
            let meaning  = entry[1]

            // ["s", "ing"].forEach((s)=>{
            //     meaning = meaning.endsWith(s) ? meaning.replace(s, "") : meaning
            // })

            text = text.replaceAll(meaning, idionym)

        })

        return text
    }

}