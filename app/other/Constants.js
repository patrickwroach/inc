export class Constants {
	static get enterKey() {
		return 'Enter';
	}
	
	static get editNameLabelString() {
		return 'Enter New Name';
	}
	
	static get editNameButtonString() {
		return 'Change Name';
	}
	
	static get clearEncounterModalButtonString() {
		return 'Clear Encounter';
	}
	
	static get clearEncounterLabelString() {
		return 'Clear which characters?';
	}
	
	static get clearAllButtonString() {
		return 'Clear All';
	}
	
	static get clearNpcsButtonString() {
		return 'Clear NPCs';
	}

	static get endTurnButtonString() {
		return String.fromCharCode(9668) + 'End Turn';
	}
	
	static get continueEncounterWithNoCharactersString() {
		return "I thought we'd need at least one Character?  Please add one so we can continue!";
	}
	
	static get startRoundButtonString() {
		return "start round";
	}

	static get startEncounterButtonString() {
		return "start encounter";
  }
  
  static get initLabelString() {
    return "Initiative:";
  }
  
  static get editInitButtonString() {
    return "Change Initiative";
	}
	
	static get encounterReportTitleString() {
    return "Encounter Report";
	}
	
	static get encounterReportTimeSectionIntroString() {
    return "Your encounter lasted:";
	}
	static get inGameString() {
    return "In game time elapsed: ";
	}
	static get inRealLifeString() {
    return "Real life time elapsed: ";
	}
	static get inGameGroupTurnString() {
    return "round(s)";
	}

	static get inGamePlayerTurnString() {
		return "turn(s)";
	}

	static get secondsString() {
    return "second(s)";
	}
	static get minutesString() {
    return "minute(s)";
  }

  static get EncounterStateInitGroupsString() {
      return 'initGroups';
  }

  static get EncounterStateCharactersString() {
    return 'characters';
  }

  static get EncounterStateIsEndTurnDisplayedString() {
    return 'isEndTurnDisplayed';
  }

  static get EncounterStateIsAddCharModalOpenString() {
    return 'isAddCharModalOpen';
  }

  static get EncounterStateIsClearEncounterModalOpenString() {
    return 'isClearEncounterModalOpen';
  }

  static get EncounterStateRoundString() {
    return 'round';
  }

  static get EncounterStateLoggedRoundsString() {
    return 'loggedRounds';
  }

  static get EncounterStateTurnsString() {
    return 'turns';
  }

  static get EncounterStateLoggedTurnsString() {
    return 'loggedTurns';
  }

  static get EncounterStateIsMessageModalDisplayedString() {
    return 'isMessageModalDisplayed';
  }

  static get EncounterStateIsEncounterReportModalDisplayedString() {
    return 'isEncounterReportModalDisplayed';
  }

  static get EncounterStateMessageModalTextString() {
    return 'messageModalText';
  }

  static get EncounterStateEncounterStartTimeString() {
    return 'encounterStartTime';
  }

  static get EncounterStateLoggedEncounterStartTimeString() {
    return 'loggedEncounterStartTime';
  }
}