/*import fs from 'fs';
import path from 'path';

const saveFile = (name: string, file: Express.Multer.File) => {
    fs.writeFileSync(path.join(__dirname, "../public/"+name+".jpg"), file.buffer, 'binary')
}

export {saveFile};

import fs from 'fs';
import path from 'path';

const saveFile = (name: string, file: Express.Multer.File) => {
    const directory = path.resolve(__dirname, "../public");
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
    fs.writeFileSync(path.join(directory, name+".jpg"), file.buffer, 'utf-8');
}

export {saveFile};
*/

import fs from 'fs';
import path from 'path';

const directory = path.resolve(__dirname, "../../src/public");

const saveFile = (name: string, file: Express.Multer.File) => {
   
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
    
    

    fs.writeFileSync(path.join(directory, name), file.buffer, 'utf-8');

}




export {saveFile};

