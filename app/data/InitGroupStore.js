import Events from 'events';
import Shortid from 'shortid';
import { Helpers } from '../other/Helpers.js';

var emitter = new Events.EventEmitter();
const updateEvent = 'update';

var initGroups = Helpers.initialInitGroups;
var characters = Helpers.initialCharacters;

export class InitGroupStore {
  static subscribe(callback) {
    emitter.addListener(updateEvent, callback);
  }
 
  static unsubscribe(callback) {
    emitter.removeListener(updateEvent, callback);
  }

  static getInitGroups() {
    return initGroups.slice();
  }

  static getInitialInitGroups() {
    return Helpers.initialInitGroups;
  }

  static getInitialCharacters() {
    return Helpers.initialCharacters;
  }

  static getCharacters() {
    return characters.slice();
  }

  static getCharactersByIds(charIds) {
    return characters.filter(character => charIds.includes(character.id));
  }

  static removeInitGroup(initGroupId) {
    var newInitGroupArray = initGroups.slice();
    var initGroupIndex = newInitGroupArray.findIndex(ig => ig.id === initGroupId);
    var newCharArray = characters.slice();
    var initGroup = newInitGroupArray[initGroupIndex];
    for (var i = 0; i < initGroup.charIds.length; i++) {
      var charId = initGroup.charIds[i];
      var charIndex = newCharArray.findIndex(c => c.id === charId);
      newCharArray.splice(charIndex, 1);
    }

    var index = newInitGroupArray.findIndex(ig => ig.id === initGroupId);
    newInitGroupArray.splice(index, 1);

    initGroups = newInitGroupArray;
    characters = newCharArray;
    emitter.emit(updateEvent);
  }

  static editInit(initGroupId, newInit) {
    var newInitGroupArray = initGroups.slice();
    var initGroupIndex = newInitGroupArray.findIndex(ig => ig.id === initGroupId);

    var elemArr = newInitGroupArray.splice(initGroupIndex, 1);
    var initGroup = elemArr[0];
    initGroup.init = newInit;
    newInitGroupArray = Helpers.insertInitGroup(initGroup, newInitGroupArray);

    initGroups = newInitGroupArray;
    emitter.emit(updateEvent);
  }

  static addChar(name, init, type, hp, amount) {
    const charName = name;
    const initValue = init;
    const typeValue = type;
    const hpValue = hp;
    const amountValue = amount;
    var newCharArray = characters.slice();
    var charIds = [];
    for (var i = 0; i < amountValue; i++) {
      var newCharacter = {
        id: Shortid.generate(),
        name: charName + (typeValue == "Group" ? " " + (i + 1) : ""),
        hp: hpValue,
        hpMax: hpValue
      };
      newCharArray.push(newCharacter);
      charIds.push(newCharacter.id);
    }

    var newInitGroup = {
      id: Shortid.generate(),
      name: charIds.length > 1 ? charName + " Group" : "",
      init: initValue,
      type: typeValue,
      charIds: charIds
    };

    var newInitGroupArray = Helpers.insertInitGroup(newInitGroup, initGroups);

    initGroups = newInitGroupArray;
    characters = newCharArray;
    emitter.emit(updateEvent);
  }

  static removeCharacter(charId, initGroupId) {
    var newInitGroupArray = initGroups.slice();
    var index = newInitGroupArray.findIndex(ig => ig.id === initGroupId);
    var newCharIdsArray = newInitGroupArray[index].charIds;
    var charIdsIndex = newCharIdsArray.indexOf(charId);
    newInitGroupArray[index].charIds.splice(charIdsIndex, 1);

    if (newInitGroupArray[index].charIds.length === 0) {
      newInitGroupArray.splice(index, 1);
    }

    var newCharArray = characters.slice();
    var charIndex = newCharArray.findIndex(c => c.id === charId);
    newCharArray.splice(charIndex, 1);

    initGroups = newInitGroupArray;
    characters = newCharArray;
    emitter.emit(updateEvent);
  }

  static addHp(charId, amount) {
    var newCharArray = characters.slice();
    var charIndex = newCharArray.findIndex(c => c.id === charId);
    newCharArray[charIndex].hp += parseInt(amount);

    characters = newCharArray;
    emitter.emit(updateEvent);
  }

  static editCharName(charId, newName) { 
    var newCharArray = characters.slice();
    var charIndex = newCharArray.findIndex(c => c.id === charId);
    newCharArray[charIndex].name = newName;

    characters = newCharArray;
    emitter.emit(updateEvent);
  }

  static editInitGroupName(initGroupId, newName) {
    var newInitGroupArray = initGroups.slice();
    var index = newInitGroupArray.findIndex(ig => ig.id === initGroupId);
    newInitGroupArray[index].name = newName;

    initGroups = newInitGroupArray;
    emitter.emit(updateEvent);
  }

  static endTurn(currentRound) {
    var newInitGroupsArray = initGroups.slice();
    newInitGroupsArray.push(newInitGroupsArray.shift());

    initGroups = newInitGroupsArray;
    emitter.emit(updateEvent);
    return initGroups;
  }

  static clearAll() {
    initGroups = this.getInitialInitGroups();
    characters = this.getInitialCharacters();
    emitter.emit(updateEvent);
  }

  static clearNpcs() {
    var currentInitGroupArray = initGroups.slice();
    var currentCharArray = characters.slice();
    var newInitGroupArray = [];
    var newCharArray = [];
    for (var i = 0; i < currentInitGroupArray.length; i++) {
      var initGroup = currentInitGroupArray[i];
      if (initGroup.type === 'PC' || initGroup.type === 'nonChar') {
        newInitGroupArray.push(initGroup);
        for (var j = 0; j < initGroup.charIds.length; j++) {
          var character = currentCharArray.find(c => c.id === initGroup.charIds[j]);
          newCharArray.push(character);
        }
      }
    }

    initGroups = newInitGroupArray;
    characters = newCharArray;
    emitter.emit(updateEvent);
  }
}