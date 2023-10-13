import Command from "../Command";

export default class UnselectGroupCommand extends Command {
	constructor(store, uuid, sheetId) {
		super(store);
		this.type = "UnselectGroupCommand";
		this.data = {
			sheetId,
			uuid: uuid,
			selected: undefined,
		};
	}
	execute() {
		const sheet = this.store.getSheetByUuid(this.data.sheetId);
		sheet.unselectGroup(this.data.uuid);
	}
	undo() {
		const sheet = this.store.getSheetByUuid(this.data.sheetId);
		sheet.selectGroup(this.data.uuid);
	}
}
