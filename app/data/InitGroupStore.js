import Events from 'events';
import Shortid from 'shortid';
import { Helpers } from '../other/Helpers.js';

const emitter = new Events.EventEmitter();
const updateEvent = 'update';

let initGroups = Helpers.initialInitGroups;
let characters = Helpers.initialCharacters;

export class InitGroupStore {
  static subscribe (callback) {
    emitter.addListener(updateEvent, callback);
  }
 
  static unsubscribe (callback) {
    emitter.removeListener(updateEvent, callback);
  }

  static getInitGroups () {
    return initGroups.slice();
  }

  static getInitialInitGroups () {
    return Helpers.initialInitGroups;
  }

  static getInitialCharacters () {
    return Helpers.initialCharacters;
  }

  static getCharacters () {
    return characters.slice();
  }

  static getCharactersByIds (charIds) {
    return characters.filter(character => charIds.includes(character.id));
  }

  static removeInitGroup (initGroupId) {
    const newInitGroupArray = initGroups.slice();
    const initGroupIndex = newInitGroupArray.findIndex(ig => ig.id === initGroupId);
    const newCharArray = characters.slice();
    const initGroup = newInitGroupArray[initGroupIndex];
    for (let i = 0; i < initGroup.charIds.length; i++) {
      var charId = initGroup.charIds[i];
      const charIndex = newCharArray.findIndex(c => c.id === charId);
      newCharArray.splice(charIndex, 1);
    }

    const index = newInitGroupArray.findIndex(ig => ig.id === initGroupId);
    newInitGroupArray.splice(index, 1);

    initGroups = newInitGroupArray;
    characters = newCharArray;
    emitter.emit(updateEvent);
  }

  static editInit (initGroupId, newInit) {
    let newInitGroupArray = initGroups.slice();
    const initGroupIndex = newInitGroupArray.findIndex(ig => ig.id === initGroupId);

    const elemArr = newInitGroupArray.splice(initGroupIndex, 1);
    const initGroup = elemArr[0];
    initGroup.init = newInit;
    newInitGroupArray = Helpers.insertInitGroup(initGroup, newInitGroupArray);

    initGroups = newInitGroupArray;
    emitter.emit(updateEvent);
  }

  static addChar (name, init, type, hp, amount) {
    const charName = name;
    const initValue = init;
    const typeValue = type;
    const hpValue = hp;
    const amountValue = amount;
    const newCharArray = characters.slice();
    const charIds = [];
    for (let i = 0; i < amountValue; i++) {
      const newCharacter = {
        id: Shortid.generate(),
        name: charName + (typeValue == 'Group' ? ' ' + (i + 1) : ''),
        hp: hpValue,
        hpMax: hpValue,
      };
      newCharArray.push(newCharacter);
      charIds.push(newCharacter.id);
    }

    const newInitGroup = {
      id: Shortid.generate(),
      name: charIds.length > 1 ? charName + ' Group' : '',
      init: initValue,
      type: typeValue,
      charIds: charIds,
    };

    const newInitGroupArray = Helpers.insertInitGroup(newInitGroup, initGroups);

    initGroups = newInitGroupArray;
    characters = newCharArray;
    emitter.emit(updateEvent);
  }

  static removeCharacter (charId, initGroupId) {
    const newInitGroupArray = initGroups.slice();
    const index = newInitGroupArray.findIndex(ig => ig.id === initGroupId);
    const newCharIdsArray = newInitGroupArray[index].charIds;
    const charIdsIndex = newCharIdsArray.indexOf(charId);
    newInitGroupArray[index].charIds.splice(charIdsIndex, 1);

    if (newInitGroupArray[index].charIds.length === 0) {
      newInitGroupArray.splice(index, 1);
    }

    const newCharArray = characters.slice();
    const charIndex = newCharArray.findIndex(c => c.id === charId);
    newCharArray.splice(charIndex, 1);

    initGroups = newInitGroupArray;
    characters = newCharArray;
    emitter.emit(updateEvent);
  }

  static addHp (charId, amount) {
    const newCharArray = characters.slice();
    const charIndex = newCharArray.findIndex(c => c.id === charId);
    newCharArray[charIndex].hp += parseInt(amount);

    characters = newCharArray;
    emitter.emit(updateEvent);
  }

  static editCharName (charId, newName) { 
    const newCharArray = characters.slice();
    const charIndex = newCharArray.findIndex(c => c.id === charId);
    newCharArray[charIndex].name = newName;

    characters = newCharArray;
    emitter.emit(updateEvent);
  }

  static editInitGroupName (initGroupId, newName) {
    const newInitGroupArray = initGroups.slice();
    const index = newInitGroupArray.findIndex(ig => ig.id === initGroupId);
    newInitGroupArray[index].name = newName;

    initGroups = newInitGroupArray;
    emitter.emit(updateEvent);
  }

  static endTurn (currentRound) {
    const newInitGroupsArray = initGroups.slice();
    newInitGroupsArray.push(newInitGroupsArray.shift());

    initGroups = newInitGroupsArray;
    emitter.emit(updateEvent);
    return initGroups;
  }

  static clearAll () {
    initGroups = this.getInitialInitGroups();
    characters = this.getInitialCharacters();
    emitter.emit(updateEvent);
  }

  static clearNpcs () {
    const currentInitGroupArray = initGroups.slice();
    const currentCharArray = characters.slice();
    const newInitGroupArray = [];
    const newCharArray = [];
    for (let i = 0; i < currentInitGroupArray.length; i++) {
      var initGroup = currentInitGroupArray[i];
      if (initGroup.type === 'PC' || initGroup.type === 'nonChar') {
        newInitGroupArray.push(initGroup);
        for (var j = 0; j < initGroup.charIds.length; j++) {
          const character = currentCharArray.find(c => c.id === initGroup.charIds[j]);
          newCharArray.push(character);
        }
      }
    }

    initGroups = newInitGroupArray;
    characters = newCharArray;
    emitter.emit(updateEvent);
  }
}