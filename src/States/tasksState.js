import { atom } from "recoil";
import UserStateEffect from "../Effects/UserStateEffect";

export const tasksState = atom({
	key: "tasksState",
	default: [],
	effects_UNSTABLE: [UserStateEffect()],
});
