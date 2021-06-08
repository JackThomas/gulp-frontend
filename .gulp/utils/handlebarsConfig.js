import fs from "fs";
import path from "path";

export default function handlebarsConfig() {
  const file = path.resolve(process.cwd(), 'handlebars.config.js');
  const flavors = [
    file, // handlebars.config.js
    file.replace('.js', '.json'), // handlebars.config.json
    file.replace('handlebars.', 'hbs.'), // hbs.config.js
    file.replace('handlebars.', 'hbs.').replace('.js', '.json'), // hbs.config.json
  ];

  if (fs.existsSync(flavors[0])) { // eslint-disable-line no-sync
    return require(flavors[0]); // eslint-disable-line global-require
  }

  if (fs.existsSync(flavors[1])) { // eslint-disable-line no-sync
    return JSON.parse(fs.readFileSync(flavors[1], { encoding: 'utf-8' })); // eslint-disable-line no-sync
  }

  if (fs.existsSync(flavors[2])) { // eslint-disable-line no-sync
    return require(flavors[2]); // eslint-disable-line global-require
  }

  if (fs.existsSync(flavors[3])) { // eslint-disable-line no-sync
    return JSON.parse(fs.readFileSync(flavors[3], { encoding: 'utf-8' })); // eslint-disable-line no-sync
  }

  return {};
}
