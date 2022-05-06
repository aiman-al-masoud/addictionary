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
            let idionym = entry[0].toLowerCase()
            let meaning  = entry[1].toLowerCase()

            text = text.toLowerCase().replaceAll(meaning, idionym)

        })

        return text
    }

}