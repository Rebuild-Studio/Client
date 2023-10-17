import Command from "../Command";

export default class AddSelectedGroupsPositionCommand extends Command {
	constructor(store, movement, sheetId) {
		super(store);
		this.type = "AddSelectedGroupsPositionCommand";
		this.updatable = true;
		this.data = {
			sheetId,
			movement: movement,
			moved: movement,
		};
	}
	execute() {
		const sheet = this.store.getSheetByUuid(this.data.sheetId);
		sheet.addSelectedGroupsPosition(this.data.movement);
	}
	undo() {
		const sheet = this.store.getSheetByUuid(this.data.sheetId);
		this.data.movement = this.data.moved;
		sheet.addSelectedGroupsPosition(this.data.moved.map((m) => m * -1));
	}
	update(cmd) {
		this.data.movement = cmd.data.movement;
		this.data.moved = this.data.moved.map((m, i) => m + cmd.data.movement[i]);
	}
}
