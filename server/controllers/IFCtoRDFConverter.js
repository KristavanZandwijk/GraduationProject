import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

export const convertIfcToRdf = (req, res) => {
    const ifcFilePath = req.file.path;
    const ttlFileName = req.body.ttlFileName;

    // Ensure the ttlFileName is provided and valid
    if (!ttlFileName) {
        return res.status(400).json({ error: 'ttlFileName is required' });
    }

    const outputDir = path.join('public', 'assets', 'converterfiles');

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const ttlFilePath = path.join(outputDir, ttlFileName);
    const jarFilePath = path.resolve('IFCtoRDF-0.4-shaded.jar'); // Ensure it's an absolute path

    // Construct and execute the command
    const command = `java -jar "${jarFilePath}" "${ifcFilePath}" "${ttlFilePath}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ error: 'Conversion failed in backend' });
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ error: `Conversion error: ${stderr}` });
        }

        console.log(`stdout: ${stdout}`);
        res.json({ ttlFilePath });
    });
};