const fs = require('fs-extra')

const contentObj = fs.readJsonSync('./src/assets/content/toc.json');
let i = 1, ii = 1, iii = 1;

let resetIds = false;
if (process.argv.length > 2 && process.argv[2] == "reset-id")
{
    console.log("Reset ids == true");
    resetIds = true;
}


contentObj.courseModules.forEach(module => {
    module.id = i++;
    module.sessions.forEach(session => {
        session.id = ii++;
        session.pages.forEach(page => {
            page.id = iii++;
        });
        if(resetIds){
            iii = 1;
        }
    });
    if(resetIds){
        ii = 1;
    }
});

fs.writeJSONSync('./src/assets/content/toc.json', contentObj);
