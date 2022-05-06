export { saveToComp, readText, setTitle, setFavicon }

/**
 * 
 * @param {*} content 
 * @param {*} fileName 
 * @param {*} contentType 
 */
function saveToComp(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

/**
 * Lets user pick file, returns its content as a string.
 * @returns 
 */
const readText = () => {

    return new Promise(function (resolve, reject) {

        let span = document.createElement('span');
        span.innerHTML = "<input id='fileInput' name='fileInput' type='file' hidden />".trim();
        window.fileInput = span.getElementsByTagName("input")[0]

        let filename = undefined

        let fr = new FileReader()

        fr.onload = () => {
            // console.log(fr)
            resolve( [fr.result, filename]  )
        }

        fileInput.addEventListener("change", () => {
            fr.readAsText(fileInput.files[0])
            filename = fileInput.files[0].name
        })


        fileInput.click()

    })
}


function setTitle(string) {
    document.title = string
}

function setFavicon(faviconLinkOrData) {
    let link = document.createElement('link')
    link.rel = 'shortcut icon';
    link.href = faviconLinkOrData;
    document.head.appendChild(link);
}