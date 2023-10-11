import EventSystemStore from "./EventSystem_Store";
import InteractionHistoryStore from "./InteractionHistory_Store";
import StringStore from "./String_Store";

const string_store = new StringStore();
const eventSystem_store = new EventSystemStore(string_store);
const interactionhistory_store = new InteractionHistoryStore();

export { eventSystem_store, interactionhistory_store, string_store };
