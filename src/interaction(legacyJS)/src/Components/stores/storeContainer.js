import { common_store } from './Common_Store';
import { data_store } from './Data_Store';
import { hierarchy_store } from './Hierarchy_Store';
import {
  eventSystem_store,
  interactionhistory_store,
  string_store
} from './Interaction_Stores';
import { object_store } from './Object_Store';

const storeContainer = {
  common_store,
  data_store,
  object_store,
  eventSystem_store,
  string_store,
  hierarchy_store,
  interactionhistory_store
};

export default storeContainer;
