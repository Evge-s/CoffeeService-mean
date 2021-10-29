const {
    v4: uuidv4
} = require('uuid');
import * as path from 'path';

class FileService {
    saveFile(file) {
        try {
            const fileName = uuidv4() + 'jpg';
            const filePath = path.resolve('static', fileName);
            file.mv(filePath);
            return fileName;
        } catch (error) {
            console.log(e)
        }

    }
}

export default new FileService();