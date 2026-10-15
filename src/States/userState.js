import { atom } from "recoil";
import LocalStorageEffect from "../Effects/LocalStorageEffect";

export const userState = atom({
    key: "userState",
    default: {},
    effects_UNSTABLE: [LocalStorageEffect()]
})