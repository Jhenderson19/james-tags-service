const Promise = require('bluebird');
const db = Promise.promisifyAll(require('./connection.js'));


class DataManager {
  constructor() { }

  //Init Database
  initializeDatabase() {
    return db.queryAsync('DROP TABLE IF EXISTS `game_tag_joinTable`;').then(() => {
      return db.queryAsync('DROP TABLE IF EXISTS `tags`;');
    }).then(() => {
      return db.queryAsync('CREATE TABLE `tags` (`id` INTEGER AUTO_INCREMENT, `name` VARCHAR(50) NOT NULL, PRIMARY KEY (`id`));');
    }).then(() => {
      return db.queryAsync('CREATE TABLE `game_tag_joinTable` (`id` INTEGER AUTO_INCREMENT, `id_tags` INTEGER NOT NULL, `id_games` INTEGER NOT NULL, PRIMARY KEY (`id`));');
    }).then(() => {
      return db.queryAsync('ALTER TABLE `game_tag_joinTable` ADD FOREIGN KEY (id_tags) REFERENCES `tags` (`id`);');
    });
  }

  //CREATE
  insertTag(tag) {
    return db.queryAsync(`INSERT INTO tags (name) VALUES ('${tag}');`);
  }
  getTagName(id) {
    return db.queryAsync(`SELECT name FROM tags WHERE id = ${id}`).then((data) => {
      if (data.length === 0) {
        throw `Could Not Find Tag with id ${id} in database.`;
      }
      return data[0].name;
    });
  }
  getTagId(tag) {
    return db.queryAsync(`SELECT id FROM tags WHERE name = '${tag}'`).then((data) => {
      if (data.length === 0) {
        throw `Could Not Find Tag ${tag} in database.`;
      }
      return data[0].id;
    });
  }

  addTagToGame(tag, gameId) {
    return this.getTagId(tag).then((id) => {
      return db.queryAsync(`INSERT INTO game_tag_joinTable (id_tags, id_games) VALUES (${id}, ${gameId});`);
    })
  }

  closeConnection() {
    return db.closeConnectionAsync();
  }
}

module.exports = new DataManager();