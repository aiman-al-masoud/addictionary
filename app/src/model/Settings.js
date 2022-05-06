export default class Settings {

    static SETTINGS = "SETTINGS"
    static instance = null
    static DICTIONARY_NAME = ""

    /**
     * 
     * @returns {Settings}
     */
    static get() {
        return Settings.instance = Settings.instance ?? new Settings()
    }



    get(key){
        return JSON.parse(  localStorage.getItem(Settings.SETTINGS) ?? "{}"   )  [key]  
    }

    set(key, value){
        let s = JSON.parse( localStorage.getItem(Settings.SETTINGS) ?? "{}" )
        s[key] = value
        localStorage.setItem(Settings.SETTINGS, JSON.stringify(s))
    }


}

