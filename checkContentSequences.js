const fs = require('fs-extra')

const contentObj = fs.readJsonSync('./src/assets/content/toc.json');
let m = 1, s = 1, p = 1;
let mNum = 0, sNum = 0;

let resetIds = false;
if (process.argv.length > 2 && process.argv[2] == "reset-id")
{
    console.log("Reset ids == true");
    resetIds = true;
}

let newContentObj = {
    id: contentObj.id,
    name: contentObj.name,
    courseModules : []
};
contentObj.courseModules.forEach(module => {
    let newModule = {
        id: m++,
        number: mNum++,
        name: module.name,
        urlName: module.urlName,
        sessions : []
    }
    module.sessions.forEach(session => {
        let newSession = {
            id: s++,
            number: sNum++,
            name: session.name,
            urlName: session.urlName,
            pages: []
        };
        session.pages.forEach(page => {
            page.id = p++;
            newSession.pages.push(page);
        });
        if(resetIds){
            p = 1;
        }
        newModule.sessions.push(newSession)
    });
    if(resetIds){
        s = 1;
        sNum = 0;
    }
    newContentObj.courseModules.push(newModule);
});

fs.writeJSONSync('./src/assets/content/toc.json', newContentObj);
//fs.writeJSONSync('./src/assets/content/toc-reoder.json', newContentObj);
